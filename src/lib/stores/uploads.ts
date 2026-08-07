import { getAudioMetaInfo, searchAlbum, searchSong, uploadFileWithInfo, uploadiTunesXml } from "$lib/api";
import type { iTunesSearchAlbumResult, iTunesSearchSongResult, SongInfo } from "$lib/entities";
import { get, writable, type Writable } from "svelte/store";
import { showWarn } from "./notification";

export const dragOver = writable(false);
// export const fileList = writable<FileList | undefined>();
export const file = writable<File | undefined>();
export const searchResult = writable<iTunesSearchSongResult[] | undefined>()

export const name = writable<string>();
export const artist = writable<string>();
export const isSearching = writable(false);
export const selectedResult = writable<iTunesSearchSongResult | undefined>();

function isM4AFile(f: File | undefined | null) {
    if (!f) return false;

    const name = f.name?.toLowerCase?.() ?? "";
    const byExt = name.endsWith(".m4a");
    const mime = (f.type || "").toLowerCase();
    const byMime = mime === "audio/mp4" || mime === "audio/mpeg";

    return byExt || byMime;
}

export function onDrop(e: DragEvent) {
    e.preventDefault();
    dragOver.set(false);

    const dt = e.dataTransfer;
    if (!dt) return;

    const dropped = dt.files?.[0];
    if (!isM4AFile(dropped)) {
        file.set(undefined as any);
        return;
    }

    file.set(dropped);
}

export function onDragOver(e: DragEvent) {
    e.preventDefault();
    // required to allow drop
    // e.dataTransfer.dropEffect = "copy";
    dragOver.set(true);
}

export function onDragLeave(e: DragEvent) {
    // when leaving the drop zone, reset visual state
    dragOver.set(false);
}
export function onFileSelected(e: Event) {
    const input = e.currentTarget as HTMLInputElement;
    file.set(input.files?.[0]);
}
export async function onSearchSongInfo() {
    if (!get(name) || !get(artist))
        return
    searchResult.set(undefined);
    selectedResult.set(undefined);
    isSearching.set(true)
    const info = await searchSong(get(name), get(artist));
    searchResult.set(info);
    isSearching.set(false)
}


export async function cancelAudioUpload() {
    file.set(undefined);
}

// itunes xml uploads

export const xmlFile = writable<File | undefined>();

export function onImportItunesXml(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    xmlFile.set(file);
}

export function importFromItunesXml() {
    const xmlfile = get(xmlFile);
    if (xmlfile) {
        uploadiTunesXml(xmlfile);
    }

}
