//all data fetch is in this file

import { SongInfo, AlbumInfoLite, ArtistInfoLite, GenreInfoLite, PlaylistInfoLite, RecentAddedInfoLite, iTunesSearchSongResult, iTunesSearchAlbumResult } from "./entities";
// import { groupSongsByTimePeriod, songInfosMock, getAritstPageData as gapd, createSortedAlbumInfoData, sortSongInfoArray, sortByGenres } from "./mock";
import axios from "axios";
import { get } from "svelte/store";
import { albumPageData, allSong, artistPageData, genresPageData, homePageData, playListsPageData } from "./stores/pages";
import { config } from "./stores/configs";
import { NotificationType, OperationType } from "./stores/enums";
import { showError, showWarn } from "./stores/notification";
import * as songDB from "./stores/songDB";
import { infoEditing, type SongCollectionInfo } from "./stores/property";
import * as search from "./stores/search";
import { file, searchResult, selectedResult } from "./stores/uploads";
/**
 * get all song info from database
 */

export async function setLibraryPath() {
    const libPath = get(config).libraryPath
    try {
        const resp = await axios.post(get(config).changeLibraryUrl, { "path": libPath });
    }
    catch (e) {
        showError("Library path setting failed", String(e))
        throw e;
    }
}

export async function getAllSongIds(): Promise<number[]> {
    const backendAddress = get(config).allSongIdsUrl;
    const resp = await axios.get(backendAddress);
    let data = await resp.data;
    return data as number[];
}

export async function getSongInfoById(id: number): Promise<SongInfo> {
    const resp = await axios.post(get(config).metaInfoByIdUrl, { "id": id })
    const data = await resp.data as Partial<SongInfo>;
    const info = SongInfo.fromJson(data);
    return info
}

export async function getAllSongInfo(): Promise<Map<number, SongInfo>> {
    const resp = await axios.get(get(config).allSongInfosUrl)
    let data = await resp.data;
    const songMap = new Map<number, SongInfo>();
    Object.entries(data).forEach(([id, info]) => {
        const temp = SongInfo.fromJson(info as SongInfo)
        songMap.set(Number(id), temp);
    });
    return songMap;
}

export async function getAllSongInfoLite(): Promise<Map<number, SongInfo>> {
    // get the song info only contains id and modified date
    const resp = await axios.get(get(config).allSongInfoLiteUrl)
    let data = await resp.data;
    const songMap = new Map<number, SongInfo>();
    Object.entries(data).forEach(([id, info]) => {
        const temp = SongInfo.fromJson(info as SongInfo)
        songMap.set(Number(id), temp);
    });
    return songMap;
}

export async function getAllPlaylistsInfo(): Promise<PlaylistInfoLite[]> {
    const resp = await axios.get(get(config).allPlaylistsUrl)
    let data = await resp.data as PlaylistInfoLite[];
    const pData = data.map(info => PlaylistInfoLite.fromJson(info))
    return pData;
}

export async function getRecentAdded(): Promise<RecentAddedInfoLite[]> {
    const resp = await axios.get(get(config).recentAddUrl)
    const data = await resp.data as RecentAddedInfoLite[];
    const recent_infos = data.map(info => RecentAddedInfoLite.fromJson(info))
    return recent_infos
}

export async function getGenreInfo(): Promise<GenreInfoLite[]> {
    const resp = await axios.get(get(config).genreInfoUrl)
    const data = await resp.data as GenreInfoLite[];
    const g_infos = data.map(genre => GenreInfoLite.fromJson(genre));
    return g_infos;
}

export async function getAlbumInfo(): Promise<AlbumInfoLite[]> {
    const resp = await axios.get(get(config).idsByAlbumUrl)
    let data = await resp.data as AlbumInfoLite[];
    let al_infos = data.map(album => AlbumInfoLite.fromJson(album));
    return al_infos;
}

export async function getArtistInfo(): Promise<ArtistInfoLite[]> {
    const resp = await axios.get(get(config).idsByArtistUrl)
    let data = await resp.data as ArtistInfoLite[];
    let ar_infos = data.map(artist => ArtistInfoLite.fromJson(artist));
    return ar_infos;
}
export async function isAudioFileExist(song: SongInfo): Promise<boolean> {
    try {
        const resp = await axios.get(get(config).musicStreamUrl, { params: { file_relative_path: song.file_path }, headers: { Range: "bytes=0-0" } })
        if (resp.status != 200 && resp.status != 206)
            return false
        return true
    }
    catch (e) {
        return false;
    }
}


export async function updateAllSongInfo() {

    const liteInfos = await getAllSongInfoLite();
    const oldInfos = await songDB.getAllSongs();
    await Promise.all(
        [...liteInfos.entries()].map(async ([id, lite]) => {
            const old = oldInfos.get(id);
            if (!old || lite.date_modified !== old.date_modified) {
                const songInfo = await getSongInfoById(id);
                liteInfos.set(id, songInfo);
            } else {
                liteInfos.set(id, old);
            }
        })
    );
    allSong.set(liteInfos);
    songDB.setAllSong(Array.from(liteInfos.values()));
    search.setSongData(liteInfos);
}


export async function setHomePageData() {
    await updateAllSongInfo();
    const info = await getRecentAdded();
    homePageData.set(info);
    search.setHomeData(info);
}

export async function setAlbumPageData() {
    const info = await getAlbumInfo();
    albumPageData.set(info);
    search.setAlbumData(info);
}
export async function setArtistPageData() {
    const info = await getArtistInfo();
    artistPageData.set(info);
    search.setArtistData(info);
}
export async function setGenresPageData() {
    const info = await getGenreInfo();
    genresPageData.set(info);
    search.setGenreData(info);
}

export async function setPlaylists() {
    const info = await getAllPlaylistsInfo();
    playListsPageData.set(info);
}

/**
 * todo not implemented
 */
export async function downloadAudio(song: SongInfo): Promise<any> {
    const response = await axios.get(get(config).musicStreamUrl, {
        params: { file_relative_path: song.file_path },
        withCredentials: false,
        responseType: 'blob'
    });

    const data = response.data;
    return data;
}

export async function loadAudioToBlob(song: SongInfo): Promise<string> {
    const blob = await downloadAudio(song);
    const objectUrl = URL.createObjectURL(blob);
    return objectUrl;
}


export function playAudioStream(url: string): HTMLAudioElement {
    return new Audio(url);
}
export async function uploadForm(form: FormData, url: string, progressCallback?: CallableFunction): Promise<SongInfo> {
    try {
        const resp = await axios.post(url, form, {
            headers: { "Content-Type": "multipart/form-data" },
            onUploadProgress: (progressEvent) => {
                const { loaded, total } = progressEvent;
                if (total) progressCallback?.(Math.round((loaded / total) * 100));
            },
        });
        const info = await resp.data;
        return info
    }
    catch (ex) {
        showError("Upload Failed", String(ex));
        throw ex;
    }
}
export async function getAudioMetaInfo(file: File, progressCallback?: CallableFunction): Promise<SongInfo> {
    const form = new FormData();
    form.append("file", file, file.name);
    const result = await uploadForm(form, get(config).getAudioMetaInfo, progressCallback)
    const info = SongInfo.fromJson(result)
    return info;
}

export async function uploadiTunesXml(file: File) {
    const form = new FormData();
    form.append("file", file, file.name);
    await uploadForm(form, get(config).importFromiTunesUrl);
}

export async function uploadFileWithInfo(progressCallback?: CallableFunction) {
    const fileData = get(file);
    const resultData = get(selectedResult);
    if (!fileData) {
        showWarn("Please select file", "");
        return;
    }
    if (!resultData) {
        showWarn("Please select search result", "");
        return;
    }
    const form = new FormData();
    form.append("file", fileData, fileData.name);
    form.append("info", JSON.stringify(resultData));
    await uploadForm(form, get(config).uploadAudio, progressCallback)
    file.set(undefined);
    searchResult.set(undefined);
}

export async function searchAlbum(name: string, artist: string) {
    try {
        const resp = await axios.post(get(config).searchAlbumUrl, { "name": name, "artist": artist });
        const result = iTunesSearchAlbumResult.fromJson(resp.data);
        return result;
    }
    catch (e) {
        showError("Search album failed", String(e))
        throw e;
    }
}
export async function searchSong(name: string, artist: string): Promise<iTunesSearchSongResult[]> {
    try {
        const resp = await axios.post(get(config).searchSongUrl, { "name": name, "artist": artist });
        const result: iTunesSearchSongResult[] = resp.data.map((info: Partial<iTunesSearchSongResult>) => iTunesSearchSongResult.fromJson(info));
        return result;
    }
    catch (e) {
        showError("Search song failed", String(e))
        throw e;
    }
}
export async function updateAudioProperty(info: SongInfo) {
    try {
        const resp = await axios.post(get(config).updateMetaInfoUrl,
            Object.fromEntries(Object.entries(info)),
            {
                validateStatus: (status) => status === 200
            });
        if (resp.status != 200) { throw Error("Update meta failed.") }
    }
    catch (e) {
        showError("Update meta info failed", String(e))
        throw e;
    }
}

async function syncAudioProperty(info: SongInfo) {
    try {
        const resp = await axios.post(get(config).syncSingleSongUrl, { id: info.id })
        if (resp.status != 200) { throw Error("Sync audio failed.") }
    }
    catch (e) {
        showError("Sync meta info failed", String(e))
        throw e;
    }
}

async function syncAudiosProperty(info: SongCollectionInfo) {
    info.song_infos.forEach(async (info) => {
        await syncAudioProperty(info)
    })
}

export async function syncLibrary() {
    const infos = Array.from(get(allSong).values());
    await Promise.all(infos.map((info) => syncAudioProperty(info)));
}

export async function syncProperty() {
    const info = get(infoEditing);
    if (!info)
        return;
    if (info instanceof SongInfo) {
        await syncAudioProperty(info);
    }
    else {
        await syncAudiosProperty(info);
    }
}

async function deleteSongRemote(info: SongInfo) {
    try {
        const resp = await axios.post(get(config).deleteSongUrl, { id: info.id }, {
            validateStatus: (status) => status === 200
        })
    }
    catch (e) {
        showError("Delete song failed", String(e))
        throw e;
    }
}
async function deleteSongsRemote(info: SongCollectionInfo) {
    info.song_infos.forEach(async (info) => {
        await deleteSongRemote(info)
    })
}
export async function deleteSong() {
    const info = get(infoEditing);
    if (!info)
        return;
    if (info instanceof SongInfo) {
        await deleteSongRemote(info);
    }
    else {
        await deleteSongsRemote(info);
    }
}

export async function deleteSongFromPlaylist(info: SongInfo, playlist: PlaylistInfoLite) {

}
let ws: WebSocket;

export class NotificationMessage {
    type!: NotificationType
    operation!: OperationType
    data?: SongInfo
    static fromJson(message: Partial<NotificationMessage>): NotificationMessage {
        const result = Object.assign(new NotificationMessage(), message);
        if (message.data)
            result.data = SongInfo.fromJson(message.data);
        return result;
    }
}

export function initNotificationWebsocket() {
    if (ws)
        ws.close();

    ws = new WebSocket(get(config).notificationUrl);

    ws.onmessage = (e) => {
        try {
            const message = NotificationMessage.fromJson(JSON.parse(e.data))
            switch (message.type) {
                case NotificationType.MusicUpdate:
                    setHomePageData();
                    setAlbumPageData();
                    setArtistPageData();
                    setGenresPageData();
                case NotificationType.PlaylistUpdate:
                    setPlaylists();
                    break;
                default:
                    console.warn("unknown update type")
                    break;
            }
        } catch {
            console.error('songinfo parse error', e);
        }
    };

    ws.onerror = (e) => {
        console.error('WebSocket error', e);
    }

    ws.onclose = (e) => {
        console.log('WebSocket closed', e.code, e.reason);
    }
}
