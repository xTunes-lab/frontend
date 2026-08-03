<script>
    import { buttonStyle } from "$lib/global";
    import { pause } from "$lib/stores/playbackControl";
    import { t } from "$locale/i18n";
    import { PauseFill } from "svelte-bootstrap-icons";
</script>

<button on:click={() => pause()} title={$t("playbackcontrol.button.pause")}>
    <PauseFill width="24" height="24" class={buttonStyle} />
</button>
