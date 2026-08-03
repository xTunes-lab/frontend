<script>
    import TitleSortButton from "$lib/components/sorting/TitleSortButton.svelte";
    import { backgroundStyle } from "$lib/global";
</script>

<div class="flex sticky top-16 h-8 w-full items-center justify-evenly {backgroundStyle}">
    <TitleSortButton>Name</TitleSortButton>
    <TitleSortButton>Album</TitleSortButton>
    <TitleSortButton>Artist</TitleSortButton>
    <TitleSortButton>Time</TitleSortButton>
    <TitleSortButton>Release year</TitleSortButton>
    <TitleSortButton>Added year</TitleSortButton>
    <TitleSortButton>Genres</TitleSortButton>
    <TitleSortButton>Rating</TitleSortButton>
    <TitleSortButton>Track</TitleSortButton>
    <TitleSortButton>Plays</TitleSortButton>


</div>
