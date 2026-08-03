<script lang="ts">
    import { buttonStyle } from "$lib/global";
    import { MusicNoteBeamed } from "svelte-bootstrap-icons";
    let isHovered = $state(false);

    function handleMouseEnter() {
        isHovered = true;
    }

    function handleMouseLeave() {
        isHovered = false;
    }
</script>

<button class="cursor-pointer dark:bg-stone-700">
    <MusicNoteBeamed width="16" height="16" class={buttonStyle} />
</button>
