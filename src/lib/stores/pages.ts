import { PlaylistInfoLite, type AlbumInfoLite, type ArtistInfoLite, type GenreInfoLite, type RecentAddedInfoLite, type SongInfo } from "$lib/entities";
import { get, writable } from "svelte/store";

export const allSong = writable<Map<number, SongInfo>>(new Map<number, SongInfo>());
export const homePageData = writable<RecentAddedInfoLite[]>([]);
export const albumPageData = writable<AlbumInfoLite[]>([]);
export const artistPageData = writable<ArtistInfoLite[]>([]);
export const genresPageData = writable<GenreInfoLite[]>([]);
export const playListsPageData = writable<PlaylistInfoLite[]>([]);

export const selectedArtist = writable<ArtistInfoLite>();
export const selectedGenres = writable<GenreInfoLite>();
// export const selectedAlbumInfo = writable<AlbumInfoLite>();
export const selectedPlaylist = writable<PlaylistInfoLite>();
