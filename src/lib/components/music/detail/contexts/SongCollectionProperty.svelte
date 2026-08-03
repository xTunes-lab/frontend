<script lang="ts">
    import type { SongCollectionInfo } from "$lib/stores/property";
    import type { Writable } from "svelte/store";
    import { t } from "$locale/i18n";

    let {
        info,
        editMode = false,
    }: { info: Writable<SongCollectionInfo>; editMode: boolean } = $props();
    const itemNameStyle = "truncate text-end font-extralight";
</script>

<div class="flex flex-row w-full">
    <div class="flex flex-col gap-x-1 w-1/4">
        <div class={itemNameStyle}>{$t("property.album")}</div>
        <div class={itemNameStyle}>{$t("property.album.artist")}</div>
        <div class={itemNameStyle}>{$t("property.genre")}</div>
        <div class={itemNameStyle}>{$t("property.releasedate")}</div>
        <div class={itemNameStyle}>{$t("property.trackcount")}</div>
        <div class={itemNameStyle}>{$t("property.disccount")}</div>
        <div class={itemNameStyle}>{$t("property.complication")}</div>
        <!-- <div>- Album is a compilation of songs by various artists</div>  -->
        <div class={itemNameStyle}>{$t("property.rating")}</div>
    </div>
    <div class="flex flex-col gap-x-1 pl-2 w-3/4">
        <input
            id="album name"
            bind:value={$info.album_name}
            disabled={!editMode}
        />
        <input
            id="album artist"
            bind:value={$info.album_artist}
            disabled={!editMode}
        />
        <input id="genre" bind:value={$info.genre} disabled={!editMode} />
        <input
            id="release date"
            value={$info.release_year?.toLocaleDateString()}
            disabled={!editMode}
            oninput={(e) => {
                throw new Error("not implemented");
            }}
        />
        <input
            id="track count"
            bind:value={$info.track_count}
            disabled={!editMode}
        />
        <input
            id="disk count"
            bind:value={$info.disk_count}
            disabled={!editMode}
        />
        <input
            id="compilation"
            aria-details="Album is a compilation of songs by various artists"
            bind:value={$info.compliation}
            disabled={!editMode}
        />
        <input id="rating" bind:value={$info.rating} disabled={!editMode} />
    </div>
</div>
