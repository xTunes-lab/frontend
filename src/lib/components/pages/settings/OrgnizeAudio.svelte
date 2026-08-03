<script>
    import ItemTag from "$lib/components/generals/misc/ItemTag.svelte";
    import { buttonStyle } from "$lib/global";
    import { Magic } from "svelte-bootstrap-icons";
    import SpinIcon from "../setups/SpinIcon.svelte";
    import { t } from "$locale/i18n";
    import { syncLibrary } from "$lib/api";
    let orgnizing = $state(false);
</script>

<div class="flex w-full max-w-sm p-2">
    <ItemTag>{$t("settings.unifyaudiofile")}</ItemTag>
    <div class="flex items-center justify-center text-center">
        <button
            class={buttonStyle}
            aria-label="Orgnize audio"
            onclick={async () => {
                orgnizing = true;
                // await syncLibrary();
            }}
        >
            {#if orgnizing}
                <div class="flex flex-row gap-2 items-center truncate text-sm">
                    <SpinIcon size="size-4" />
                </div>
            {:else}
                <Magic class="size-5" />
            {/if}
        </button>
    </div>
</div>
