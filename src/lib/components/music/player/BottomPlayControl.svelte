<script>
    import {
        backgroundStyle,
        borderStyle,
    } from "$lib/global";
    import PlaybackControl from "./PlaybackControl.svelte";
</script>

<div
    class="fixed sm:hidden h-16 flex bottom-0 z-10 w-full justify-center {backgroundStyle} shadow border-t {borderStyle}"
>
    <div class="flex min-w-48 w-64">
        <PlaybackControl />
    </div>
</div>
