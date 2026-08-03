<script lang="ts">
    import { textStyle } from "$lib/global";
    import { t } from "$locale/i18n";

    let { option = $bindable() } = $props();
</script>

<div class="flex flex-row gap-10 justify-center {textStyle}">
    <label class="flex items-center gap-2 select-none text-sm">
        <input
            type="radio"
            name="option create"
            value={true}
            bind:group={option}
            checked
        /> <span>{$t("setups.createnewlibrary")}</span>
    </label>
    <label class="flex items-center gap-2 select-none text-sm">
        <input
            type="radio"
            name="option import"
            value={false}
            bind:group={option}
        /> <span>{$t("setups.importfromitunes")}</span>
    </label>
</div>
