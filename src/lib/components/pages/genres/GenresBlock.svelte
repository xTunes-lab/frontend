<script lang="ts">
    import type { ArtistInfoLite } from "$lib/entities";
    import AlbumBlock from "$lib/components/pages/artists/AlbumBlock.svelte";

    let { artistInfos }: { artistInfos: ArtistInfoLite[] } = $props();
</script>

<div class="w-full">
    {#each artistInfos as info}
        <AlbumBlock artistInfo={info} />
    {/each}
</div>
