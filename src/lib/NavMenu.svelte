<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Icons } from '$lib/icons';
	import type { NavItem } from './types';
	import { openRule, ruleGroups } from './nimble-docs';

	type Props = {
		items: NavItem[];
		onnav: (item: NavItem) => void;
		current: NavItem;
		disabled?: boolean;
	};
	let { items, onnav, current, disabled = false }: Props = $props();
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger {disabled}>
		<div class="relative">
			<current.icon class="size-6" />
			<span class="sr-only">Navigate to</span>
		</div>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align="center">
		{#each items as item (item.id)}
			<DropdownMenu.Item onSelect={() => onnav(item)}>
				<div class="flex items-center gap-3 text-lg {current.id === item.id ? `text-svelte` : ``}">
					<item.icon class="size-5" />
					{item.label}
				</div>
			</DropdownMenu.Item>
		{/each}
		<DropdownMenu.Separator />
		<DropdownMenu.Sub>
			<DropdownMenu.SubTrigger>
				<Icons.BookOpenText class="size-4" /> Rules Reference
			</DropdownMenu.SubTrigger>
			<DropdownMenu.SubContent>
				{#each ruleGroups as group}
					<DropdownMenu.Sub>
						<DropdownMenu.SubTrigger>{group.label}</DropdownMenu.SubTrigger>
						<DropdownMenu.SubContent>
							{#each group.links as link}
								<DropdownMenu.Item onSelect={() => openRule(link.anchor)}>
									{link.label}
								</DropdownMenu.Item>
							{/each}
						</DropdownMenu.SubContent>
					</DropdownMenu.Sub>
				{/each}
			</DropdownMenu.SubContent>
		</DropdownMenu.Sub>
	</DropdownMenu.Content>
</DropdownMenu.Root>
