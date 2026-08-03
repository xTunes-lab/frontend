<script lang="ts">
    import ItemInputBox from "$lib/components/generals/misc/ItemInputBox.svelte";
    import ItemTag from "$lib/components/generals/misc/ItemTag.svelte";
    import { config } from "$lib/stores/configs";
    import { t } from "$locale/i18n";
</script>

<div class="flex w-full max-w-sm p-2">
    <ItemTag>{$t("settings.backend.address")}</ItemTag>
    <ItemInputBox bind:value={$config.serverAddress} />
</div>
