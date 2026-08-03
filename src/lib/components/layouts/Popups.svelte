<script>
    import ContextMenu from "$lib/components/generals/content_menu/ContextMenu.svelte";
    import Playlist from "$lib/components/generals/playlist/Playlist.svelte";
    import CurrentPlayingDetail from "$lib/components/music/player/CurrentPlayingDetail.svelte";
    import Notification from "$lib/components/generals/notification/Notification.svelte";
    import Property from "$lib/components/music/detail/Property.svelte";
    import AlbumDetail from "$lib/components/music/album/AlbumDetail.svelte";
    import ConfirmBox from "$lib/components/generals/modal/ConfirmBox.svelte";
    import AddToPlaylists from "$lib/components/generals/playlist/AddToPlaylists.svelte";
</script>

<!-- 1. current playing info modal -->
<CurrentPlayingDetail />
<Property />
<AlbumDetail />
<!-- 2. sidebar menu -->
<!-- 3. album info -->
<!-- 4. playlist -->
<Playlist />

<ContextMenu />
<!-- 5. notification -->
<Notification />
<!-- 6. confirm box -->
<ConfirmBox />

<!-- 7. playlist select box -->
<AddToPlaylists />
