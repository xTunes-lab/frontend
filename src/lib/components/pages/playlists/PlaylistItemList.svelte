<script lang="ts">
    import Item from "$lib/components/generals/lists/Item.svelte";
    import ItemList from "$lib/components/generals/lists/ItemList.svelte";
    import type { PlaylistInfoLite } from "$lib/entities";
    import { iconStyle } from "$lib/global";
    import {
        rightClickContextMenu,
        rightClickObjectParsing,
    } from "$lib/stores/contextMenu";
    import { selectedPlaylist } from "$lib/stores/pages";
    import { t } from "$locale/i18n";
    let { playlists }: { playlists: PlaylistInfoLite[] } = $props();
    const dictMapping: Record<string, string> = {
        "@50_most_played": "playlist.name.50_most_played",
        "@50_recent_played": "playlist.name.50_recent_played",
        "@50_recent_added": "playlist.name.50_rencent_added",
    };
</script>

<ItemList>
    {#each playlists as playlist}
        <Item
            item={playlist}
            selected={selectedPlaylist}
            onClickEvent={undefined}
            onContextMenuEvent={(e: Event) => {
                rightClickObjectParsing(playlist);
                rightClickContextMenu(e);
            }}
        >
            <strong class="text-md font-light truncate {iconStyle}">
                {#if playlist.id}
                    {playlist.name}
                {:else}
                    {$t(dictMapping[playlist.name])}
                {/if}
            </strong>
        </Item>
    {/each}
</ItemList>
