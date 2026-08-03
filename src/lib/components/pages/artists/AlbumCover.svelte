<script lang="ts">
    let { imgSrc, name, size }: { imgSrc: string; name: string; size: number } =
        $props();
</script>

<div class="size-{size} flex items-center justify-center">
    <img
        src={imgSrc}
        alt={name}
        class="max-w-{size} max-h-{size} object-contain shadow-lg"
    />
</div>
