<script>
    import ContentLayout from "$lib/components/layouts/ContentLayout.svelte";
    import LibraryPath from "$lib/components/pages/settings/LibraryPath.svelte";
    import GainUnify from "$lib/components/pages/settings/GainUnify.svelte";
    import BackendAddress from "$lib/components/pages/settings/BackendAddress.svelte";
    import Language from "$lib/components/pages/settings/Language.svelte";
    import ReloadLibrary from "$lib/components/pages/settings/ReloadLibrary.svelte";
    import OrgnizeAudio from "$lib/components/pages/settings/OrgnizeAudio.svelte";
    import OfflineAudio from "$lib/components/pages/settings/OfflineAudio.svelte";
</script>

<ContentLayout>
    <div class="w-full h-full flex flex-col overflow-hidden">
        <div class="flex-1 overflow-y-auto">
            <div class="flex flex-col p-5 justify-center items-center">
                <div
                    class="grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-4"
                >
                    <Language />
                    <BackendAddress />
                    <LibraryPath />
                    <GainUnify />
                    <!-- <OfflineAudio /> -->
                    <!-- <FileUpload /> -->
                    <ReloadLibrary />
                    <OrgnizeAudio />
                </div>
            </div>
        </div>
        <div class="shrink-0 h-6 sm:h-8 flex items-center justify-center">
            <a
                class="text-xs text-gray-600/30 dark:text-white/30"
                href="https://github.com/xiaojiuwo1993"
                target="_blank"
                rel="noopener noreferrer"
            >
                By xiaojiuwo with ❤️
            </a>
        </div>
    </div>
</ContentLayout>
