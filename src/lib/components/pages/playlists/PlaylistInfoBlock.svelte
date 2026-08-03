<script lang="ts">
    import type { SongInfo } from "$lib/entities";
    import Table from "$lib/components/pages/songs/Table.svelte";

    let { songs }: { songs: SongInfo[] } = $props();
</script>

<div class="w-full h-full overflow-auto">
    <Table songInfos={songs} />
</div>
