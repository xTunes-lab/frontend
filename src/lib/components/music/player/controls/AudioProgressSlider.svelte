<script lang="ts">
  import Slider from "$lib/components/generals/Slider.svelte";
  import {
    audioCurrentTime,
    audioProgress,
    audioTotalSecond,
    audioTotalTime,
    currentPlayingSong,
  } from "$lib/stores/playbackControl";
  import { onSeeking } from "$lib/stores/player";
  import { fade } from "svelte/transition";
</script>

{#snippet progressBar()}
  <div id="progressBar" class="w-full items-center justify-center">
    <div class="flex w-full">
      <Slider
        value={$audioProgress}
        max={$audioTotalSecond}
        onInput={onSeeking}
      />
    </div>
  </div>
{/snippet}
{#if $currentPlayingSong && $audioTotalTime != "" && $audioCurrentTime != ""}
  <div
    class="flex flex-col h-full w-full px-1 pb-1"
  >
    <!-- time -->
    <div class="flex h-full w-full min-w-16 items-center justify-between">
      <div
        id="currentTime"
        class="select-none items-center justify-center text-[9px] text-gray-500 dark:text-white w-6 min-w-6"
      >
        {$audioCurrentTime}
      </div>
      <!-- bar -->
      <div class="flex w-full items-center justify-center px-1">
        {@render progressBar()}
      </div>
      <div
        id="endTime"
        class="select-none items-center justify-center text-[9px] text-gray-500 dark:text-white w-6 min-w-6"
      >
        {$audioTotalTime}
      </div>
    </div>
  </div>
{/if}
