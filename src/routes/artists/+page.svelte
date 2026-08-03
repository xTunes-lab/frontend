<script lang="ts">
    import ArtistListBlock from "$lib/components/pages/artists/ArtistListBlock.svelte";
    import AlbumBlock from "../../lib/components/pages/artists/AlbumBlock.svelte";
    import ContentLayout from "$lib/components/layouts/ContentLayout.svelte";
    import { artistPageData, selectedArtist } from "$lib/stores/pages";
    import { artistListScroll, artistBlockListScroll } from "$lib/stores/ui";
    import SplitLayout from "$lib/components/layouts/SplitLayout.svelte";
    $selectedArtist = $artistPageData?.[0];
</script>

<ContentLayout>
    <SplitLayout
        isClicked={selectedArtist}
        listScrollStore={artistListScroll}
        blockScrollStore={artistBlockListScroll}
    >
        {#snippet listChildren()}
            <ArtistListBlock artists={$artistPageData} />
        {/snippet}
        {#snippet blockChildren()}
            {#if $selectedArtist !== undefined}
                <AlbumBlock artistInfo={$selectedArtist} />
            {/if}
        {/snippet}
    </SplitLayout>
</ContentLayout>
