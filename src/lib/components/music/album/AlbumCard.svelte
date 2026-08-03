<script lang="ts">
    import { AlbumInfoLite } from "$lib/entities";
    import { iconStyle } from "$lib/global";
    import {
        rightClickContextMenu,
        rightClickObjectParsing,
    } from "$lib/stores/contextMenu";

    import AlbumPicture from "./AlbumPicture.svelte";
    let {
        albumInfo,
        onClickCallback,
    }: { albumInfo: AlbumInfoLite; onClickCallback: Function | null } =
        $props();
</script>

<div class="flex-col w-32">
    <button
        onclick={(e) => {
            if (onClickCallback === null) return;
            onClickCallback(e,albumInfo);
        }}
        oncontextmenu={(e) => {
            rightClickObjectParsing(albumInfo);
            rightClickContextMenu(e);
        }}
    >
        <AlbumPicture
            size={32}
            imageSrc={albumInfo?.cover}
            name={albumInfo?.name}
            coverMode={false}
        />
    </button>

    <div>
        <p class="max-h-10 h-5 text-sm font-bold truncate {iconStyle}">
            {albumInfo.name}
        </p>
        <p class="max-h-10 h-5 text-sm truncate {iconStyle}">
            {albumInfo.artist}
        </p>
    </div>
</div>
