<script lang="ts">
    import { homePageData, allSong } from "$lib/stores/pages";
    import YearBanner from "$lib/components/music/album/YearBanner.svelte";
    import AlbumBlock from "$lib/components/music/album/AlbumBlock.svelte";
    import FullLayout from "$lib/components/layouts/FullLayout.svelte";
    import { textStyle } from "$lib/global";
    import { t } from "$locale/i18n";
    import { afterNavigate, beforeNavigate } from "$app/navigation";
    import { homePageScroll } from "$lib/stores/ui";
    import { onMount } from "svelte";
    import { loadSetting } from "$lib/stores/configs";

    beforeNavigate(() => {
        $homePageScroll = document.documentElement?.scrollTop;
    });
    afterNavigate(() => {
        document.documentElement!.scrollTop = $homePageScroll;
    });
    onMount(() => {
        loadSetting();
    });
</script>

<FullLayout>
    {#each $homePageData as data}
        <div class="relative">
            <YearBanner description={data.description} />
            <AlbumBlock albumInfos={data.album_infos} />
        </div>
    {/each}
    <div
        class="flex items-center justify-center h-10 {textStyle} font-extralight"
    >
        {$allSong.size}
        {$t("page.song.count")}
    </div>
</FullLayout>
