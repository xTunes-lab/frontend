<script lang="ts">
    import { borderStyle, buttonStyle } from "$lib/global";
    import { Search } from "svelte-bootstrap-icons";
    let { searchContent = $bindable() } = $props();
</script>

<button class="flex items-center justify-center">
    <Search class="{buttonStyle} size-4" aria-label="Search" />
</button>
