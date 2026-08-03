<script lang="ts">
    import AlbumPicture from "../album/AlbumPicture.svelte";
    import { buttonStyle, textStyle } from "$lib/global";
    import Modal from "$lib/components/generals/modal/Modal.svelte";
    import {
        confirmBoxYesCallback,
        isPropertyModalOpen,
        openConfirmBox,
    } from "$lib/stores/ui";
    import { AlbumInfoLite, SongInfo } from "$lib/entities";
    import SongProperty from "./contexts/SongProperty.svelte";
    import SongCollectionProperty from "./contexts/SongCollectionProperty.svelte";
    import {
        saveSongProperty,
        saveAlbumProperty,
        infoEditing,
        SongCollectionInfo,
    } from "$lib/stores/property";
    import { writable, type Writable } from "svelte/store";
    import { isSong } from "$lib/stores/music";
    import { ArrowRepeat, Search, Trash2 } from "svelte-bootstrap-icons";
    import SpinButton from "$lib/components/generals/misc/SpinButton.svelte";
    import { t } from "$locale/i18n";
    import { deleteSong, syncProperty } from "$lib/api";
</script>

<Modal isModalOpen={isPropertyModalOpen}>
    <div class="flex-1 w-full h-full items-center justify-center {textStyle}">
        <div class="flex flex-col items-center gap-2 justify-center h-full">
            {@render informationArea()}
            {@render propertyArea()}
            {@render functionalArea()}
        </div>
    </div>
</Modal>

{#snippet informationArea()}
    <div class="flex w-8/10 h-full ">
        {#if $infoEditing instanceof SongInfo}
            <AlbumPicture
                size={32}
                imageSrc={($infoEditing as SongInfo).covers?.[0]}
            />
        {/if}
        {#if $infoEditing instanceof SongCollectionInfo}
            {#if ($infoEditing as SongCollectionInfo).source_info instanceof AlbumInfoLite}
                <AlbumPicture
                    size={32}
                    imageSrc={($infoEditing as SongCollectionInfo).cover}
                />
            {:else}
                <!-- todo: show 4 picture combination -->
                <div class="grid grid-cols-2 min-w-32 max-h-32">
                    {#each [1, 2, 3, 4] as data}
                        <div
                            class="w-full h-full flex items-center justify-center"
                        >
                            <AlbumPicture size={14} />
                        </div>
                    {/each}
                </div>
                <!-- <div class="grid grid-cols-2 min-w-32 max-h-32">
                    {#each ($infoEditing as SongCollectionInfo).song_infos.slice(0, 4) as info}
                        <div
                            class="w-full h-full flex items-center justify-center"
                        >
                            <AlbumPicture
                                size={14}
                                name="collection picture"
                                imageSrc={info.covers?.[0]}
                            />
                        </div>
                    {/each}
                </div> -->
            {/if}
        {/if}
        <div
            class="flex flex-col truncate w-full pl-2 gap-y-0 h-32 items-start justify-center"
        >
            {#if isSong()}
                <div class="flex text-xl justify-start">
                    {($infoEditing as SongInfo).title}
                </div>
                <div class="flex text-md justify-start">
                    {($infoEditing as SongInfo).artists}
                </div>
                <div class="flex text-sm justify-start">
                    {($infoEditing as SongInfo).album_name}
                </div>
            {:else}
                <div class="flex text-md justify-start">
                    {($infoEditing as SongCollectionInfo).album_name}
                </div>
                <div class="flex text-sm justify-start">
                    {($infoEditing as SongCollectionInfo).album_artist}
                </div>
            {/if}
        </div>
    </div>
{/snippet}
{#snippet propertyArea()}
    <div
        class="flex flex-col items-center gap-0.1 overflow-auto w-full max-h-80"
    >
        {#if isSong()}
            <SongProperty
                info={infoEditing as Writable<SongInfo>}
                editMode={true}
            />
        {:else}
            <SongCollectionProperty
                info={infoEditing as Writable<SongCollectionInfo>}
                editMode={true}
            />
        {/if}
    </div>
{/snippet}

{#snippet functionalArea()}
    <div class="flex w-full justify-between items-center gap-x-2">
        <div class="flex flex-row gap-2 justify-start">
            <button
                title="Sync"
                onclick={() =>
                    openConfirmBox($t("confirmbox.sync.message"), syncProperty)}
            >
                <ArrowRepeat class="size-5 {buttonStyle} text-blue-500" />
            </button>
            <button
                title="Delete"
                onclick={() =>
                    openConfirmBox($t("confirmbox.delete.message"), deleteSong)}
            >
                <Trash2 class="size-5 {buttonStyle}" />
            </button>
            <button title="Search info">
                <Search class="{buttonStyle} size-4" />
            </button>
        </div>

        <SpinButton
            width={14}
            height={8}
            callBack={() =>
                openConfirmBox($t("confirmbox.save.message"), () => {
                    if (isSong()) {
                        saveSongProperty();
                    } else {
                        saveAlbumProperty();
                    }
                })}>{$t("property.savebutton")}</SpinButton
        >
    </div>
{/snippet}
