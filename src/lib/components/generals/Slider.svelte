<script lang="ts">
    let {
        value = $bindable(),
        max = 100,
        onInput,
    }: {
        value: any;
        max: number;
        onInput?: CallableFunction;
    } = $props();
</script>

<input
    id="slider"
    type="range"
    min={0}
    {max}
    oninput={(e) => onInput?.(e)}
    class="
    h-1 w-full appearance-none roudned-md bg-gray-300/80 dark:bg-white/80
    /* Chrome, Safari, Opera, Edge */
    [&::-webkit-slider-thumb]:appearance-none
    [&::-webkit-slider-thumb]:h-2
    [&::-webkit-slider-thumb]:w-1
    [&::-webkit-slider-thumb]:bg-gray-500/80
    dark:[&::-webkit-slider-thumb]:bg-white/80
    
    /* Firefox */
    [&::-moz-range-thumb]:appearance-none
    [&::-moz-range-thumb]:border-none
    [&::-moz-range-thumb]:h-2
    [&::-moz-range-thumb]:w-1
    [&::-moz-range-thumb]:rounded-none
    [&::-moz-range-thumb]:bg-gray-500/80
    dark:[&::-moz-range-thumb]:bg-white/80
    "
    bind:value
/>
