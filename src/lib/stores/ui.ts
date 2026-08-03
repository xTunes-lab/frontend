import { get, writable } from "svelte/store";
import { config } from "./configs";
import { ThemeMode } from "./enums";
import { mdWidth } from "$lib/global";

export const showLogin = writable(false);
export const isSideMenuOpen = writable(false);
export const isCurrentPlayingOpen = writable(false);
export const isPropertyModalOpen = writable(false);
export const isAlbumDetailModalOpen = writable(false);
export const isPlaylistOpen = writable(false);
export const isEditMode = writable(false);
export const isConfirmBoxOpen = writable(false);
export const isPlaylistSelectOpen = writable(false);


export const homePageScroll = writable(0);
export const albumPageScroll = writable(0);
export const songPageScroll = writable(0);
export const artistListScroll = writable(0);
export const artistBlockListScroll = writable(0);
export const genreListScroll = writable(0);
export const genreBlockListScroll = writable(0);
export const playlistScroll = writable(0);
export const playlistBlockScroll = writable(0);

export const confirmBoxText = writable("");
export let confirmBoxYesCallback: CallableFunction | undefined
export let confirmBoxNoCallback: CallableFunction | undefined

function restoreConfirmBoxParam() {
    isConfirmBoxOpen.set(false);
    confirmBoxYesCallback = undefined;
    confirmBoxNoCallback = undefined;
    confirmBoxText.set("")
}
export function openConfirmBox(message: string, yesCallback?: CallableFunction, noCallback?: CallableFunction) {
    restoreConfirmBoxParam();
    isConfirmBoxOpen.set(true);
    confirmBoxText.set(message);
    confirmBoxYesCallback = yesCallback;
    confirmBoxNoCallback = noCallback;
}
export function ConfirmBoxYes() {
    confirmBoxYesCallback?.();
    restoreConfirmBoxParam();
}
export function ConfirmBoxNo() {
    confirmBoxNoCallback?.();
    restoreConfirmBoxParam();
}


export function toggleTheme() {
    config.update((c) => {
        c.theme = c.theme === ThemeMode.Light ? ThemeMode.Dark : ThemeMode.Light;
        document.documentElement.setAttribute("class", c.theme);
        return c;
    })
}

export function toggleEditMode() {
    isEditMode.set(!get(isEditMode))
}

export function closeAllPopUps() {
    isAlbumDetailModalOpen.set(false);
    isPropertyModalOpen.set(false);
    isCurrentPlayingOpen.set(false);
}


export function toggleSideMenu() {
    isSideMenuOpen.set(!get(isSideMenuOpen));
    if (window.innerWidth < mdWidth)
        isPlaylistOpen.set(false);
}

export function togglePlaylist() {
    isPlaylistOpen.set(!get(isPlaylistOpen));
    if (window.innerWidth < mdWidth)
        isSideMenuOpen.set(false);
}

export function toggleCurrentPlaying() {
    isCurrentPlayingOpen.set(true);
    if (window.innerWidth < mdWidth) {
        isSideMenuOpen.set(false);
        isPlaylistOpen.set(false);
    }
}


export const isMobileMode = writable(false);
export function onWindowResize() {
    if (window.innerWidth > mdWidth) {
        isMobileMode.set(false)
    }
    else {
        isMobileMode.set(true);
    }
}

isMobileMode.subscribe((flag) => {
    if (flag)
        isSideMenuOpen.set(false);
})