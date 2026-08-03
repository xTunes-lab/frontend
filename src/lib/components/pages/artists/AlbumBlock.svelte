<script lang="ts">
    import { ArtistInfoLite } from "$lib/entities";
    import {
        divideYStyle,
        iconStyle,
        shuffleStyle,
        textStyle,
    } from "$lib/global";
    import { Shuffle } from "svelte-bootstrap-icons";
    import AlbumInfoBlock from "./AlbumInfoBlock.svelte";
    import { t } from "$locale/i18n";
    import { SongCollectionInfo } from "$lib/stores/property";
    let { artistInfo }: { artistInfo: ArtistInfoLite } = $props();
</script>

<div class="w-full h-auto {divideYStyle}">
    {@render header()}
    {#each artistInfo.albums as info}
        <AlbumInfoBlock info={SongCollectionInfo.fromAlbumInfo(info)} />
    {/each}
</div>

{#snippet header()}
    <div
        aria-label="Airtist Name"
        class="flex min-h-13 justify-between {textStyle} items-center"
    >
        <div>
            <div>{artistInfo.artist}</div>
            <div class="flex text-md {iconStyle}">
                <div>
                    {artistInfo.albums.length}
                    {$t("page.album.count")}
                    ,
                </div>
                <div class="pl-1">
                    {artistInfo.songsCount}
                    {$t("page.song.count")}
                </div>
            </div>
        </div>
        <button class="flex items-center {shuffleStyle}">
            <div class="p-2">Shuffle all</div>
            <Shuffle class="size-4" />
        </button>
    </div>
{/snippet}
