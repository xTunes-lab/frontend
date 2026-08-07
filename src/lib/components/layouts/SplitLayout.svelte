<script lang="ts">
    import { afterNavigate, beforeNavigate } from "$app/navigation";
    import {
        backgroundStyle,
        borderStyle,
        buttonStyle,
        fadeParams,
        mdWidth,
        modalBackground,
    } from "$lib/global";
    import { isMobileMode, onWindowResize, showLogin } from "$lib/stores/ui";
    import { onMount } from "svelte";
    import { ArrowLeftRight } from "svelte-bootstrap-icons";
    import type { Writable } from "svelte/store";
    import { fade } from "svelte/transition";

    let listDiv: HTMLDivElement | undefined = $state();
    let blockDiv: HTMLDivElement | undefined = $state();

    let {
        isClicked,
        listScrollStore,
        blockScrollStore,
        listChildren,
        blockChildren,
    }: {
        isClicked: Writable<any>;
        listScrollStore: Writable<number>;
        blockScrollStore: Writable<number>;
        listChildren: any;
        blockChildren: any;
    } = $props();
    beforeNavigate(() => {
        if (listDiv) $listScrollStore = listDiv.scrollTop;
        if (blockDiv) $blockScrollStore = blockDiv.scrollTop;
    });
    afterNavigate(() => {
        listDiv!.scrollTop = $listScrollStore;
        blockDiv!.scrollTop = $blockScrollStore;
    });
    let showList = $state(true);
    let showBlock = $state(true);

    isMobileMode.subscribe((flag) => {
        if (flag) {
            showList = false;
            showBlock = true;
        } else {
            showList = true;
            showBlock = true;
        }
    });
    function onClick() {
        showList = !showList;
        if (!showList) {
            showBlock = true;
        } else {
            showBlock = false;
        }
    }
    onMount(() => {
        onWindowResize();
        isClicked.subscribe(() => {
            if ($isMobileMode) {
                onClick();
            }
        });
    });
</script>

{#if $isMobileMode}
    <button
        class="flex items-center justify-center showdow-2xl rounded-full border {borderStyle} size-10 absolute bottom-20 left-3 {modalBackground} {buttonStyle}"
        onclick={() => onClick()}
    >
        <ArrowLeftRight class="size-4" />
    </button>
{/if}
<div
    bind:this={listDiv}
    class="flex p-2 {showList
        ? 'w-full'
        : 'hidden'} sm:w-1/3 border-r {borderStyle} h-full overflow-y-auto"
>
    {@render listChildren?.()}
</div>
<div
    bind:this={blockDiv}
    class="flex p-4 px-6 {showBlock
        ? 'w-full'
        : 'hidden'} border-r {borderStyle} h-full overflow-y-auto"
>
    {@render blockChildren?.()}
</div>
