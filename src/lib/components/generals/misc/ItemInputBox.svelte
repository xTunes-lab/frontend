<script lang="ts">
    import { inputBoxStyle } from "$lib/global";

    let {
        value = $bindable(),
        placeHolder,
    }: { value: string; placeHolder?: string } = $props();
</script>

<div class="flex w-full">
    <input class={inputBoxStyle} bind:value placeholder={placeHolder} />
</div>
