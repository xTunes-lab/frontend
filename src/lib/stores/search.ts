import { AlbumInfoLite, ArtistInfoLite, GenreInfoLite, RecentAddedInfoLite, SongInfo, type PlaylistInfoLite } from "$lib/entities";
import { get, writable } from "svelte/store";
import { albumPageData, allSong, artistPageData, genresPageData, homePageData, playListsPageData } from "./pages";

export const keywords = writable<string>('');
let songData: Map<number, SongInfo>;
let homeData: RecentAddedInfoLite[];
let albumData: AlbumInfoLite[];
let artistData: ArtistInfoLite[];
let genreData: GenreInfoLite[];

export function setSongData(song: Map<number, SongInfo>) {
    songData = song;
}
export function setHomeData(home: RecentAddedInfoLite[]) {
    homeData = home;
}
export function setAlbumData(album: AlbumInfoLite[]) {
    albumData = album;
}
export function setArtistData(artist: ArtistInfoLite[]) {
    artistData = artist;
}
export function setGenreData(genre: GenreInfoLite[]) {
    genreData = genre;
}


export function searchSong(keywords: string) {
    if (keywords == '') {
        allSong.set(songData);
        return;
    }
    const copy = new Map(
        [...songData].map(([key, value]) => [
            key, SongInfo.fromJson(value)])
    );
    const result = new Map(
        [...copy].filter(([key, value]) => value.title?.toLowerCase().includes(keywords)
            || value.album_artist?.toLowerCase().includes(keywords)
            || value.album_name?.toLowerCase().includes(keywords)
            || value.genre?.toLowerCase().includes(keywords)
            || value.artists?.some((artist) => artist.toLowerCase().includes(keywords))));
    allSong.set(result);
}

export function searchRecent(keywords: string) {
    if (keywords == '') {
        homePageData.set(homeData);
        return;
    }
    const copy = homeData.map(value => RecentAddedInfoLite.fromJson(value));
    const result = copy.filter(item => {
        item.album_infos = item.album_infos.filter(album => {
            return album.name.toLocaleLowerCase().includes(keywords)
                || album.artist?.toLocaleLowerCase().includes(keywords);
        });
        return item.album_infos.length > 0;
    });
    homePageData.set(result)
}

export function searchAlbum(keywords: string) {
    if (keywords == '') {
        albumPageData.set(albumData);
        return;
    }
    const copy = albumData.map(value => AlbumInfoLite.fromJson(value));

    const result = copy.filter(album => {
        return album.name.toLocaleLowerCase().includes(keywords)
            || album.artist?.toLocaleLowerCase().includes(keywords);
    });
    albumPageData.set(result);
}

export function searchArtist(keywords: string) {
    if (keywords == '') {
        artistPageData.set(artistData);
        return;
    }
    const copy = artistData.map(artist => ArtistInfoLite.fromJson(artist));
    const filteredArtist = copy.filter(artist => {
        return artist.artist?.toLocaleLowerCase().includes(keywords);
    })
    artistPageData.set(filteredArtist);
}

export function searchGenre(keywords: string) {
    if (keywords == '') {
        genresPageData.set(genreData);
        return;
    }
    const copy = genreData.map(genre => GenreInfoLite.fromJson(genre));
    const filteredGenre = copy.filter(genre => {
        return genre.genre.toLocaleLowerCase().includes(keywords);
    });
    genresPageData.set(filteredGenre);
}

