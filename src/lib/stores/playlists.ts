import type { PlaylistInfoLite, SongInfo } from "$lib/entities";
import { get, writable } from "svelte/store";
import { currentPlayingSong } from "./playbackControl";
import { config } from "./configs";
import { page } from "$app/state";
import {
    selectedPlaylist,
} from "$lib/stores/pages";
export const currentPlayList = writable<SongInfo[]>([]);
export const playingIndexes: number[] = [];
export const playLists = writable<PlaylistInfoLite[]>([])
export const playlistHistory = writable<SongInfo[]>([]);


export function getCurrentPlayList(): SongInfo[] {
    const conf = get(config);
    if (conf.shuffleMode) {
        throw new Error("Not implemented yet");
    }
    return get(currentPlayList);
}

export function removeFromCurrent(index: number) {
    currentPlayList.update((value) => {
        value.splice(index, 1);
        return value;
    })
}

export function cleanCurrent() {
    currentPlayList.set([]);
}
export function getSongByIndex(index: number): SongInfo | undefined {
    const song = get(currentPlayList)[index];
    return song;
}


function popFromHistory(): SongInfo | undefined {
    let song;
    playlistHistory.update((value) => {
        song = value.pop();
        return value;
    })
    return song;
}
export function addToHistory(song: SongInfo) {
    playlistHistory.update((value) => {
        value.push(song)
        return value;
    })
}
export function addToCurrent(song: SongInfo) {
    currentPlayList.update((value) => {
        value.push(song)
        return value;
    })
}
export function isEmpty() {
    return get(currentPlayList).length == 0
}
/**
 * Add the song into the start of the current play list
 * @param song 
 */
export function unshiftToCurrent(song: SongInfo) {
    currentPlayList.update((value) => {
        value.unshift(song)
        return value;
    })
}

/**
 * Move the giving index item to the start of the play list 
 * @param index 
 */
export function moveToStartCurrent(index: number) {
    currentPlayList.update(
        (value) => {
            const song = value.splice(index, 1)
            if (song.length == 1)
                unshiftToCurrent(song[0])
            return value;
        }
    )
}

export function nextSong(): SongInfo | undefined {
    // remove the first song in the array
    const oldSong = get(currentPlayingSong)
    if (oldSong)
        addToHistory(oldSong);
    // get the first song in the current array
    const song = getSongByIndex(0);
    removeFromCurrent(0);
    return song;
}

export function previousSong(): SongInfo | undefined {
    // Pop last played song from history
    const prevSong = popFromHistory()
    if (!prevSong) return;
    unshiftToCurrent(prevSong)
    return prevSong;
}

export function shuffle(): number[] {
    const songs = get(currentPlayList).length;
    const indices = Array.from({ length: songs }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices;
}


export function isAtPlaylistPage(): boolean {
    if (page.url.pathname == "/playlists")
        return true;
    return false;
}


export function deleteFromPlaylist(info: SongInfo) {
    get(selectedPlaylist).id
    
}