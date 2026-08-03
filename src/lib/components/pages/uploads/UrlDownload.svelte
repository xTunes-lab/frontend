<script>
    import ItemInputBox from "$lib/components/generals/misc/ItemInputBox.svelte";
    import { buttonStyle } from "$lib/global";
    import { t } from "$locale/i18n";
    import { CloudDownloadFill } from "svelte-bootstrap-icons";
    let url = $state();
</script>

<div class="flex flex-row gap-2 h-10 w-xs">
    <ItemInputBox bind:value={url} placeHolder={$t("share.description")} />

    <button
        class="{buttonStyle} p-2"
        title="Download audio from shared url"
    >
        <CloudDownloadFill class="size-5" />
    </button>
</div>
