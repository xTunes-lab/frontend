<script lang="ts">
    let { children } = $props();
</script>

<div
    aria-label="page content"
    class="pl-0 sm:pl-64 pb-16 sm:pb-0 pt-16 z-0 w-full h-full min-h-screen"
    onscroll={() => {
        console.log(window.scrollY);
    }}
>
    {@render children()}
</div>
