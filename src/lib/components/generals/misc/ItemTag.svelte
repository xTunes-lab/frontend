<script>
    import { textStyle } from "$lib/global";

    let { children } = $props();
</script>

<div
    class="pr-2 shrink-0 text-sm min-w-30 flex items-center whitespace-nowrap {textStyle}"
>
    {@render children?.()}
</div>
