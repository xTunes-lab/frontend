<script>
    import { currentPlayingSong } from "$lib/stores/playbackControl";
    import { toggleCurrentPlaying } from "$lib/stores/ui";
    import AlbumPicture from "$lib/components/music/album/AlbumPicture.svelte";
</script>

<button
    class="flex items-center justify-center w-full h-full overflow-hidden"
    onclick={() => toggleCurrentPlaying()}
>
    <AlbumPicture
        size={10}
        imageSrc={$currentPlayingSong?.covers?.[0]}
        name={$currentPlayingSong?.title}
    />
</button>
