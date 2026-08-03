import { AlbumInfoLite, ArtistInfoLite, GenreInfoLite, PlaylistInfoLite, SongInfo } from "$lib/entities";
import { get, writable } from "svelte/store";
import { allSong } from "./pages";
import { isPropertyModalOpen, isAlbumDetailModalOpen } from "./ui";
import { showMenu } from "./contextMenu";
import { SongCollectionInfo } from "./property";

export const selectedSongs = writable<SongInfo[]>([]);
export const selectedObject = writable<SongInfo | SongCollectionInfo>(undefined);
export function getSongInfoFromId(id: number): SongInfo | undefined {
    const songMap = get(allSong);
    const info = songMap.get(id)
    return info;
}

export function openProperty(object: SongInfo | SongCollectionInfo) {
    selectedObject.set(object);
    isPropertyModalOpen.set(true);
    isAlbumDetailModalOpen.set(false);
}

export function openAlbumDetail(info: SongCollectionInfo) {
    if (get(showMenu)) {
        showMenu.set(false);
        return;
    }

    selectedObject.set(info);
    isAlbumDetailModalOpen.set(true);
    isPropertyModalOpen.set(false);
}


export function isSong(): boolean {
    const result = get(selectedObject) instanceof SongInfo;
    return result;
}