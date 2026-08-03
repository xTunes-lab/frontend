<script lang="ts">
    import type { GenreInfoLite } from "$lib/entities";
    import { iconStyle } from "$lib/global";
    import ItemList from "$lib/components/generals/lists/ItemList.svelte";
    import Item from "$lib/components/generals/lists/Item.svelte";
    import { selectedGenres } from "$lib/stores/pages";
    import {
        rightClickContextMenu,
        rightClickObjectParsing,
    } from "$lib/stores/contextMenu";

    let { genres }: { genres: GenreInfoLite[] } = $props();
</script>

<ItemList>
    {#each genres as genreInfo}
        <Item
            item={genreInfo}
            selected={selectedGenres}
            onClickEvent={undefined}
            onContextMenuEvent={(e: Event) => {
                rightClickObjectParsing(genreInfo);
                rightClickContextMenu(e);
            }}
        >
            <strong class="text-md font-light truncate {iconStyle}">
                {genreInfo.genre}
            </strong>
        </Item>
    {/each}
</ItemList>
