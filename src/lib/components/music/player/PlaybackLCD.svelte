<script>
    import LCDInfoCard from "./display/LCDInfoCard.svelte";
    import LCDAlbum from "./display/LCDAlbum.svelte";
</script>

<!-- playback lcd -->
<div class="flex w-full rounded-lg border border-gray-300 dark:border-stone-900 overflow-hidden">
    <!-- album pic -->
    <div
        class="flex w-10 h-10 min-w-10 min-h-10  items-center justify-center border-r border-gray-300 dark:border-stone-900"
    >
        <LCDAlbum />
    </div>
    <!-- album info-->
    <div
        class="flex w-full items-center justify-center bg-white dark:bg-stone-600"
    >
        <LCDInfoCard />
    </div>
</div>
