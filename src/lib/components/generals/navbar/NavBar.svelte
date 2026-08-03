<script>
  import VolumeControl from "$lib/components/music/player/controls/VolumeControl.svelte";
  import PlaybackControl from "$lib/components/music/player/PlaybackControl.svelte";
  import PlaybackLCD from "$lib/components/music/player/PlaybackLCD.svelte";

  import {
    backgroundStyle,
    borderStyle,
    transitionColor,
  } from "$lib/global";
  import PlayListButton from "../playlist/PlayListButton.svelte";
  import SideMenuNavbarButton from "../sidemenu/SideMenuNavbarButton.svelte";
</script>

<div
  id="navbar"
  class="{backgroundStyle} {borderStyle} {transitionColor} fixed w-full border-b px-4 py-3 top-0 z-10 h-16"
>
  <div class="flex w-full justify-center">
    <div class="flex min-w-10 justify-center sm:hidden">
      <SideMenuNavbarButton />
    </div>
    <div
      class="hidden w-1/3 items-center justify-center sm:flex sm:justify-end"
    >
      <div class="w-1/2 max-w-48 min-w-40 justify-center">
        <PlaybackControl />
      </div>
    </div>

    <div
      id="music-player"
      class="flex w-full max-w-xl min-w-40 items-center justify-center sm:mx-4"
    >
      <PlaybackLCD />
    </div>
    <div
      id="functional area"
      class="flex justify-center md:w-1/3 md:justify-start"
    >
      <div class="mx-4 hidden w-1/2 max-w-32 md:flex">
        <VolumeControl />
      </div>
      <div class="flex min-w-10 justify-center">
        <PlayListButton />
      </div>
    </div>
  </div>
</div>
