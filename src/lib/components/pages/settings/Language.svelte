<script lang="ts">
    import ItemTag from "$lib/components/generals/misc/ItemTag.svelte";
    import { config } from "$lib/stores/configs";
    import SelectBox from "$lib/components/generals/misc/SelectBox.svelte";
    import { translations } from "$locale/translations";
    import { t } from "$locale/i18n";
</script>

<div class="flex w-full max-w-sm p-2">
    <ItemTag>{$t("settings.lang")}</ItemTag>
    <SelectBox
        options={Object.keys(translations)}
        bind:selected={$config.language}
    />
</div>
