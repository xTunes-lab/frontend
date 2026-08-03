<script>
    import { buttonStyle } from "$lib/global";
    import { togglePlaylist } from "$lib/stores/ui";
    import { MusicNoteList } from "svelte-bootstrap-icons";
</script>

<button onclick={() => togglePlaylist()}>
    <MusicNoteList class="{buttonStyle} size-4" />
</button>
