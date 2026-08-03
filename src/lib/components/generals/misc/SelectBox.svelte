<script lang="ts">
    import { selectBoxStyle, textStyle } from "$lib/global";
    import { onMount } from "svelte";

    let {
        options,
        selected = $bindable(),
        onInput,
    }: { options: Array<string>; selected: string; onInput?: any } = $props();
    onMount(() => {
        if (!options.includes(selected)) {
            throw EvalError("The selected value is not in valid values.");
        }
    });
</script>

<select
    class="flex w-full {selectBoxStyle}"
    bind:value={selected}
    oninput={() => onInput?.()}
>
    {#each options as option}
        <option value={option}>{option}</option>
    {/each}
</select>
