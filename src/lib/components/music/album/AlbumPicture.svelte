<script lang="ts">
    import { textStyle } from "$lib/global";
    import { onMount } from "svelte";
    import { MusicNoteBeamed } from "svelte-bootstrap-icons";
    let {
        size,
        imageSrc,
        name,
        coverMode = true,
    }: {
        size: number;
        imageSrc?: string;
        name?: string;
        coverMode?: boolean;
    } = $props();
    let halfSize = $derived(Math.round(size / 2));

    const sizes: Record<number, string> = {
        "5": "size-4",
        "6": "size-6",
        "7": "size-7",
        "8": "size-8",
        "10": "size-10",
        "12": "size-12",
        "14": "size-14",
        "16": "size-16",
        "24": "size-24",
        "32": "size-32",
        "48": "size-48",
        "60": "size-60",
    };
    const sizesKeys = Object.keys(sizes);
    onMount(() => {
        if (
            !sizesKeys.includes(String(size)) ||
            !sizesKeys.includes(String(halfSize))
        ) {
            throw RangeError(`The size ${size} must in key ${sizesKeys}`);
        }
    });
</script>

{#if imageSrc === undefined}
{@render defaultImage()}
{:else}
    <div class="flex-none {sizes[size]}">
        <div class="flex items-center justify-center">
            <img
                src={imageSrc}
                alt={name}
                class="{sizes[size]} {coverMode
                    ? 'object-cover'
                    : 'object-contain'}"
            />
        </div>
    </div>
{/if}

{#snippet defaultImage()}
    <div>
        <div class="flex-none {sizes[size]}">
            <div
                class="flex w-full h-full items-center justify-center bg-gray-200 dark:bg-stone-700"
            >
                <MusicNoteBeamed class="{textStyle} {sizes[halfSize]}" />
            </div>
        </div>
    </div>
{/snippet}
