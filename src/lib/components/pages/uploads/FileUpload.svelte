<script lang="ts">
    import { uploadFileWithInfo } from "$lib/api";
    import SpinButton from "$lib/components/generals/misc/SpinButton.svelte";
    import { iconStyle, inputBoxStyle } from "$lib/global";
    import {
        dragOver,
        onDragLeave,
        onDragOver,
        onDrop,
        file,
        cancelAudioUpload,
        onFileSelected,
    } from "$lib/stores/uploads";
    import { t } from "$locale/i18n";
    import { CloudArrowUpFill } from "svelte-bootstrap-icons";
    let fileInput: any;
</script>

<div class="flex flex-col gap-2 {iconStyle}">
    <button
        class="flex flex-col justify-center items-center {inputBoxStyle} border-gray-300 w-xs h-40"
        ondragover={onDragOver}
        ondrop={onDrop}
        ondragleave={onDragLeave}
        ondragend={onDragLeave}
        onclick={() => fileInput.click()}
    >
        <!-- accept="audio/*" -->
        <input
            bind:this={fileInput}
            class="hidden"
            type="file"
            accept=".m4a,audio/m4a"
            oninput={(e) => onFileSelected(e)}
            multiple
        />
        {@render uploadArea()}
    </button>

    <div class="flex w-xs">
        <div class="justify-start flex-row flex gap-2">
            <SpinButton
                width={20}
                callBack={async () => {
                    uploadFileWithInfo();
                }}
            >
                <div>{$t("uploads.upload")}</div>
            </SpinButton>
            <SpinButton width={20} callBack={cancelAudioUpload}>
                <div>{$t("uploads.cancel")}</div>
            </SpinButton>
        </div>
    </div>
</div>

{#snippet uploadArea()}
    {#if $file}
        {$file.name}
    {:else}
        <div>
            <CloudArrowUpFill class="size-10" />
        </div>
        <div>
            {#if $dragOver}
                <p>{$t("uploads.ondrop")}</p>
            {:else}
                <p>{$t("uploads.description")}</p>
            {/if}
        </div>
    {/if}
{/snippet}
