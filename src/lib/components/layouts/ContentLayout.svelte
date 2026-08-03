<script lang="ts">
    let { children } = $props();
</script>

<div class="h-screen w-screen sm:pl-64 pt-16 pb-16 sm:pb-0 overflow-hidden">
    <div class="flex w-full h-full">
        {@render children()}
    </div>
</div>
