import { loadAllFromDb } from './persist';
import { toast } from 'svelte-sonner';

const SCOPE = 'https://www.googleapis.com/auth/drive.file';

let gisLoaded = false;

function loadGIS(): Promise<void> {
	if (gisLoaded || (window as any).google?.accounts?.oauth2) {
		gisLoaded = true;
		return Promise.resolve();
	}
	return new Promise((resolve, reject) => {
		const script = document.createElement('script');
		script.src = 'https://accounts.google.com/gsi/client';
		script.async = true;
		script.onload = () => {
			gisLoaded = true;
			resolve();
		};
		script.onerror = () => reject(new Error('Failed to load Google Identity Services'));
		document.head.appendChild(script);
	});
}

let tokenClient: any = null;
let cachedToken = '';
let tokenExpiry = 0;
let pendingResolve: ((token: string) => void) | null = null;
let pendingReject: ((err: Error) => void) | null = null;

async function getToken(): Promise<string> {
	await loadGIS();

	const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined;
	if (!clientId) throw new Error('Set VITE_GOOGLE_CLIENT_ID in your .env to enable Drive backup');

	if (cachedToken && Date.now() < tokenExpiry) return cachedToken;

	return new Promise((resolve, reject) => {
		const g = (window as any).google;

		if (!tokenClient) {
			tokenClient = g.accounts.oauth2.initTokenClient({
				client_id: clientId,
				scope: SCOPE,
				callback: (resp: any) => {
					const res = pendingResolve;
					const rej = pendingReject;
					pendingResolve = null;
					pendingReject = null;

					if (resp.error) {
						rej?.(new Error(resp.error_description ?? resp.error));
						return;
					}
					cachedToken = resp.access_token;
					tokenExpiry = Date.now() + (Number(resp.expires_in) - 60) * 1000;
					res?.(resp.access_token);
				},
				error_callback: (err: any) => {
					const rej = pendingReject;
					pendingResolve = null;
					pendingReject = null;
					rej?.(new Error(err?.message ?? err?.type ?? 'Google auth cancelled'));
				},
			});
		}

		pendingResolve = resolve;
		pendingReject = reject;
		tokenClient.requestAccessToken({ prompt: cachedToken ? '' : undefined });
	});
}

async function uploadToDrive(token: string, filename: string, content: string): Promise<string> {
	const boundary = 'nimble_drive_boundary';
	const meta = JSON.stringify({ name: filename, mimeType: 'application/json' });
	const body = [
		`--${boundary}`,
		'Content-Type: application/json; charset=UTF-8',
		'',
		meta,
		`--${boundary}`,
		'Content-Type: application/json',
		'',
		content,
		`--${boundary}--`,
	].join('\r\n');

	const res = await fetch(
		'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,webViewLink',
		{
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': `multipart/related; boundary="${boundary}"`,
			},
			body,
		}
	);

	if (!res.ok) {
		const err = (await res.json().catch(() => ({}))) as any;
		throw new Error(err?.error?.message ?? `Drive API error ${res.status}`);
	}

	const file = (await res.json()) as any;
	return file.webViewLink ?? `https://drive.google.com/file/d/${file.id}/view`;
}

export async function backupToDrive(selectedIds: string[], type: 'char' | 'npc'): Promise<void> {
	const proper = type === 'char' ? 'character' : type;
	const list = await loadAllFromDb(type);
	const selected = selectedIds.length ? list.filter((c) => selectedIds.includes(c.id)) : list;
	const json = JSON.stringify(selected, null, 2);
	const filename = `${selectedIds.length ? 'selected' : 'all'}-nimble-${proper}s.json`;

	const token = await getToken();
	const link = await uploadToDrive(token, filename, json);

	toast.success(
		`Backed up ${selected.length} ${proper}${selected.length === 1 ? '' : 's'} to Google Drive`,
		{
			action: { label: 'Open', onClick: () => window.open(link, '_blank') },
		}
	);
}
