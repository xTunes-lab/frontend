<script>
  import {
    backgroundStyle,
    borderStyle,
    fadeParams,
    iconStyle,
    transitionColor,
  } from "$lib/global";
  import SideMenuItem from "./SideMenuItem.svelte";
  import {
    HouseFill,
    PeopleFill,
    MusicNote,
    Images,
    SignpostSplitFill,
    GearFill,
    Search,
    MusicNoteList,
    CloudArrowUpFill,
    WrenchAdjustableCircle,
  } from "svelte-bootstrap-icons";
  import { buttonStyle } from "$lib/global";
  import ThemeToggle from "$lib/components/theme/ThemeToggle.svelte";
  import { fade, fly } from "svelte/transition";
  import SideMenuSearch from "./SideMenuSearch.svelte";
  import { isEditMode, isSideMenuOpen, onWindowResize } from "$lib/stores/ui";
  import EditModeToggle from "$lib/components/theme/EditModeToggle.svelte";
  import { t } from "$locale/i18n";
  const commonParams = `fixed top-16 left-0 z-20 h-[calc(100vh-4rem)] ${backgroundStyle} border-r border-b ${borderStyle} overscroll-none overflow-y-auto ${transitionColor}`;
</script>

{#if $isSideMenuOpen}
  <aside
    id="side-menu"
    class="sm:block w-full {commonParams}"
    transition:fly={{ x: -window.innerWidth, opacity: 1 }}
  >
    {@render sideMenuContent()}
  </aside>
{:else}
  <aside id="side-menu" class="hidden sm:block w-64 {commonParams}">
    {@render sideMenuContent()}
  </aside>
{/if}

{#snippet sideMenuContent()}
  <div class="flex flex-col h-full p-4" aria-label="side-menu">
    <div aria-label="search box" class="flex w-full pt-4 h-auto">
      <SideMenuSearch text={$t("sidemenu.search")}>
        {#snippet icon()}
          <Search class="{iconStyle} size-5" />
        {/snippet}
      </SideMenuSearch>
    </div>

    {@render routingItems()}

    <div class="h-10 flex flex-row items-center justify-between">
      <ThemeToggle />
      <EditModeToggle />
    </div>
  </div>
{/snippet}

{#snippet routingItems()}
  <div
    aria-label="sidemenu route item"
    class="flex flex-col h-full w-full py-4 overflow-y-auto"
  >
    <SideMenuItem href="/" text={$t("sidemenu.home")}>
      <HouseFill class="{buttonStyle} size-5" />
    </SideMenuItem>

    <SideMenuItem href="/artists" text={$t("sidemenu.artists")}>
      <PeopleFill class="{buttonStyle} size-5" />
    </SideMenuItem>

    <SideMenuItem href="/albums" text={$t("sidemenu.albums")}>
      <Images class="{buttonStyle} size-5" />
    </SideMenuItem>

    <SideMenuItem href="/songs" text={$t("sidemenu.songs")}>
      <MusicNote class="{buttonStyle} size-5" />
    </SideMenuItem>

    <SideMenuItem href="/genres" text={$t("sidemenu.genres")}>
      <SignpostSplitFill class="{buttonStyle} size-5" />
    </SideMenuItem>
    <SideMenuItem href="/playlists" text={$t("sidemenu.playlists")}>
      <MusicNoteList class="{buttonStyle} size-5" />
    </SideMenuItem>
    <SideMenuItem href="/settings" text={$t("sidemenu.settings")}>
      <GearFill class="{buttonStyle} size-5" />
    </SideMenuItem>

    {#if $isEditMode}
      <div transition:fade={fadeParams}>
        <SideMenuItem href="/uploads" text={$t("sidemenu.uploads")}>
          <CloudArrowUpFill class="{buttonStyle} size-5" />
        </SideMenuItem>
        <SideMenuItem href="/setups" text={$t("sidemenu.setups")}>
          <WrenchAdjustableCircle class="{buttonStyle} size-5" />
        </SideMenuItem>
      </div>
    {/if}
  </div>
{/snippet}

<svelte:window on:resize={onWindowResize} />
