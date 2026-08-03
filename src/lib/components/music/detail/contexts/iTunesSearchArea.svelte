<script>
    import {
        isSearching,
        onSearchSongInfo,
        searchResult,
    } from "$lib/stores/uploads";
    import { t } from "$locale/i18n";
    import { name, artist } from "$lib/stores/uploads";
    import { iconStyle } from "$lib/global";
    import SpinButton from "$lib/components/generals/misc/SpinButton.svelte";
    import ItemInputBox from "$lib/components/generals/misc/ItemInputBox.svelte";
    import ItemTag from "$lib/components/generals/misc/ItemTag.svelte";
</script>

<div class="flex flex-row w-full items-center justify-center gap-2">
    <div class="flex flex-col gap-1">
        <ItemInputBox bind:value={$name} placeHolder={$t("property.title")} />
        <ItemInputBox
            bind:value={$artist}
            placeHolder={$t("property.artist")}
        />
    </div>

    <!-- <button
        class="{buttonStyle} rounded border p-2"
        onclick={async () => await onSearchSongInfo()}
        >{#if $isSearching}
            Searching
        {:else}
            Search
        {/if}</button
    > -->
    <SpinButton width={20} callBack={async () => await onSearchSongInfo()}>
        <div class={iconStyle}>{$t("uploads.search")}</div>
    </SpinButton>
</div>
