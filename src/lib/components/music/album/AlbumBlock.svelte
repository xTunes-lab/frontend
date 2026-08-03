<script lang="ts">
    import { AlbumInfoLite } from "$lib/entities";
    import AlbumCard from "./AlbumCard.svelte"; // Import the AlbumCard component

    let { albumInfos }: { albumInfos: AlbumInfoLite[] } = $props();
    function onClickCallback(e: Event, albumInfo: AlbumInfoLite) {
        albumInfo.detail();
    }
</script>

<div class="p-8">
    <div
        class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-y-6 gap-x-4 place-items-center"
    >
        {#each albumInfos as i}
            <AlbumCard albumInfo={i} {onClickCallback} />
        {/each}
    </div>
</div>
