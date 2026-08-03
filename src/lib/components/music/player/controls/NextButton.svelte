<script>
    import { buttonStyle } from "$lib/global";
    import { nextSong } from "$lib/stores/playbackControl";
    import { t } from "$locale/i18n";
    import { SkipForwardFill } from "svelte-bootstrap-icons";
</script>

<button onclick={() => nextSong()} title={$t("playbackcontrol.button.next")}>
    <SkipForwardFill width="16" height="16" class={buttonStyle} />
</button>
