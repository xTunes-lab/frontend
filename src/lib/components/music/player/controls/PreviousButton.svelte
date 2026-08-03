<script>
    import { buttonStyle } from "$lib/global";
    import { previousSong } from "$lib/stores/playbackControl";
    import { t } from "$locale/i18n";
    import { SkipBackwardFill } from "svelte-bootstrap-icons";
</script>

<button
    onclick={() => previousSong()}
    title={$t("playbackcontrol.button.previous")}
>
    <SkipBackwardFill width="16" height="16" class={buttonStyle} />
</button>
