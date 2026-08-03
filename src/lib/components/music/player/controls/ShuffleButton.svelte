<script>
    import { buttonStyle, buttonEnableStyle } from "$lib/global";
    import { shuffleMode } from "$lib/stores/playbackControl";
    import { t } from "$locale/i18n";
    import { CheckCircleFill, Shuffle } from "svelte-bootstrap-icons";
</script>

<button
    on:click={() => {
        $shuffleMode = !$shuffleMode;
    }}
    title={$t("playbackcontrol.button.shuffle")}
>
    <div class="relative {buttonStyle}">
        <Shuffle class="size-4" />
        {#if $shuffleMode == true}
            <div class="absolute right-0 bottom-0 pointer-events-none">
                <CheckCircleFill class="size-2" />
            </div>
        {/if}
    </div>
</button>
