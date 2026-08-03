<script lang="ts">
    let {
        name,
        value = $bindable(),
    } = $props();
    import ItemTag from "./ItemTag.svelte";
    import ItemInputBox from "./ItemInputBox.svelte";
</script>

<div class="flex w-full max-w-sm p-2">
    <ItemTag>{name}</ItemTag>
    <ItemInputBox bind:value/>
</div>
