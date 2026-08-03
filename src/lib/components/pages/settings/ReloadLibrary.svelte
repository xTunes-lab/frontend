<script>
    import ItemTag from "$lib/components/generals/misc/ItemTag.svelte";
    import { buttonStyle } from "$lib/global";
    import { reloadLibrary, loading, process } from "$lib/stores/setups";
    import { ArrowClockwise } from "svelte-bootstrap-icons";
    import SpinIcon from "../setups/SpinIcon.svelte";
    import { t } from "$locale/i18n";
</script>

<div class="flex w-full max-w-sm p-2">
    <ItemTag>{$t("settings.reloadlibrary")}</ItemTag>
    <div class="flex items-center justify-center text-center">
        <button
            class={buttonStyle}
            aria-label="reload library"
            onclick={async () => reloadLibrary()}
        >
            {#if $loading}
                <div class="flex flex-row gap-2 items-center truncate text-sm">
                    <SpinIcon size="size-4" />
                    {$process}
                </div>
            {:else}
                <ArrowClockwise class="size-5" />
            {/if}
        </button>
    </div>
</div>
