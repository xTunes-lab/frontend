<script lang="ts">
    import { textStyle } from "$lib/global";

    let {
        onClickCallback,
        children,
        description,
    }: { onClickCallback: any; children: any; description?: string } = $props();
</script>

<button
    class="flex h-8 text-left w-full px-4 py-2
    text-sm {textStyle} items-center dark:hover:bg-stone-800/70 hover:bg-gray-100/70 focus:outline-hidden"
    onclick={(e) => onClickCallback?.(e)}
    title={description}
>
    {@render children?.()}
</button>
