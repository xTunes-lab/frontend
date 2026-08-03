<script>
    import { divideYStyle, iconStyle } from "$lib/global";

    let { children } = $props();
</script>

<tbody class="{iconStyle} w-full h-auto {divideYStyle}">
    {@render children()}
</tbody>
