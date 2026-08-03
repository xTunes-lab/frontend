<script lang="ts">
    import { afterNavigate, beforeNavigate } from "$app/navigation";
    import ContentLayout from "$lib/components/layouts/ContentLayout.svelte";
    import { allSong } from "$lib/stores/pages";
    import { songPageScroll } from "$lib/stores/ui";
    import Table from "../../lib/components/pages/songs/Table.svelte";
    let songDiv: HTMLDivElement;
    beforeNavigate(() => {
        $songPageScroll = songDiv.scrollTop;
    });
    afterNavigate(() => {
        songDiv.scrollTop = $songPageScroll;
    });
</script>

<ContentLayout>
    <div class="w-full h-full overflow-auto" bind:this={songDiv}>
        <Table songInfos={Array.from($allSong.values())} />
    </div>
</ContentLayout>
