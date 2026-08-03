<script lang="ts">
  import {
    ArrowRepeat,
    CheckLg,
    Code,
    InfoLg,
    JournalPlus,
    PlayFill,
    PlusCircleDotted,
    PlusLg,
    ShareFill,
    Trash2,
  } from "svelte-bootstrap-icons";
  import ContextItem from "./ContextItem.svelte";
  import {
    getContextMenuDimension,
    onPageClick,
    onPageScroll,
    pos,
    contextObject,
    showMenu,
    onWindowContextmenu,
  } from "$lib/stores/contextMenu";
  import { isEditMode, isPlaylistSelectOpen } from "$lib/stores/ui";
  import { t } from "$locale/i18n";
  import {
    AlbumInfoLite,
    ArtistInfoLite,
    GenreInfoLite,
    SongInfo,
  } from "$lib/entities";
  import { isAtPlaylistPage } from "$lib/stores/playlists";
</script>

{#if $showMenu}
  <div
    class="fixed z-40"
    use:getContextMenuDimension
    style="top:{pos.y}px; left:{pos.x}px"
  >
    <div
      class="w-40 origin-top-right rounded-md outline-1 outline-gray-300/50 dark:outline-stone-500 bg-white/70 dark:bg-stone-700/70 backdrop-blur-lg overflow-hidden shadow-lg"
    >
      <div class="overflow-hidden shadow-sm">
        {#if $isEditMode}
          {@render editMode()}
        {:else}
          {@render normalMode()}
        {/if}
      </div>
    </div>
  </div>
{/if}

{#snippet normalMode()}
  <!-- {#if contextObject instanceof SongInfo || contextObject instanceof AlbumInfoLite || contextObject instanceof GenreInfoLite || contextObject instanceof ArtistInfoLite}
    play property addtoplaylist
  {/if}

  {#if contextObject instanceof AlbumInfoLite}
    album detail
  {/if} -->

  {#if contextObject?.play}
    <ContextItem onClickCallback={() => contextObject?.play()}>
      <PlayFill class="size-5" />
      <div class="pl-2">{$t("contextmenu.play")}</div>
    </ContextItem>
  {/if}
  <!-- {#if contextObject?.detail}
    <ContextItem onClickCallback={() => contextObject?.detail()}>
      <InfoLg class="size-5" />
      <div class="pl-2">{$t("contextmenu.detail")}</div>
    </ContextItem>
  {/if} -->
  {#if contextObject?.addToPlaylist}
    <ContextItem onClickCallback={() => contextObject?.addToPlaylist()}>
      <PlusLg class="size-5" />
      <div class="pl-2">{$t("contextmenu.addtocurrentplay")}</div>
    </ContextItem>
  {/if}
  {#if !isAtPlaylistPage()}
    <ContextItem
      onClickCallback={() => {
        isPlaylistSelectOpen.set(true);
      }}
    >
      <PlusCircleDotted class="size-5" />
      <div class="pl-2">{$t("contextmenu.addtoplaylist")}</div>
    </ContextItem>
  {/if}
{/snippet}

{#snippet editMode()}
  {#if contextObject?.select}
    <ContextItem onClickCallback={() => contextObject?.select()}>
      <CheckLg class="size-5" />
      <div class="pl-2">{$t("contextmenu.select")}</div>
    </ContextItem>
  {/if}
  {#if contextObject?.property}
    <ContextItem onClickCallback={() => contextObject?.property()}>
      <Code class="size-5" />
      <div class="pl-2">{$t("contextmenu.property")}</div>
    </ContextItem>
  {/if}
  {#if contextObject?.share}
    <ContextItem onClickCallback={() => contextObject?.share()}>
      <div class="flex items-center justify-center size-5">
        <ShareFill class="size-4" />
      </div>
      <div class="pl-2">{$t("contextmenu.share")}</div>
    </ContextItem>
  {/if}

  {#if isAtPlaylistPage()}
    <ContextItem
      onClickCallback={() => {
        throw new Error("not implemented");
      }}
    >
      <div class="flex items-center justify-center size-5">
        <Trash2 class="size-4 text-red-400" />
      </div>
      <div class="pl-2 text-red-400">Delete</div>
    </ContextItem>
  {/if}
{/snippet}

<svelte:window
  on:contextmenu={(e) => onWindowContextmenu(e)}
  on:click={(e) => onPageClick(e)}
  on:scroll={() => onPageScroll()}
/>
