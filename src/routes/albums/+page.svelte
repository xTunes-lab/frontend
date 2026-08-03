<script lang="ts">
    import FullLayout from "$lib/components/layouts/FullLayout.svelte";
    import AlbumCard from "$lib/components/music/album/AlbumCard.svelte";
    import { albumPageData } from "$lib/stores/pages";
    import { textStyle } from "$lib/global";
    import { t } from "$locale/i18n";
    import { afterNavigate, beforeNavigate } from "$app/navigation";
    import { albumPageScroll } from "$lib/stores/ui";
    beforeNavigate(() => {
        $albumPageScroll = document.documentElement.scrollTop;
    });
    afterNavigate(() => {
        document.documentElement.scrollTop = $albumPageScroll;
    });
</script>

<FullLayout>
    <div class={$albumPageData.length !== 0 ? "p-8" : ""}>
        <div
            class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-y-6 gap-x-4 place-items-center"
        >
            {#each $albumPageData as albumInfo}
                <AlbumCard
                    {albumInfo}
                    onClickCallback={() => albumInfo.detail()}
                />
            {/each}
        </div>
    </div>
    <div
        class="flex items-center justify-center h-10 {textStyle} font-extralight"
    >
        {$albumPageData.length}
        {$t("page.album.count")}
    </div>
</FullLayout>
