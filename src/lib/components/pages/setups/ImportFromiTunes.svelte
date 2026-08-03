<script lang="ts">
    import ItemTag from "$lib/components/generals/misc/ItemTag.svelte";
    import { inputBoxStyle } from "$lib/global";
    import { onImportItunesXml, xmlFile } from "$lib/stores/uploads";
    import { t } from "$locale/i18n";
</script>

<div class="flex w-full max-w-sm p-2">
    <ItemTag>{$t("setups.importfromitunes")}</ItemTag>
    <!-- <ItemInputBox bind:value={$config.libraryPath} /> -->
    <label class={inputBoxStyle}>
        {#if $xmlFile}
            {$xmlFile.name}
        {:else}
            {$t("setups.importfromitunes.filebox")}
        {/if}

        <input type="file" accept=".xml" on:change={onImportItunesXml} hidden />
    </label>
</div>
