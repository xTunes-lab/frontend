<script lang="ts">
    import { backgroundStyle, borderStyle, buttonStyle } from "$lib/global";
    import { fly } from "svelte/transition";
    import { Trash2Fill } from "svelte-bootstrap-icons";
    import PlaylistItem from "./PlaylistItem.svelte";
    import { onMount } from "svelte";
    import { mdWidth } from "$lib/global";
    import { isPlaylistOpen } from "$lib/stores/ui";
    import { currentPlayList } from "$lib/stores/playlists";
    import { t } from "$locale/i18n";
    let defaultX = $state(mdWidth);
    function updateFlyParam() {
        if (window.innerWidth > mdWidth) {
            defaultX = 400;
        } else {
            defaultX = window.innerWidth;
        }
    }

    onMount(() => {
        // $playLists = getPlaylist();
        updateFlyParam();
        window.addEventListener("resize", updateFlyParam);
    });
</script>

{#if $isPlaylistOpen}
    <div>
        <div
            class="fixed flex right-0 top-16 bottom-16 sm:bottom-0 z-20 h-auto w-full sm:w-82 {backgroundStyle} border-l {borderStyle} overflow-y-auto shadow overscroll-none"
            transition:fly={{ x: defaultX, opacity: 1 }}
        >
            {@render title()}
            {@render songs()}
        </div>
    </div>
{/if}
{#snippet title()}
    <div class="flex fixed h-12 w-full p-2 px-4 justify-between">
        <div
            class="text-gray-500 dark:text-white text-2xl select-none truncate"
        >
            {$t("playlist.title")}
        </div>
        <div class="flex w-8 items-center justify-center">
            <button
                class={buttonStyle}
                onclick={() => {
                    $currentPlayList = [];
                }}
                ><Trash2Fill class="size-5" />
            </button>
        </div>
    </div>
{/snippet}
{#snippet songs()}
    <div
        class="flex flex-col pt-12 p-5 w-full divide-y divide-gray-500/50 dark:divide-white/50"
    >
        {#each $currentPlayList as song, index}
            <PlaylistItem {song} songIndex={index} />
        {/each}
    </div>
{/snippet}
