#!/usr/bin/env tsx
// Run with: npm run import-subclasses
// Reads subclass names from docs and prints the allSubclasses export for nimble.ts.
import { readdirSync, existsSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const PROJECT_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

// Load .env without requiring dotenv as a dependency.
try {
	const raw = readFileSync(join(PROJECT_ROOT, '.env'), 'utf8');
	for (const line of raw.split('\n')) {
		const stripped = line.replace(/#.*/, '').trim();
		const eq = stripped.indexOf('=');
		if (eq > 0) {
			const key = stripped.slice(0, eq).trim();
			const val = stripped.slice(eq + 1).trim();
			if (key && !(key in process.env)) process.env[key] = val;
		}
	}
} catch {}

const DOCS_DIR = join(
	process.env.NIMBLE_DOCS_DIR ?? join(PROJECT_ROOT, 'docs/Nimble Vault'),
	'Heroes/Classes',
);

const DIR_NAME_OVERRIDES: Record<string, string> = {
	'Cheat, The': 'The Cheat',
};

const result: Record<string, string[]> = {};

const classDirs = readdirSync(DOCS_DIR, { withFileTypes: true })
	.filter((d) => d.isDirectory())
	.map((d) => d.name);

for (const dirName of classDirs) {
	const subclassDir = join(DOCS_DIR, dirName, 'Subclasses');
	if (!existsSync(subclassDir)) continue;
	const subclasses = readdirSync(subclassDir)
		.filter((f) => f.endsWith('.md'))
		.map((f) => f.replace(/\.md$/, ''))
		.sort();
	const className = DIR_NAME_OVERRIDES[dirName] ?? dirName;
	result[className] = subclasses;
}

const entries = Object.entries(result)
	.sort(([a], [b]) => a.localeCompare(b))
	.map(([cls, subs]) => `\t'${cls}': [${subs.map((s) => `'${s}'`).join(', ')}]`)
	.join(',\n');

console.log(`export const allSubclasses: Record<string, string[]> = {\n${entries},\n};`);
