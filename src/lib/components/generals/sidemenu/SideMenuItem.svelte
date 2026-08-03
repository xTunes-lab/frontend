<script lang="ts">
    import { type Snippet } from "svelte";
    import { isSideMenuOpen } from "$lib/stores/ui";
    import { page } from "$app/state";
    let {
        href,
        children,
        text,
    }: {
        href: string;
        children: Snippet;
        text: string;
    } = $props();
</script>

<button
    onclick={() => {
        $isSideMenuOpen = false;
    }}
    class="w-full pt-1"
>
    <a {href}>
        <!-- control the button style like hover or color -->
        <div
            class="flex h-10 items-center rounded-md dark:hover:bg-stone-800 hover:bg-gray-200 {page
                .url.pathname === href
                ? 'dark:bg-stone-800 bg-gray-200'
                : ''}"
        >
            <div class="pl-5">
                {@render children?.()}
            </div>
            <div
                class="block text-left px-4 py-2 text-md text-gray-700 focus:bg-gray-100 focus:text-gray-900 focus:outline-hidden dark:text-white select-none"
            >
                {text}
            </div>
        </div>
    </a>
</button>
