<script lang="ts">
    import ItemTag from "./ItemTag.svelte";
    import Switcher from "./Switcher.svelte";
    let { name, isChecked = $bindable() } = $props();
</script>

<div class="flex w-full max-w-sm p-2">
    <ItemTag>{name}</ItemTag>
    <div class="flex items-center justify-center">
        <Switcher {name} bind:isChecked />
    </div>
</div>
