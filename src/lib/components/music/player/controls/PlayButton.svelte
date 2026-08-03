<script>
    import { buttonStyle } from "$lib/global";
    import { resume } from "$lib/stores/playbackControl";
    import { t } from "$locale/i18n";
    import { PlayFill } from "svelte-bootstrap-icons";
</script>

<button on:click={() => resume()} title={$t("playbackcontrol.button.play")}>
    <PlayFill width="24" height="24" class={buttonStyle} />
</button>
