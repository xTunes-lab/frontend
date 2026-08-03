<script>
    let { children = undefined } = $props();
</script>

<th class=" p-2 text-left transition-none truncate">
    {@render children?.()}
</th>
