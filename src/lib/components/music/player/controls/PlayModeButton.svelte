<script lang="ts">
    import { buttonStyle } from "$lib/global";
    import { config } from "$lib/stores/configs";
    import { RepeatMode } from "$lib/stores/enums";
    import { changePlayMode } from "$lib/stores/playbackControl";
    import { t } from "$locale/i18n";
    import { Repeat, Repeat1 } from "svelte-bootstrap-icons";
</script>

<button
    on:click={() => changePlayMode()}
    title={$t("playbackcontrol.button.mode")}
>
    {#if $config.repeatMode === RepeatMode.All}
        <Repeat class="{buttonStyle} size-4" />
    {:else}
        <Repeat1 class="{buttonStyle} size-4" />
    {/if}
</button>
