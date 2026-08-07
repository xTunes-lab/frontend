import { get, writable } from "svelte/store";
import { allSong } from "./pages";
import { downloadAudio } from "$lib/api";

export const downloadProgress = writable(0);

export async function cacheLibrary() {

    const map = get(allSong);
    for (const [key, song] of map.entries()) {
        const data = await downloadAudio(song)
    }
}
