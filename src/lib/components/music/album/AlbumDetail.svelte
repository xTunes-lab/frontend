<script lang="ts">
    import Modal from "$lib/components/generals/modal/Modal.svelte";
    import AlbumInfoBlock from "$lib/components/pages/artists/AlbumInfoBlock.svelte";
    import { isAlbumDetailModalOpen } from "$lib/stores/ui";
    import { selectedObject } from "$lib/stores/music";
    import { SongCollectionInfo } from "$lib/stores/property";
</script>

<Modal isModalOpen={isAlbumDetailModalOpen}>
    <div class="w-full h-full p-2">
        <AlbumInfoBlock info={$selectedObject as SongCollectionInfo} />
    </div>
</Modal>
