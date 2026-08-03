<script lang="ts">
    import {
        buttonStyle,
        iconStyle,
    } from "$lib/global";
    import { SortDown, SortUp } from "svelte-bootstrap-icons";
    import { SortType } from "./SortType";
    import type { Snippet } from "svelte";

    let { children }: { children: Snippet } = $props();
    let sortType = $state<SortType>(SortType.None);
    function switchState(flag: SortType): void {
        
        switch (flag) {
            case SortType.None:
                flag = SortType.Down;
                break;
            case SortType.Down:
                flag = SortType.Up;
                break;
            case SortType.Up:
                flag = SortType.None;
                break;
        }
    }
</script>

<button
    class="pl-2 flex justify-center items-center  {buttonStyle}"
    onclick={() => switchState(sortType)}
>
    <div class="select-none flex-auto text-sm items-center {iconStyle} ">
        {@render children?.()}
    </div>

    <div class="mx-1">
        {#if sortType === SortType.Down}
            <SortDown class="{iconStyle} size-4" />
        {:else if sortType === SortType.Up}
            <SortUp class="{iconStyle} size-4" />
        {:else}
            <div class="size-4"></div>
        {/if}
    </div>
</button>
