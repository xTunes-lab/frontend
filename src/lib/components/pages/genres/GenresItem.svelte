<script lang="ts">
    import type { GenreInfoLite } from "$lib/entities";
    import { iconStyle, selectableListItemButton } from "$lib/global";
    import { rightClickContextMenu, rightClickObjectParsing } from "$lib/stores/contextMenu";
    import { selectedGenres } from "$lib/stores/pages";
    let { genreInfo }: { genreInfo: GenreInfoLite } = $props();
</script>

<div class="flex items-center gap-4 h-12">
    <button
        class="flex items-center gap-4 py-2 px-1 w-full h-full {selectableListItemButton} rounded select-none {$selectedGenres ===
        genreInfo
            ? 'dark:bg-stone-800 bg-gray-200'
            : ''}"
        onclick={() => {
            $selectedGenres = genreInfo;
        }}
        oncontextmenu={(e) => {
            rightClickObjectParsing(genreInfo);
            rightClickContextMenu(e);
        }}
    >
        <strong class="text-md font-light truncate {iconStyle}"
            >{genreInfo.genre}</strong
        >
    </button>
</div>
