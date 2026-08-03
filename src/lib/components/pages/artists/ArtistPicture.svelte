<script lang="ts">
    import type { ArtistInfoLite } from "$lib/entities";
    import { iconStyle } from "$lib/global";
    import { PersonFill } from "svelte-bootstrap-icons";
    let { artistInfo }: { artistInfo: ArtistInfoLite } = $props();
</script>

{#if artistInfo.albums[0].cover === undefined}
    <div
        class="flex rounded-full border border-slate-300 dark:border-stone-700 size-8 items-center justify-center min-w-8"
    >
        <PersonFill class="size-5 {iconStyle} flex-none" />
    </div>
{:else}
    <div class="min-w-8">
        <img
            alt="artist: {artistInfo.artist}"
            class="flex-none size-8 object-cover rounded-full"
            src={artistInfo.albums[0].cover}
        />
    </div>
{/if}
