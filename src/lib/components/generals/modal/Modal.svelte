<script lang="ts">
    import { fade } from "svelte/transition";
    import {
        borderStyle,
        buttonStyle,
        modalBackground,
        fadeParams,
    } from "$lib/global";
    import { XCircle } from "svelte-bootstrap-icons";
    import type { Writable } from "svelte/store";
    let {
        isModalOpen,
        children,
    }: { isModalOpen: Writable<boolean>; children: any } = $props();
</script>

{#if $isModalOpen}
    <div
        id="dialog"
        aria-labelledby="dialog-title"
        class="fixed inset-0 size-auto max-h-none max-w-none overflow-y-auto overscroll-none z-20"
    >
        {@render modalBackdrop()}
        <!-- adjust dialog position items-center/items-end -->
        <div
            transition:fade={fadeParams}
            class="flex min-h-full items-center justify-center p-4 text-center focus:outline-none sm:items-center sm:p-0"
        >
            <div
                class="min-w-xs flex items-center justify-center overflow-hidden rounded-lg h-full min-h-40 w-full sm:w-full sm:max-w-lg border {borderStyle} shadow {modalBackground}"
            >
                {@render modalCloseButton()}
                <div class="flex p-6 h-full w-full items-center justify-center">
                    {@render children?.()}
                </div>
            </div>
        </div>
    </div>
{/if}

{#snippet modalBackdrop()}
    <button
        aria-label="backdrop close"
        class="fixed inset-0 transition-opacity backdrop-blur-sm overscroll-none"
        transition:fade={fadeParams}
        onclick={() => {
            $isModalOpen = false;
        }}
    ></button>
{/snippet}

{#snippet modalCloseButton()}
    <button
        onclick={() => {
            $isModalOpen = !$isModalOpen;
        }}
        class="absolute p-1 right-5 top-5 {buttonStyle}"
    >
        <XCircle height="20" width="20" />
    </button>
{/snippet}
