import { get, writable, type Writable } from "svelte/store"
import { RepeatMode, ThemeMode } from "./enums"

export class Config {
    volumn: number = 100;
    serverAddress: string = "localhost:8080";
    libraryPath: string = "/workspaces/online-music-library/backend/src/static";
    language: string = "en";
    repeatMode: RepeatMode = RepeatMode.All;
    shuffleMode: boolean = false;
    gainUnify: boolean = false;
    theme: ThemeMode = ThemeMode.Light;
    public get protocol(): string {
        if (typeof window !== "undefined" && window.location.protocol === "https:") {
            return "https";
        }
        return "http";
    }
    public get musicStreamUrl(): string {
        return `${this.protocol}://${this.serverAddress}/get_music_stream?`
    }
    public get changeLibraryUrl(): string {
        return `${this.protocol}://${this.serverAddress}/set_library_path`
    }
    public get allSongIdsUrl(): string {
        return `${this.protocol}://${this.serverAddress}/get_all_song_ids`
    }
    public get metaInfoByIdUrl(): string {
        return `${this.protocol}://${this.serverAddress}/get_meta_info_by_id`
    }
    public get getAudioMetaInfo(): string {
        return `${this.protocol}://${this.serverAddress}/get_audio_meta_info`;
    }
    public get uploadAudio(): string {
        return `${this.protocol}://${this.serverAddress}/upload_audio`;
    }
    public get allSongInfosUrl(): string {
        return `${this.protocol}://${this.serverAddress}/get_all_meta_info`
    }
    public get allPlaylistsUrl(): string {
        return `${this.protocol}://${this.serverAddress}/get_all_playlists`
    }
    public get recentAddUrl(): string {
        return `${this.protocol}://${this.serverAddress}/get_recent_added`
    }
    public get genreInfoUrl(): string {
        return `${this.protocol}://${this.serverAddress}/get_ids_by_genre`
    }
    public get idsByAlbumUrl(): string {
        return `${this.protocol}://${this.serverAddress}/get_ids_by_album`
    }
    public get idsByArtistUrl(): string {
        return `${this.protocol}://${this.serverAddress}/get_ids_by_artist`
    }
    public get searchSongUrl(): string {
        return `${this.protocol}://${this.serverAddress}/search_song`
    }
    public get searchAlbumUrl(): string {
        return `${this.protocol}://${this.serverAddress}/search_album`
    }
    public get syncSingleSongUrl(): string {
        return `${this.protocol}://${this.serverAddress}/sync_single`
    }
    public get syncLibrary(): string {
        return `${this.protocol}://${this.serverAddress}/sync_library`
    }
    public get isAudioFileExistUrl(): string {
        return `${this.protocol}://${this.serverAddress}/is_music_file_exist`
    }
    public get updateMetaInfoUrl(): string {
        return `${this.protocol}://${this.serverAddress}/update_meta_info`
    }
    public get notificationUrl(): string {
        const wsProtocol = this.protocol === "https" ? "wss" : "ws";
        console.log(`notificationUrl: ${wsProtocol}://${this.serverAddress}/notifications`);
        return `${wsProtocol}://${this.serverAddress}/notifications`
    }
    public get uploadAudioUrl(): string {
        return `${this.protocol}://${this.serverAddress}/upload_audio`
    }
    public get allSongInfoLiteUrl(): string {
        // get the lite info only contains id and modified data
        return `${this.protocol}://${this.serverAddress}/get_all_song_info_lite`
    }
    public get deleteSongUrl(): string {
        return `${this.protocol}://${this.serverAddress}/delete_song`
    }
    public get importFromiTunesUrl(): string {
        return `${this.protocol}://${this.serverAddress}/import_from_itunes`
    }
}

// export const serverAddress = writable<String>("localhost:8080");
// export const libraryPath = writable<String>("/workspaces/online-music-library/backend/src/static");

export const config: Writable<Config> = writable(new Config());

export const CONFIG_STORAGE_KEY = "config"




export function loadSetting(): void {
    if (typeof window === 'undefined')
        return

    const raw = localStorage.getItem(CONFIG_STORAGE_KEY);
    let cc;
    if (!raw) {
        cc = new Config();
    }
    else {
        const parsed = JSON.parse(raw) as Partial<Config>;
        cc = Object.assign(new Config(), parsed);
    }
    config.set(cc);
    document.documentElement.setAttribute("class", get(config).theme);
    config.subscribe((value: Config) => {
        try {
            localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(value));
        } catch {
            // ignore storage errors
        }
        return value
    })
}