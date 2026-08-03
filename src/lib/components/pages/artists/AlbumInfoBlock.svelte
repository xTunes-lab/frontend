<script lang="ts">
    import {
        borderStyle,
        divideYStyle,
        shuffleStyle,
        textStyle,
    } from "$lib/global";
    import { Shuffle } from "svelte-bootstrap-icons";
    import Rating from "$lib/components/generals/ratings/Rating.svelte";
    import { AlbumInfoLite, Time } from "$lib/entities";
    import AlbumPicture from "$lib/components/music/album/AlbumPicture.svelte";
    import {
        rightClickContextMenu,
        rightClickObjectParsing,
    } from "$lib/stores/contextMenu";
    import { t } from "$locale/i18n";
    import type { SongCollectionInfo } from "$lib/stores/property";
    let { info }: { info: SongCollectionInfo } = $props();
</script>

<div>
    <div
        aria-label="album name"
        class="h-auto flex items-center py-4 {textStyle}"
    >
        <AlbumPicture
            size={32}
            imageSrc={info?.cover}
            name={info?.album_name}
        />
        <div aria-label="album info" class="px-3 overflow-hidden">
            <div class="text-md text-start truncate">{info.album_name}</div>
            {#if info.source_info instanceof AlbumInfoLite}
                <!-- if is albuminfo we show the artist -->
                <div class="text-sm text-start truncate">
                    {info.album_artist}
                </div>
            {/if}
            <div class="text-sm text-start">
                {info.genre} • {info.release_year?.getFullYear()}
            </div>
        </div>
    </div>
    <div aria-label="album shuffle" class="h-auto flex justify-between">
        <button class="flex {shuffleStyle} items-center justify-center">
            <div class="pr-3">
                <Shuffle class="size-4" />
            </div>
            <div>shuffle</div>
        </button>
        <div class="{textStyle} font-extralight">
            {info.song_ids.length}
            {$t("page.song.count")}
        </div>
    </div>
    <div
        aria-label="album block"
        class="h-auto pb-4 {divideYStyle} {textStyle}"
    >
        <div aria-label="songs area" class="{divideYStyle} px-1 py-1">
            {#each info.song_infos as song}
                <button
                    class="flex flex-row w-full justify-between items-center py-1"
                    oncontextmenu={(e) => {
                        rightClickObjectParsing(song);
                        rightClickContextMenu(e);
                    }}
                >
                    <div class="text-sm w-1/10">
                        {song.track_number}
                    </div>
                    <div
                        class="w-5/10 sm:w-5/10 text-start pr-2 text-sm truncate"
                    >
                        {song.title}
                    </div>
                    <div class="w-auto pr-2 items-center">
                        <Rating rating={song.rating} />
                    </div>
                    <div class="min-w-5 w-auto text-end">
                        {song.durationTime?.toMinSecString()}
                    </div>
                </button>
            {/each}
        </div>
    </div>
</div>

<style>
</style>
