import { audioPlayer, pauseAudio, replayAudio, resumeAudio, stopAudio } from "./player";
import { addToHistory, getSongByIndex, isEmpty, nextSong as nextSongP, previousSong as previousSongP, removeFromCurrent } from "./playlists";
import { playNewAudio } from "./player";
import { Time, type SongInfo } from "$lib/entities";
import { config } from "./configs";
import { RepeatMode } from "./enums";
import { get, writable } from "svelte/store";
import { updatePlayCount } from "./property";
import { showError, showWarn } from "./notification";
export const audioStep = writable(0.1);
export const audioProgress = writable(0);
export const audioTotalTime = writable("");
export const audioCurrentTime = writable("");
export const audioTotalSecond = writable(0);
export const currentPlayingSong = writable<SongInfo | undefined>(undefined);
export const isPlaying = writable<boolean>(false);
export const shuffleMode = writable(false);



function resetPlayParams() {
    audioProgress.set(0);
    audioTotalTime.set("")
    audioCurrentTime.set("")
}
export function playOrPause() {
    if (get(isPlaying)) {
        pause();
    }
    else {
        resume();
    }
}

export function play(song: SongInfo) {
    playNewAudio(song)
    resetPlayParams();
    currentPlayingSong.set(song);
}
export function playFirst() {
    // set progress to none
    resetPlayParams();
    playByIndex(0);
}
export function playByIndex(index: number) {
    const song = getSongByIndex(index)
    if (!song) return;
    removeFromCurrent(index);
    addToHistory(song);
    playNewAudio(song);
    currentPlayingSong.set(song);
}

export function resume() {
    if (get(currentPlayingSong)) {
        resumeAudio();
    }
    else {
        nextSong();
    }
}

export function pause() {
    pauseAudio();
}

export async function nextSong() {
    if (get(config).repeatMode == RepeatMode.Single && get(isPlaying) === true) {
        replayAudio();
        return;
    }
    const song = nextSongP();
    if (!song)
        return;
    resetPlayParams();
    playNewAudio(song)
    currentPlayingSong.set(song);
}

export function previousSong() {
    let song = previousSongP();
    if (!song)
        return;
    playNewAudio(song)
    currentPlayingSong.set(song);
}

export function cancel() {
    stopAudio();
    currentPlayingSong.set(undefined);
}

export function changePlayMode() {
    config.update((c) => {
        c.repeatMode = c.repeatMode === RepeatMode.All
            ? RepeatMode.Single
            : RepeatMode.All;
        return c
    })
}

export function onLoaded() {
    if (!audioPlayer?.duration)
        return;
    audioTotalTime.set(Time.fromTotalSeconds(audioPlayer.duration).toMinSecString());
    audioTotalSecond.set(audioPlayer.duration);
    const info = get(currentPlayingSong)
    const title = info?.title ?? '';
    const album = info?.album_name ?? '';
    const artist = info?.artists ? String(info.artists) : '';
    const cover = info?.covers?.[0];

    const metadata = new MediaMetadata({
        title,
        album,
        artist,
        ...(cover ? { artwork: [{ src: cover }] } : {}) // only when src exists
    });

    navigator.mediaSession.metadata = metadata;


}
export function onError(e: any) {
    throw new Error("Not implemented")
}
export function onTimeUpdate() {
    if (!audioPlayer)
        return;
    audioProgress.set(Math.floor(audioPlayer.currentTime));
    audioCurrentTime.set(Time.fromTotalSeconds(audioPlayer.currentTime).toMinSecString());
}

export function onPlaying() { isPlaying.set(true); }

export function onPause() { isPlaying.set(false); }

export function onEnded() {
    // resetPlayParams();
    // update the playcount of current info
    updateSongPlayCount();
    // determine repeat mode 
    if (get(config).repeatMode == RepeatMode.Single) {

        replayAudio();
        return;
    }

    if (isEmpty()) {
        isPlaying.set(false);
        currentPlayingSong.set(undefined);
        return
    }
    nextSong();

}

function updateSongPlayCount() {
    try {
        const info = get(currentPlayingSong);
        updatePlayCount(info as SongInfo);
    }
    catch (e) {
        showWarn("Update playcount failed", String(e));
    }
}

