<script lang="ts">
    import ContentLayout from "$lib/components/layouts/ContentLayout.svelte";
    import UrlDownload from "$lib/components/pages/uploads/UrlDownload.svelte";
    import FileUpload from "$lib/components/pages/uploads/FileUpload.svelte";
    import ITunesSearchResult from "$lib/components/music/detail/contexts/iTunesSearchResult.svelte";
    import ITunesSearchArea from "$lib/components/music/detail/contexts/iTunesSearchArea.svelte";
</script>

<ContentLayout>
    <div class="flex w-full h-full">
        <div class="flex flex-col h-full w-full items-center gap-2 py-5">
            <UrlDownload />
            <FileUpload />
            <ITunesSearchArea />
            <div class="h-full max-h-80 w-full overflow-auto">
                <ITunesSearchResult />
            </div>
        </div>
    </div>
</ContentLayout>
