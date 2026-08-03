<script lang="ts">
    import ContentLayout from "$lib/components/layouts/ContentLayout.svelte";
    import GenresBlock from "../../lib/components/pages/genres/GenresBlock.svelte";
    import GenresListBlock from "$lib/components/pages/genres/GenresListBlock.svelte";
    import { genresPageData, selectedGenres } from "$lib/stores/pages";
    import { genreBlockListScroll, genreListScroll } from "$lib/stores/ui";
    import SplitLayout from "$lib/components/layouts/SplitLayout.svelte";
    $selectedGenres = $genresPageData?.[0];
</script>

<ContentLayout>
    <SplitLayout
        isClicked={selectedGenres}
        listScrollStore={genreListScroll}
        blockScrollStore={genreBlockListScroll}
    >
        {#snippet listChildren()}
            <GenresListBlock genres={$genresPageData} />
        {/snippet}
        {#snippet blockChildren()}
            {#if $selectedGenres !== undefined}
                <GenresBlock artistInfos={$selectedGenres.artists} />
            {/if}
        {/snippet}
    </SplitLayout>
</ContentLayout>
