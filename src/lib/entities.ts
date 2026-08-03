import { get } from "svelte/store";
import { allSong } from "./stores/pages";
import { addToCurrent, unshiftToCurrent } from "./stores/playlists";
import { openAlbumDetail, openProperty } from "./stores/music";
// import { currentPlayingSong, playNewAudio } from "./stores/player";
import { nextSong, play, playByIndex, playFirst } from "./stores/playbackControl";
import { SongCollectionInfo } from "./stores/property";


export interface IEditOperation {
    property(): void;
    share(): void;
}

export interface IMusicOperation extends IEditOperation {
    play(): void;
    addToPlaylist(): void;
    select(): void;
}

export interface IAlbumOperation extends IMusicOperation {
    detail(): void;
}

export class iTunesSearchAlbumResult {
    artist!: string
    album!: string
    track_count!: number
    release_date!: Date
    copyright!: string
    artwork_sm!: string
    artwork_md!: string
    artwork_lg!: string
    static fromJson(info: Partial<iTunesSearchAlbumResult>): iTunesSearchAlbumResult {
        const result = Object.assign(new iTunesSearchAlbumResult(), info)
        return result
    }
    get releaseDate(): Date | undefined {
        if (this.release_date)
            return new Date(this.release_date);
    }
}

export class iTunesSearchSongResult extends iTunesSearchAlbumResult {
    title!: string
    track_number!: number
    disk_number!: number
    disk_count!: number

    static fromJson(info: Partial<iTunesSearchAlbumResult>): iTunesSearchSongResult {
        const result = Object.assign(new iTunesSearchSongResult(), info)
        return result
    }
}

export class SongInfo implements IMusicOperation {

    album_artist?: string;
    album_name?: string;
    artist_id!: number[];
    artists!: string[];
    bit_rate?: number;
    comment?: string;
    compilation!: boolean;
    composer_id!: number[];
    composers!: string[];
    content_id!: number[];
    copyright?: string;
    covers?: string[];
    date_added?: string;
    date_modified?: string;
    disk_count?: number;
    disk_number?: number;
    duration?: number;
    external_identifier!: string[];
    file_path?: string;
    genre_id?: number;
    genre?: string;
    id!: number;
    itunes_store_kind!: number[];
    last_played_date?: string;
    lyrics?: string;
    owner?: string;
    play_count!: number;
    pregenerated_audio_perception!: boolean;
    purchase_date?: string;
    purchased_apple_id!: string[];
    rating?: number;
    release_date?: string;
    sample_rate?: number;
    seller_storefront_id!: number[];
    title?: string;
    track_count?: number;
    track_number?: number;

    share(): void {
        throw new Error("Method not implemented.");
    }

    play(): void {
        play(this);
    }
    addToPlaylist(): void {
        addToCurrent(this);
    }
    property(): void {
        openProperty(this)
    }
    detail(): void {
    }
    select(): void {
        throw Error("not implemented")
    }

    playCountIncreaseOne(): void {
        this.play_count = this.play_count ? this.play_count + 1 : 1;
    }

    static fromJson(info: Partial<SongInfo>): SongInfo {
        const temp = Object.assign(new SongInfo(), info as SongInfo)
        return temp;
    }
    get durationTime(): Time | undefined {
        if (this.duration)
            return Time.fromTotalSeconds(this.duration)
    }
    get releaseDate(): Date | undefined {
        if (this.release_date)
            return new Date(this.release_date);
    }
    get dateAdded(): Date | undefined {
        if (this.date_added)
            return new Date(this.date_added);
    }
    get dateModified(): Date | undefined {
        if (this.date_modified)
            return new Date(this.date_modified);
    }
}

// page entities

export class AlbumInfoLite implements IMusicOperation, IAlbumOperation {
    artist?: string;
    name!: string;
    song_ids!: number[];
    public get song_infos(): SongInfo[] {
        let songs = get(allSong);
        if (songs.size === 0) {
            throw new Error("song info not loaded");
        }
        let infos = this.song_ids.map(id => songs.get(id)).filter((v): v is SongInfo => !!v);
        return infos;
    }
    public get cover(): string | undefined {
        if (this.song_infos.length > 0 && this.song_infos[0].covers)
            return this.song_infos[0]?.covers[0];
    }

    public get genre(): string | undefined {
        const result = this.song_infos.find(i => i.genre !== undefined)
        return result?.genre;
    }
    public get release_year(): Date | undefined {
        // return this.song_infos[0]?.release_year;
        const result = this.song_infos.find(i => i.release_date !== undefined)
        return result?.releaseDate;
    }
    public get trackCount(): number | undefined {
        const result = this.song_infos.find(i => i.track_count !== undefined)
        return result?.track_count;
    }
    public get diskCount(): number | undefined {
        const result = this.song_infos.find(i => i.disk_count !== undefined)
        return result?.disk_count;
    }
    public get compliation(): boolean | undefined {
        const result = this.song_infos.find(i => i.compilation !== undefined)
        return result?.compilation;
    }
    public get rating(): number {
        const result = this.song_infos.flatMap(i => i.rating !== undefined ? [i.rating] : [])
        const sum = result.reduce((acc, n) => acc + n, 0);
        const avg = sum / result.length;
        return avg;
    }
    share(): void {
        throw new Error("Method not implemented.");
    }

    property(): void {
        const info = SongCollectionInfo.fromAlbumInfo(this);
        openProperty(info);
    }
    play(): void {
        const s_info = this.song_infos;
        s_info.forEach(element => {
            unshiftToCurrent(element);
        });
        playFirst();
    }
    addToPlaylist(): void {
        const s_info = this.song_infos;
        s_info.forEach(element => {
            addToCurrent(element);
        });
    }
    detail(): void {
        const info = SongCollectionInfo.fromAlbumInfo(this);
        openAlbumDetail(info);
    }
    select(): void {
        // selectedSong.set(this.song_infos);
        throw new Error("not implemented");
    }
    static fromJson(info: Partial<AlbumInfoLite>): AlbumInfoLite {
        const result = Object.assign(new AlbumInfoLite(), info)
        return result
    }
}


export class ArtistInfoLite implements IMusicOperation {

    artist?: string;
    albums!: AlbumInfoLite[];
    get songsCount(): number {
        return this.albums.reduce((count, album) => count + album.song_ids.length, 0);
    }
    static fromJson(info: Partial<ArtistInfoLite>): ArtistInfoLite {
        const result = Object.assign(new ArtistInfoLite(), info);
        result.albums = result.albums?.map(album => AlbumInfoLite.fromJson(album));
        return result
    }
    play(): void {
        const info = SongCollectionInfo.fromArtistsInfo(this);
        info.song_infos.forEach(element => {
            unshiftToCurrent(element);
        });
        playFirst();
    }
    addToPlaylist(): void {
        const info = SongCollectionInfo.fromArtistsInfo(this);
        info.song_infos.forEach(info => {
            addToCurrent(info);
        });
    }
    select(): void {
        throw new Error("Method not implemented.");
    }
    property(): void {
        const info = SongCollectionInfo.fromArtistsInfo(this);
        openProperty(info);
    }
    share(): void {
        throw new Error("Method not implemented.");
    }

}

export class GenreInfoLite implements IMusicOperation {

    genre!: string;
    artists!: ArtistInfoLite[];

    play(): void {
        const info = SongCollectionInfo.fromGenresInfo(this);
        info.song_infos.forEach(info => {
            unshiftToCurrent(info);
        });
        playFirst();
    }
    addToPlaylist(): void {
        const info = SongCollectionInfo.fromGenresInfo(this);
        info.song_infos.forEach(info => {
            addToCurrent(info);
        })
    }
    select(): void {
        throw new Error("Method not implemented.");
    }
    property(): void {
        const info = SongCollectionInfo.fromGenresInfo(this);
        openProperty(info);
    }
    share(): void {
        throw new Error("Method not implemented.");
    }

    static fromJson(info: Partial<GenreInfoLite>): GenreInfoLite {
        const result = Object.assign(new GenreInfoLite(), info)
        result.artists = result.artists.map(artist => ArtistInfoLite.fromJson(artist))
        return result;
    }
}

export class PlaylistInfoLite implements IMusicOperation {
    id!: number
    name!: string
    song_ids!: number[]
    description!: string

    get songs(): SongInfo[] {
        let songs = get(allSong);
        if (songs.size === 0) {
            throw new Error("song info not loaded");
        }
        let infos = this.song_ids.map(id => songs.get(id)).filter((v): v is SongInfo => !!v);
        return infos;
    }

    play(): void {
        const info = SongCollectionInfo.fromPlaylistInfo(this);
        info.song_infos.forEach(info => {
            unshiftToCurrent(info);
        });
        playFirst();
    }
    addToPlaylist(): void {
        const info = SongCollectionInfo.fromPlaylistInfo(this);
        info.song_infos.forEach(info => {
            addToCurrent(info);
        })
    }
    select(): void {
        throw new Error("Method not implemented.");
    }
    property(): void {
        const info = SongCollectionInfo.fromPlaylistInfo(this);
        openProperty(info);
    }

    share(): void {
        throw new Error("Method not implemented.");
    }


    static fromJson(info: Partial<PlaylistInfoLite>): PlaylistInfoLite {
        const result = Object.assign(new PlaylistInfoLite(), info)
        return result;
    }
}


export class RecentAddedInfoLite {

    description!: string
    album_infos!: AlbumInfoLite[]
    static fromJson(info: Partial<RecentAddedInfoLite>): RecentAddedInfoLite {
        const result = Object.assign(new RecentAddedInfoLite(), info)
        result.album_infos = result.album_infos.map(album => AlbumInfoLite.fromJson(album));
        return result;
    }
}

export class Time {
    private hours: number;
    private minutes: number;
    private seconds: number;

    constructor(hours: number, minutes: number, seconds: number) {
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
    }

    // 静态方法用于从字符串创建自定义时间对象
    static fromTimeString(time: string): Time {
        const parts = time.split(':');

        let hours = 0;
        let minutes = 0;
        let seconds = 0;

        if (parts.length === 2) {
            // 格式为 "分钟:秒钟"
            minutes = parseInt(parts[0], 10);
            seconds = parseInt(parts[1], 10);
        } else if (parts.length === 3) {
            // 格式为 "小时:分钟:秒钟"
            hours = parseInt(parts[0], 10);
            minutes = parseInt(parts[1], 10);
            seconds = parseInt(parts[2], 10);
        } else {
            throw new Error("Invalid time format. Use 'mm:ss' or 'hh:mm:ss'.");
        }

        return new Time(hours, minutes, seconds);
    }
    static fromTotalSeconds(totalSeconds: number): Time {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = Math.floor(totalSeconds % 60);
        return new Time(hours, minutes, seconds);
    }
    // 输出格式化的时间字符串
    toHourMimSecString(): string {
        const h = String(this.hours).padStart(2, '0');
        const m = String(this.minutes).padStart(2, '0');
        const s = String(this.seconds).padStart(2, '0');
        return `${h}:${m}:${s}`;
    }

    toMinSecString(): string {
        const m = String(this.minutes).padStart(2, '0');
        const s = String(this.seconds).padStart(2, '0');
        return `${m}:${s}`;
    }

    toString(): string {
        return this.toHourMimSecString();
    }
    // 获取总秒数
    toTotalSeconds(): number {
        return this.hours * 3600 + this.minutes * 60 + this.seconds;
    }

}

