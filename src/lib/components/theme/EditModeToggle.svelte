<script lang="ts">
    import { scale } from "svelte/transition";
    import {
        Highlights,
        Shadows,
    } from "svelte-bootstrap-icons";
    import { buttonStyle, scaleParams } from "$lib/global";
    import { isEditMode, toggleEditMode } from "$lib/stores/ui";
</script>

<button
    onclick={() => toggleEditMode()}
    role="switch"
    aria-label="Edit Mode Switch"
    aria-checked={$isEditMode === true}
    title="Edit mode switch"
    class="rounded relative inline-flex h-10 w-10 items-center justify-center px-2 focus-visible:ring-2 focus-visible:ring-offset-2"
>
    {#if $isEditMode === true}
        <div
            class="absolute inline-flex h-full w-full items-center justify-center"
            transition:scale={scaleParams}
        >
            <Highlights class="{buttonStyle} size-5" aria-label="Moon" />
        </div>
    {:else}
        <div
            class="absolute inline-flex h-full w-full items-center justify-center"
            transition:scale={scaleParams}
        >
            <Shadows class="{buttonStyle} size-5" aria-label="Sun" />
        </div>
    {/if}
</button>
