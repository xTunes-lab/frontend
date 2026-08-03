<script lang="ts">
    import { textStyle } from "$lib/global";
    import { t } from "$locale/i18n";
    import { type Snippet } from "svelte";
    import * as search from "$lib/stores/search";
    let {
        icon,
        text,
    }: {
        icon: Snippet;
        text: string;
    } = $props();
</script>

<div class="relative w-full">
    <div class="flex h-10 items-center rounded-md">
        <div class="absolute left-5">
            {@render icon?.()}
        </div>
        <input
            class="pl-14 w-full bg-transparent placeholder:text-slate-500 dark:placeholder:text-white
            {textStyle} text-sm border
            border-slate-200 dark:border-stone-500
            rounded-md px-3 py-2
            focus:outline-none focus:border-slate-400 dark:focus:border-stone-600
            hover:border-slate-300 dark:hover:border-stone-600 focus:shadow"
            placeholder={$t("sidemenu.search")}
            oninput={(e) => {
                const keywords = e.currentTarget.value;
                search.searchSong(keywords);
                search.searchRecent(keywords);
                search.searchArtist(keywords);
                search.searchAlbum(keywords);
                search.searchGenre(keywords);
            }}
        />
    </div>
</div>
