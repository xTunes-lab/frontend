<script lang="ts">
    import SpinIcon from "$lib/components/pages/setups/SpinIcon.svelte";
    import { normalButtonStyle } from "$lib/global";
    import { onMount } from "svelte";

    let {
        width,
        height = 8,
        callBack = undefined,
        children = undefined,
    }: {
        width: number;
        height?: number;
        callBack: CallableFunction | undefined;
        children: any;
    } = $props();
    const widths: Record<number, string> = {
        5: "w-4 min-w-4 max-w-4",
        6: "w-6 min-w-6 max-w-6",
        8: "w-8 min-w-8 max-w-8",
        10: "w-10 min-w-10 max-w-10",
        12: "w-12 min-w-12 max-w-12",
        14: "w-14 min-w-14 max-w-14",
        16: "w-16 min-w-16 max-w-16",
        20: "w-20 min-w-20 max-w-20",
        24: "w-24 min-w-24 max-w-24",
        28: "w-28 min-w-28 max-w-28",
        32: "w-32 min-w-32 max-w-32",
        48: "w-48 min-w-48 max-w-48",
        60: "w-60 min-w-60 max-w-60",
    };
    const heights: Record<number, string> = {
        3: "h-3",
        4: "h-4",
        5: "h-5",
        6: "h-6",
        7: "h-7",
        8: "h-8",
    };
    const widthKeys = Object.keys(widths);
    const heightKeys = Object.keys(heights);
    onMount(() => {
        if (!widthKeys.includes(String(width))) {
            throw RangeError(`The width ${width} must in key ${widthKeys}`);
        }
        if (!heightKeys.includes(String(height))) {
            throw RangeError(`The height ${height} must in key ${heightKeys}`);
        }
    });
</script>

<button
    class="flex items-center justify-center
    {widths[width]} {heights[height]}  
    {normalButtonStyle}"
    onclick={() => callBack?.()}
>
    <div class="flex items-center justify-center w-full h-full">
        {@render children?.()}
    </div>
</button>
