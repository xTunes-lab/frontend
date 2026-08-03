<script lang="ts">
    import { borderStyle, fadeParams, modalBackground } from "$lib/global";
    import { fade } from "svelte/transition";
    import SpinButton from "../misc/SpinButton.svelte";
    import {
        ConfirmBoxNo,
        confirmBoxText,
        ConfirmBoxYes,
        isConfirmBoxOpen,
    } from "$lib/stores/ui";
    import { t } from "$locale/i18n";
</script>

{#if $isConfirmBoxOpen}
    <div class="fixed inset-0 flex items-center justify-center z-20">
        <div
            aria-label="backdrop blur"
            class="fixed inset-0 z-0 backdrop-blur-xs overscroll-none"
        ></div>
        <div
            class="flex h-40 w-70 min-w-3xs z-10 items-center justify-center {borderStyle} border shadow {modalBackground} rounded-xl p-2"
            // transition:fade={fadeParams}
        >
            <div class="flex flex-col h-full w-full">
                <div class="flex items-center justify-center h-2/3 pt-5">
                    {$confirmBoxText}
                </div>
                <div class="flex h-1/3 w-full items-center justify-center">
                    <div
                        class="w-full h-auto flex flex-row justify-between items-center gap-x-3 px-2"
                    >
                        <SpinButton
                            width={28}
                            height={8}
                            callBack={ConfirmBoxNo}
                            >{$t("confirmbox.no")}</SpinButton
                        >
                        <SpinButton
                            width={28}
                            height={8}
                            callBack={ConfirmBoxYes}
                            >{$t("confirmbox.yes")}</SpinButton
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
{/if}
