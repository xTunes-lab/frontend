<script lang="ts">
    import VolumeControl from "./controls/VolumeControl.svelte";
    import AudioProgressSlider from "./controls/AudioProgressSlider.svelte";
    import PlaybackControl from "./PlaybackControl.svelte";
    import Modal from "$lib/components/generals/modal/Modal.svelte";
    import AlbumPicture from "../album/AlbumPicture.svelte";
    import { currentPlayingSong } from "$lib/stores/playbackControl";
    import { isCurrentPlayingOpen } from "$lib/stores/ui";
</script>

<Modal isModalOpen={isCurrentPlayingOpen}>
    <div
        class="flex flex-col items-center justify-center p-2 w-80 h-80 sm:max-w-lg gap-2"
    >
        <div class="flex items-center justify-center">
            <AlbumPicture
                size={32}
                imageSrc={$currentPlayingSong?.covers?.[0]}
                name={$currentPlayingSong?.title}
                coverMode={false}
            />
        </div>
        <div class="flex flex-col text-center gap-0.5">
            <p class="text-gray-500 font-bold dark:text-white">
                {$currentPlayingSong?.title}
            </p>
            <p class="text-gray-500 dark:text-white text-sm">
                {$currentPlayingSong?.album_name}
            </p>
            <p class="text-gray-500 dark:text-white text-sm">
                {$currentPlayingSong?.album_artist}
            </p>
        </div>

        <div class="flex flex-col items-center justify-center w-xs gap-0.5">
            <div class="flex w-4/5 h-6 justify-center items-center">
                <AudioProgressSlider />
            </div>

            <div class="flex w-4/5 h-6 items-center justify-center">
                <PlaybackControl />
            </div>
            <div class="flex w-3/5 h-6 justify-center items-center">
                <VolumeControl />
            </div>
        </div>
    </div>
</Modal>
