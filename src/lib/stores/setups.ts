import { goto } from "$app/navigation";
import { initNotificationWebsocket, setAlbumPageData, setArtistPageData, setGenresPageData, setHomePageData, setLibraryPath, setPlaylists } from "$lib/api";
import { get, writable } from "svelte/store";
import { loadSetting } from "./configs";

export const loading = writable(false);
export const process = writable("init");
export const isImportFromItunes = writable(true);


export async function initLibrary() {
    const option = get(isImportFromItunes);
    if (option)
    {
        
    }
    reloadLibrary();
    goto("/");
}

export async function reloadLibrary() {
    loading.set(true)
    loadSetting();
    process.set("init notification websocket");
    initNotificationWebsocket();
    process.set("init library path");
    await setLibraryPath();
    process.set("fetch home data");
    await setHomePageData();
    process.set("fetch album data");
    await setAlbumPageData();
    process.set("fetch artist data");
    await setArtistPageData();
    process.set("fetch genres data");
    await setGenresPageData();
    process.set("fetch playlists data");
    await setPlaylists();
    process.set("done");
    loading.set(false);
}