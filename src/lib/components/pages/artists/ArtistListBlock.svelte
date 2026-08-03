<script lang="ts">
    import type { ArtistInfoLite } from "$lib/entities";
    import { textStyle } from "$lib/global";
    import ItemList from "$lib/components/generals/lists/ItemList.svelte";
    import Item from "$lib/components/generals/lists/Item.svelte";
    import ArtistPicture from "./ArtistPicture.svelte";
    import { selectedArtist } from "$lib/stores/pages";
    import {
        rightClickContextMenu,
        rightClickObjectParsing,
    } from "$lib/stores/contextMenu";
    let { artists }: { artists: ArtistInfoLite[] } = $props();
</script>

<ItemList>
    {#each artists as artistInfo}
        <Item
            item={artistInfo}
            selected={selectedArtist}
            onContextMenuEvent={(e: Event) => {
                rightClickObjectParsing(artistInfo);
                rightClickContextMenu(e);
            }}
        >
            <ArtistPicture {artistInfo} />
            <strong class="text-sm truncate font-medium {textStyle}"
                >{artistInfo.artist}</strong
            >
        </Item>
    {/each}
</ItemList>
