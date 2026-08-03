<script lang="ts">
    import { SongInfo } from "$lib/entities";
    import {
        buttonStyle,
        iconStyle,
        fadeParams,
    } from "$lib/global";
    import { PlayCircleFill, Trash2Fill } from "svelte-bootstrap-icons";
    import AlbumPicture from "$lib/components/music/album/AlbumPicture.svelte";
    import { removeFromCurrent } from "$lib/stores/playlists";
    import { playByIndex } from "$lib/stores/playbackControl";
    import { fade } from "svelte/transition";
    import { Time } from "$lib/entities";
    let { song, songIndex }: { song: SongInfo; songIndex: number } = $props();
    let onHover = $state(false);
</script>

<div
    class="flex flex-row w-full gap-x-2 py-2"
    role="button"
    tabindex={0}
    onmouseenter={() => {
        onHover = true;
    }}
    onmouseleave={() => {
        onHover = false;
    }}
>
    <div class="flex w-5 min-w-5 items-center justify-center text-center">
        {#if onHover}
            <div
                class="flex items-center justify-center"
                transition:fade={fadeParams}
            >
                <button onclick={() => playByIndex(songIndex)}>
                    <PlayCircleFill class="size-4 {buttonStyle}" />
                </button>
            </div>
        {/if}
    </div>
    <div class="flex justify-between w-full min-w-5">
        <div class="flex flex-row justify-start">
            <!-- album cover -->
            <div class="flex items-center justify-center w-12 min-w-12">
                <AlbumPicture
                    size={12}
                    imageSrc={song.covers?.[0]}
                    name={song.title}
                />
            </div>

            <!-- info area -->
            <div class="grid grid-cols-1 justify-center items-center px-2">
                <!-- song name -->
                <p
                    class="text-sm font-bold {iconStyle} truncate select-none"
                >
                    {song.title}
                </p>
                <!-- album name -->
                <p class="text-xs {iconStyle} truncate select-none">
                    {song.artists} - {song.album_name}
                </p>
            </div>
        </div>
        <p
            class="flex w-10 items-center justify-center {iconStyle} text-sm"
        >
            {song.durationTime?.toMinSecString()}
        </p>
    </div>
    <div class="flex w-5 min-w-5 items-center justify-center text-center">
        {#if onHover}
            <div class="flex items-center justify-between text-center">
                <button onclick={() => removeFromCurrent(songIndex)}>
                    <Trash2Fill class="size-4 {buttonStyle}" />
                </button>
            </div>
        {/if}
    </div>
</div>
