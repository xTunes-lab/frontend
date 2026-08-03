<script>
    import LibraryPath from "$lib/components/pages/settings/LibraryPath.svelte";
    import BackendAddress from "$lib/components/pages/settings/BackendAddress.svelte";
    import Language from "$lib/components/pages/settings/Language.svelte";
    import { onMount } from "svelte";
    import { config, loadSetting } from "$lib/stores/configs";
    import ImportFromiTunes from "./ImportFromiTunes.svelte";
    import LibraryOptions from "./LibraryOptions.svelte";
    import { initLibrary, isImportFromItunes } from "$lib/stores/setups";
    import { t } from "$locale/i18n";
    import SpinButton from "$lib/components/generals/misc/SpinButton.svelte";
    import { iconStyle } from "$lib/global";
    onMount(() => {
        loadSetting();
    });
</script>

<div
    class="w-full h-full flex flex-col overflow-hidden items-center justify-center"
>
    <div class="flex overflow-y-auto">
        <div class="p-5 flex-col">
            <div class="grid grid-cols-1 justify-center items-center gap-4">
                <Language />
                <BackendAddress />
                <LibraryPath />
                <LibraryOptions bind:option={$isImportFromItunes} />
                {#if !$isImportFromItunes}
                    <ImportFromiTunes />
                {/if}
                <div class="flex justify-center items-center my-2">
                    <div class="flex justify-center items-center">
                        <SpinButton
                            width={20}
                            callBack={() => {
                                initLibrary();
                            }}
                        >
                            <div class={iconStyle}>
                                {$t("setups.initialize")}
                            </div>
                        </SpinButton>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
