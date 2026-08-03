<script lang="ts">
    import { iconStyle } from "$lib/global";
    import {
        VolumeDownFill,
        VolumeOffFill,
        VolumeUpFill,
        VolumeMuteFill,
    } from "svelte-bootstrap-icons";
    import Slider from "$lib/components/generals/Slider.svelte";
    import { onVolumnChange } from "$lib/stores/player";
    import { config } from "$lib/stores/configs";
    let volumnHistory: number;
</script>

<div class="flex w-full h-10 justify-center items-center">
    <button
        class="flex w-6"
        onclick={() => {
            if ($config.volumn != 0) {
                volumnHistory = $config.volumn;
                $config.volumn = 0;
                onVolumnChange($config.volumn);
            } else {
                $config.volumn = volumnHistory;
                onVolumnChange($config.volumn);
            }
        }}
    >
        {#if $config.volumn == 0}
            <VolumeOffFill width="16" height="16" class={iconStyle} />
        {:else if $config.volumn > 0 && $config.volumn < 70}
            <VolumeDownFill width="16" height="16" class={iconStyle} />
        {:else}
            <VolumeUpFill width="16" height="16" class={iconStyle} />
        {/if}
    </button>
    <div class="flex justify-center items-center w-full">
        <Slider
            bind:value={$config.volumn}
            max={100}
            onInput={(e: Event) => {
                const input = e.target as HTMLInputElement;
                const volume = parseFloat(input.value);
                onVolumnChange(volume);
            }}
        />
    </div>
</div>
