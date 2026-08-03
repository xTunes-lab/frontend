<script lang="ts">
    import { selectableListItemButton } from "$lib/global";
    import type { Snippet } from "svelte";
    import type { Writable } from "svelte/store";
    let {
        item,
        selected,
        onClickEvent,
        onContextMenuEvent,
        children,
    }: {
        item: Object;
        onClickEvent?: CallableFunction | undefined;
        onContextMenuEvent?: CallableFunction | undefined;
        selected: Writable<Object>;
        children: Snippet;
    } = $props();
</script>

<div class="flex items-center gap-4 h-12 p-1">
    <button
        class="flex items-center gap-4 py-2 px-1 w-full h-full {selectableListItemButton} rounded select-none {$selected ===
        item
            ? 'dark:bg-stone-800 bg-gray-200'
            : ''}"
        onclick={(e) => {
            $selected = item;
            onClickEvent?.(e);
        }}
        oncontextmenu={(e) => onContextMenuEvent?.(e)}
    >
        {@render children?.()}
    </button>
</div>
