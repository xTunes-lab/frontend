<script lang="ts">
    import ShuffleButton from "./controls/ShuffleButton.svelte";
    import PauseButton from "./controls/PauseButton.svelte";
    import PlayButton from "./controls/PlayButton.svelte";
    import NextButton from "./controls/NextButton.svelte";
    import PlayModeButton from "./controls/PlayModeButton.svelte";
    import PreviousButton from "./controls/PreviousButton.svelte";
    import { isPlaying } from "$lib/stores/playbackControl";
    import { onKeyDown } from "$lib/keybindings";
    const iconBasicStyle = "flex items-center justify-self-center";
</script>

<div class="flex w-full h-full justify-center">
    <div class="w-full h-full grid grid-cols-5">
        <!-- shuffle -->
        <div class={iconBasicStyle}>
            <ShuffleButton />
        </div>
        <!-- previous song -->
        <div class={iconBasicStyle}>
            <PreviousButton />
        </div>
        <!-- play -->
        <div class={iconBasicStyle}>
            {#if $isPlaying}
                <PauseButton />
            {:else}
                <PlayButton />
            {/if}
        </div>
        <!-- next song -->
        <div class={iconBasicStyle}>
            <NextButton />
        </div>
        <!-- repeat mode -->
        <div class={iconBasicStyle}>
            <PlayModeButton />
        </div>
    </div>
</div>

<!-- binding the keyboard event -->
<svelte:window on:keydown={onKeyDown} />
