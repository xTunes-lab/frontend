<script lang="ts">
    import ItemInputProperty from "../misc/ItemInputProperty.svelte";

    let { name, value = $bindable(), type } = $props();
</script>

<div class="flex w-full max-w-sm">
    <ItemInputProperty {name} bind:value {type} />
</div>
