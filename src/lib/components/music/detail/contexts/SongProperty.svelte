<script lang="ts">
    import { SongInfo } from "$lib/entities";
    import { textStyle } from "$lib/global";
    import { t } from "$locale/i18n";
    import { type Writable } from "svelte/store";
    let {
        info,
        editMode = false,
    }: { info: Writable<SongInfo>; editMode: boolean } = $props();
    const itemNameStyle = "truncate text-end font-extralight";
</script>

<div class="flex flex-row w-full">
    <div class="flex flex-col gap-x-1 w-1/4">
        <div class={itemNameStyle}>{$t("property.id")}</div>
        <div class={itemNameStyle}>{$t("property.title")}</div>
        <div class={itemNameStyle}>{$t("property.artist")}</div>
        <div class={itemNameStyle}>{$t("property.album")}</div>
        <div class={itemNameStyle}>{$t("property.album.artist")}</div>
        <div class={itemNameStyle}>{$t("property.composers")}</div>
        <div class={itemNameStyle}>{$t("property.genre")}</div>
        <div class={itemNameStyle}>{$t("property.releasedate")}</div>
        <div class={itemNameStyle}>{$t("property.tracknumber")}</div>
        <div class={itemNameStyle}>{$t("property.discnumber")}</div>
        <div class={itemNameStyle}>{$t("property.complication")}</div>
        <!-- <div>- Album is a compilation of songs by various artists</div>  -->
        <div class={itemNameStyle}>{$t("property.rating")}</div>
        <div class={itemNameStyle}>{$t("property.playcount")}</div>
        <div class={itemNameStyle}>{$t("property.comments")}</div>
        <div class={itemNameStyle}>{$t("property.duration")}</div>
        <div class={itemNameStyle}>{$t("property.bitrate")}</div>
        <div class={itemNameStyle}>{$t("property.dateadded")}</div>
        <div class={itemNameStyle}>{$t("property.datemodified")}</div>
        <div class={itemNameStyle}>{$t("property.filepath")}</div>
        <div class={itemNameStyle}>{$t("property.copyright")}</div>
        <div class={itemNameStyle}>{$t("property.lyrics")}</div>
    </div>
    <div class="flex flex-col gap-x-1 pl-2 w-3/4">
        <input
            id="database id"
            bind:value={$info.id}
            disabled={true}
            class="truncated"
        />
        <input
            id="title"
            bind:value={$info.title}
            disabled={!editMode}
            class="truncated"
        />
        <input id="artists" bind:value={$info.artists} disabled={!editMode} />
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
        <input
            id="composers"
            value={$info.composers}
            disabled={!editMode}
            onblur={(e) => {
                const data = e.currentTarget.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean);
                $info.composers = data;
            }}
        />
        <input id="genre" bind:value={$info.genre} disabled={!editMode} />
        <input
            id="release date"
            value={$info.releaseDate?.toISOString().slice(0, 10)}
            disabled={!editMode}
            onblur={(e) => {
                const date = new Date(e.currentTarget.value);
                $info.release_date = date.toISOString();
            }}
        />
        <input
            id="track number"
            bind:value={$info.track_number}
            disabled={!editMode}
        />
        <input id="disk" bind:value={$info.disk_number} disabled={!editMode} />
        <input
            id="compilation"
            aria-details="Album is a compilation of songs by various artists"
            bind:value={$info.compilation}
            disabled={!editMode}
        />
        <input id="rating" bind:value={$info.rating} disabled={!editMode} />
        <input
            id="play count"
            bind:value={$info.play_count}
            disabled={!editMode}
        />

        <!-- <input id="bpm" bind:value={$info.bit_rate} disabled={!editMode} /> -->
        <input id="comments" bind:value={$info.comment} disabled={!editMode} />
        <input
            id="duration"
            value={$info.durationTime?.toMinSecString()}
            disabled={true}
        />
        <input id="bit rate" value={$info.bit_rate} disabled={true} />
        <input
            id="date added"
            value={$info.dateAdded?.toISOString().slice(0, 10)}
            disabled={true}
        />
        <input
            id="date modified"
            value={$info.dateModified?.toISOString().slice(0, 10)}
            disabled={true}
        />
        <input
            id="file path"
            bind:value={$info.file_path}
            disabled={!editMode}
        />
        <input
            id="copyright"
            bind:value={$info.copyright}
            disabled={!editMode}
        />
        <textarea
            class="h-20 resize-none"
            id="lyrics"
            bind:value={$info.lyrics}
            disabled={!editMode}
        ></textarea>
    </div>
</div>
