<script>
    import ContentLayout from "$lib/components/layouts/ContentLayout.svelte";
    import { playListsPageData, selectedPlaylist } from "$lib/stores/pages";
    import PlaylistInfoBlock from "$lib/components/pages/playlists/PlaylistInfoBlock.svelte";
    import PlaylistItemList from "$lib/components/pages/playlists/PlaylistItemList.svelte";
    import { playlistScroll, playlistBlockScroll } from "$lib/stores/ui";
    import SplitLayout from "$lib/components/layouts/SplitLayout.svelte";

    if ($selectedPlaylist === undefined && $playListsPageData !== undefined) {
        $selectedPlaylist = $playListsPageData[0];
    }
</script>

<ContentLayout>
    <SplitLayout
        isClicked={selectedPlaylist}
        listScrollStore={playlistScroll}
        blockScrollStore={playlistBlockScroll}
    >
        {#snippet listChildren()}
            <PlaylistItemList playlists={$playListsPageData} />
        {/snippet}
        {#snippet blockChildren()}
            {#if $selectedPlaylist !== undefined}
                <PlaylistInfoBlock songs={$selectedPlaylist.songs} />
            {/if}
        {/snippet}
    </SplitLayout>
</ContentLayout>
