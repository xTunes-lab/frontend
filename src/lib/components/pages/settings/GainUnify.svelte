<script lang="ts">
    import ItemSwitcherProperty from "$lib/components/generals/misc/ItemSwitcherProperty.svelte";
    import { config } from "$lib/stores/configs";
    import { t } from "$locale/i18n";
</script>

<div class="flex items-center">
    <ItemSwitcherProperty
        name={$t("settings.gain.unify")}
        bind:isChecked={$config.gainUnify}
    />
</div>
