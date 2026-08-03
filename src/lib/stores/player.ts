import { SongInfo } from "$lib/entities";
import { get } from "svelte/store";
import { config } from "./configs";
import axios from "axios";
import { showError } from "./notification";
import { onEnded, onError, onLoaded, onPause, onPlaying, onTimeUpdate } from "./playbackControl";
import { isAudioFileExist, loadAudioToBlob } from "$lib/api";


export let audioPlayer: HTMLAudioElement | undefined = undefined;

export function loadAudioFile(song: SongInfo) {
    if (!window)
        return
    if (!song.file_path) {
        showError("File info missing", `Audio file path is missing`);
        throw Error("Audio file path is missing")
    }
    const params = new URLSearchParams({ file_relative_path: song.file_path })
    const url = new URL(get(config).musicStreamUrl) + params.toString();
    validateAudioUrl(song);
    audioPlayer = new Audio(url);
    audioPlayer.volume = get(config).volumn / 100;
    audioPlayer.onloadedmetadata = () => onLoaded();
    audioPlayer.ontimeupdate = () => onTimeUpdate();
    audioPlayer.onplaying = () => onPlaying();
    audioPlayer.onpause = () => onPause();
    audioPlayer.onended = () => onEnded();
    audioPlayer.onerror = (e) => onError(e);
    // loadAudioToBlob(song).then((blobUrl) => {
    // todo save to indexdb
    // });
}

function validateAudioUrl(song: SongInfo) {
    if (!song.file_path) {
        showError("File info missing", `Audio file path is missing`);
        throw Error("Audio file path is missing")
    }

    const exist = isAudioFileExist(song);
    if (!exist) {
        showError("File not found", `Audio file ${song.file_path} is not found`);
        throw Error(`Audio file ${song.file_path} is not found`)
    }
}

export function onVolumnChange(volume: number) {
    if (!audioPlayer) return;
    audioPlayer.volume = volume / 100;
}

export async function onSeeking(e: Event) {
    const input = e.target as HTMLInputElement;
    const seekValue = input.value;
    if (!audioPlayer) return;
    audioPlayer.currentTime = parseFloat(seekValue);
}

export function playNewAudio(song: SongInfo) {
    stopAudio();
    loadAudioFile(song);
    resumeAudio();
}

export function resumeAudio() {
    if (!audioPlayer) return;
    if (!audioPlayer.paused && !audioPlayer.ended) return;
    audioPlayer.play();
}

export function stopAudio() {
    audioPlayer?.pause();
    audioPlayer?.remove();
}

export function pauseAudio() {
    if (!audioPlayer) return
    if (!audioPlayer.played && !audioPlayer.ended) return;
    audioPlayer.pause();
}


export function replayAudio() {
    if (!audioPlayer) return;

    audioPlayer.currentTime = 0;
    void resumeAudio();
}