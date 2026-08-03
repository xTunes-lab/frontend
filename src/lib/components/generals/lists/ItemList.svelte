<script lang="ts">
    import { divideYStyle } from "$lib/global";
    let { children }: { children: any } = $props();
</script>

<div class="flex flex-col {divideYStyle} w-full">
    {@render children?.()}
</div>
