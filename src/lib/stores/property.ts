import { AlbumInfoLite, ArtistInfoLite, GenreInfoLite, PlaylistInfoLite, SongInfo, type IMusicOperation } from "$lib/entities";
import { get, writable } from "svelte/store";
import { selectedObject } from "./music";
import { isPropertyModalOpen } from "./ui";
import { updateAudioProperty } from "$lib/api";
import { allSong, homePageData } from "./pages";
import * as songDB from "$lib/stores/songDB";

export const infoEditing = writable<SongInfo | SongCollectionInfo | undefined>();
export const infoOrigin = writable<SongInfo | SongCollectionInfo | undefined>();

/**
 * ! When doing with property or album detail, use this class to wrap data
 * ! Otherwise use original artistinfo genreinfo albuminfo
 */
export class SongCollectionInfo {

    album_artist?: string;
    album_name?: string;
    cover?: string;
    genre?: string;
    release_year?: Date;
    track_count?: number;
    disk_count?: number;
    compliation?: boolean;
    rating?: number;
    song_ids!: number[];
    source_info!: AlbumInfoLite | ArtistInfoLite | GenreInfoLite | PlaylistInfoLite
    public get song_infos(): SongInfo[] {
        let songs = get(allSong);
        if (songs.size === 0) {
            throw new Error("song info not loaded");
        }
        let infos = this.song_ids.map(id => songs.get(id)).filter((v): v is SongInfo => !!v);
        return infos;
    }
    public get covers(): string[] {
        return []
    }
    static fromAlbumInfo(info: AlbumInfoLite) {
        const aInfo = new SongCollectionInfo()
        aInfo.source_info = info
        aInfo.album_artist = info.artist;
        aInfo.album_name = info.name;
        aInfo.genre = info.genre;
        aInfo.cover = info.cover;
        aInfo.release_year = info.release_year;
        aInfo.track_count = info.trackCount;
        aInfo.disk_count = info.diskCount;
        aInfo.compliation = info.compliation;
        aInfo.rating = info.rating;
        aInfo.song_ids = info.song_ids;
        return aInfo;
    }
    static fromArtistsInfo(info: ArtistInfoLite): SongCollectionInfo {
        const aInfo = new SongCollectionInfo()
        aInfo.source_info = info;
        aInfo.album_artist = info.artist;
        aInfo.song_ids = info.albums.flatMap(album => album.song_ids);
        aInfo.cover = aInfo.song_infos?.[0]?.covers?.[0]
        return aInfo;
    }
    static fromGenresInfo(info: GenreInfoLite): SongCollectionInfo {
        const aInfo = new SongCollectionInfo()
        aInfo.source_info = info;
        aInfo.genre = info.genre;
        aInfo.song_ids = info.artists.flatMap(artist => artist.albums.flatMap(album => album.song_ids));
        return aInfo;
    }
    static fromPlaylistInfo(info: PlaylistInfoLite): SongCollectionInfo {
        const aInfo = new SongCollectionInfo()
        aInfo.source_info = info;
        aInfo.song_ids = info.song_ids;
        return aInfo;
    }
}

isPropertyModalOpen.subscribe((value) => {
    if (value) {
        const info = get(selectedObject);
        if (info instanceof SongInfo) {
            infoEditing.set(copyEditing(info));
            infoOrigin.set(copyEditing(info));
        }
        else {
            infoEditing.set(copyEditing(info));
            infoOrigin.set(copyEditing(info));
        }
    }
    else {
        infoEditing.set(undefined);
        infoOrigin.set(undefined);
    }
})

export function copyEditing(info: SongInfo | SongCollectionInfo): SongInfo | SongCollectionInfo {
    let infoCopy: SongInfo | SongCollectionInfo;
    if (info instanceof SongInfo) {
        infoCopy = Object.assign(new SongInfo(), info);
    }
    else {
        infoCopy = Object.assign(new SongCollectionInfo(), info);
    }
    return infoCopy;
}

export async function saveSongProperty() {
    const newInfo = get(infoEditing) as SongInfo;
    if (JSON.stringify(get(infoOrigin)) === JSON.stringify(get(infoEditing)))
        return;
    await updateAudioProperty(newInfo)
}

export function saveAlbumProperty() {
    if (JSON.stringify(get(infoOrigin)) === JSON.stringify(get(infoEditing)))
        return;
    const newInfo = get(infoEditing) as SongCollectionInfo;
    const selectedInfo = get(selectedObject) as SongCollectionInfo;
    selectedInfo.song_infos.forEach(info => {
        const oldSongInfo = Object.assign(new SongInfo(), info);
        const newSongInfo = Object.assign(oldSongInfo, newInfo);
        updateAudioProperty(newSongInfo).then(() => {
            info = newSongInfo;
        })
    });
}


export function updatePlayCount(info: SongInfo) {
    info.play_count++;
    info.last_played_date = new Date().toISOString();
    updateAudioProperty(info);
}
