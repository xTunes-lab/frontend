<script>
    import { borderStyle } from "$lib/global";

    let { children } = $props();
</script>

<td class="p-2 transition-none truncate max-w-40 min-w-0">
    {@render children()}
</td>
