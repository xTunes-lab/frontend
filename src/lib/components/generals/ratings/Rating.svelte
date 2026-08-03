<script lang="ts">
    import { writable } from "svelte/store";
    import Star from "./Star.svelte";
    import { onMount } from "svelte";
    import { StarStatus } from "$lib/stores/enums";

    let {
        rating = $bindable(0),
        count = $bindable(5),
        readOnly = false,
    } = $props();
    let intRating = Math.floor(rating);

    let ratingArray = Array(count).fill(StarStatus.empty);
    ratingArray.fill(StarStatus.full,0,intRating);
    ratingArray.fill(StarStatus.half,intRating,Math.ceil(rating - intRating));
    let statusArray = writable(ratingArray);
    onMount(() => {
        if (readOnly === false) {
            if (intRating !== rating) {
                console.warn(
                    "rating object rating value must be integer when not readonly == false",
                );
            }
        }
    });
</script>

<div
    class="flex items-center space-x-1 h-5"
>
    {#each [...Array($statusArray.length).keys()] as index}
        <Star bind:rating {index} {statusArray} {readOnly} />
    {/each}
</div>
