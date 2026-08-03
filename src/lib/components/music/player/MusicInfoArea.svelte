<script lang="ts">
    import PlaybackControl from "./PlaybackControl.svelte";
    import PlaybackLCD from "./PlaybackLCD.svelte";
</script>

<div
    id="music-player"
    class="flex justify-center md:justify-between items-center"
>
    <PlaybackLCD />
    <div class="hidden md:flex min-w-48 items-center justify-center">
        <PlaybackControl />
    </div>
</div>
