<script lang="ts">
    import { Star, StarFill, StarHalf } from "svelte-bootstrap-icons";
    import type { Writable } from "svelte/store";
    import { StarStatus } from "$lib/stores/enums";
    let {
        rating = $bindable(),
        index,
        statusArray,
        readOnly = false,
    }: {
        rating: number;
        index: number;
        statusArray: Writable<StarStatus[]>;
        readOnly: boolean;
    } = $props();
    import { textStyle } from "$lib/global";
    let originalStatusArray = $statusArray;
</script>

<button
    aria-label="start button"
    onclick={() => {
        return;
        //rating is not working good, disable now
        if (readOnly == true) return;
        $statusArray = Array($statusArray.length)
            .fill(StarStatus.empty)
            .fill(StarStatus.full, 0, index + 1);

        originalStatusArray = $statusArray;
        rating = $statusArray.filter((item) => item === StarStatus.full).length;
    }}
    class="justify-center"
>
    {#if $statusArray[index] === StarStatus.empty}
        <Star class={textStyle} />
    {:else if $statusArray[index] === StarStatus.full}
        <StarFill class={textStyle} />
    {:else}
        <StarHalf class={textStyle} />
    {/if}
</button>
