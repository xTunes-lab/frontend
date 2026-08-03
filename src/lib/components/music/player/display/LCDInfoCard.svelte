<script lang="ts">
    import { textStyle } from "$lib/global";
    import { currentPlayingSong } from "$lib/stores/playbackControl";
    import AudioProgressSlider from "../controls/AudioProgressSlider.svelte";
    import IdleLogo from "./IdleLogo.svelte";
</script>

{#if $currentPlayingSong === undefined}
    <div class="flex items-center justify-center w-full">
        <IdleLogo />
    </div>
{:else}
    <div class="flex flex-col w-full">
        <div
            class="flex items-center justify-center select-none text-center w-full text-[12px] {textStyle} truncate"
        >
            {$currentPlayingSong.title}
        </div>
        <!-- todo fix the margin -->
        <div
            class="flex items-center justify-center select-none text-center w-full text-[11px] {textStyle} truncate"
        >
            {`${$currentPlayingSong.artists} - ${$currentPlayingSong.album_name}`}
        </div>
        <div class="flex px-0.5 h-1">
            <AudioProgressSlider />
        </div>
    </div>
{/if}
