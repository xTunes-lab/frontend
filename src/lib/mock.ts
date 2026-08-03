// import { AlbumInfoData, ArtistInfoData, GenresInfoData, RecentSongInfoData, SongInfo, Time } from "./entities";


// const songInfoAll = [];
// export let songInfosMock = songInfoAll;

// export const dateSortedSongInfoMock = () => {
//     const groupedSongs = songInfosMock.reduce((accumulator, song) => {
//         const year = song.addedDate.getFullYear();

//         // Initialize the year array if it doesn't exist
//         if (!accumulator[year]) {
//             accumulator[year] = [];
//         }

//         // Push the song into the correct year array
//         accumulator[year].push(song);
//         return accumulator;
//     }, {} as { [key: number]: SongInfo[] });

//     // Convert the grouped object into an array of RecentSongInfoData
//     let sortedSongInfo = Object.entries(groupedSongs).map(([year, songInfos]) => {
//         return new RecentSongInfoData(new Date(+year, 0, 1), songInfos);
//     });

//     return sortedSongInfo.reverse();
// }

// export function sortByArtist(songs: SongInfo[]): { [key: string]: AlbumInfoData[] } {
//     const grouped: { [key: string]: AlbumInfoData[] } = songs.reduce((accumulator, song) => {
//         const artist = song.artists[0]; // Get the first artist's name
//         const album = song.albumName; // Get the album name

//         // Initialize the artist array if it doesn't exist
//         if (!accumulator[artist]) {
//             accumulator[artist] = [];
//         }

//         // Find the album info data object for the current album
//         let albumInfo = accumulator[artist].find(info => info.songs[0]?.albumName === album);

//         // If the album doesn't exist for the artist, create a new AlbumInfoData
//         if (!albumInfo) {
//             albumInfo = new AlbumInfoData([]);
//             accumulator[artist].push(albumInfo);
//         }

//         // Push the song into the correct album info data object
//         albumInfo.songs.push(song);
//         return accumulator;
//     }, {} as { [key: string]: AlbumInfoData[] });

//     return grouped

// }
// function groupSongsByArtistAlbum(songs: SongInfo[]): ArtistInfoData[] {

//     const grouped = sortByArtist(songs);
//     // Convert to ArtistInfoData[]
//     const artistInfoDataArray: ArtistInfoData[] = Object.entries(grouped).map(([artistName, albumInfos]) => {
//         // Sort the albumInfos array by the name property
//         const sortedAlbumInfos = albumInfos.sort((a, b) => a.name.localeCompare(b.name));

//         // You can set the picture based on your logic, here it's left optional
//         const picture = undefined; // Replace with logic to fetch artist picture if needed
//         return new ArtistInfoData(sortedAlbumInfos, picture);
//     });
//     const aToZArray = artistInfoDataArray.sort((a, b) => {
//         const nameA = a.mainArtistName.toLowerCase();
//         const nameB = b.mainArtistName.toLowerCase();
//         return nameA.localeCompare(nameB);
//     });
//     return aToZArray;
// }
// export function getAritstPageData(): ArtistInfoData[] {
//     return groupSongsByArtistAlbum(songInfosMock);
// }


// // Function to create sorted AlbumInfoData[]
// export function createSortedAlbumInfoData(songs: SongInfo[]): AlbumInfoData[] {
//     // Step 1: Grouping by artist and album
//     const grouped = songs.reduce((accumulator: Record<string, { artist: string; album: string; songs: SongInfo[] }>, song) => {
//         const artist = song.artists[0];
//         const album = song.albumName;

//         // Create a unique key for each group
//         const key = `${artist}-${album}`;

//         if (!accumulator[key]) {
//             accumulator[key] = { artist, album, songs: [] };
//         }

//         accumulator[key].songs.push(song);
//         return accumulator;
//     }, {});

//     // Step 2: Transform the grouped object into an array and sort it
//     const groupedArray = Object.values(grouped);

//     // Sorting by artist and then album
//     groupedArray.sort((a, b) => {
//         const artistComparison = a.artist.localeCompare(b.artist);
//         if (artistComparison === 0) {
//             return a.album.localeCompare(b.album);
//         }
//         return artistComparison;
//     });
//     const sortedAlbumInfo = groupedArray.sort((a, b) => a.album.localeCompare(b.album)).map((g) => new AlbumInfoData(g.songs));
//     return sortedAlbumInfo;
// }

// export function sortSongInfoArray(songInfos: SongInfo[]): SongInfo[] {
//     return songInfos.sort((a, b) => a.name.localeCompare(b.name));
// }

// export function sortByGenres(songInfos: SongInfo[]): GenresInfoData[] {
//     const groupedByGenre: { [key: string]: SongInfo[] } = songInfos.reduce((acc, song) => {
//         const genre = song.genre;
//         if (!acc[genre]) {
//             acc[genre] = [];
//         }
//         acc[genre].push(song);
//         return acc;
//     }, {} as { [key: string]: SongInfo[] });

//     const result: GenresInfoData[] = Object.entries(groupedByGenre).map(([genre, songs]) => {
//         const artistInfos = groupSongsByArtistAlbum(songs);
//         return new GenresInfoData(genre, artistInfos);
//     });

//     return result.sort((a, b) => a.name.localeCompare(b.name));
// }

// export function groupSongsByTimePeriod(songInfos: SongInfo[]): RecentSongInfoData[] {
//     const now = new Date();
//     const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
//     const startOfWeek = new Date(today);
//     const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
//     const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Days to subtract to get to Monday
//     startOfWeek.setDate(today.getDate() - diff);
//     const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
//     const startOfYear = new Date(now.getFullYear(), 0, 1);

//     const result: RecentSongInfoData[] = [];

//     // Today
//     const todaySongs = songInfos.filter(song => song.addedDate >= today);
//     if (todaySongs.length > 0) {
//         result.push(new RecentSongInfoData(today, todaySongs));
//     }

//     // This Week (from start of week to yesterday)
//     const yesterday = new Date(today);
//     yesterday.setDate(today.getDate() - 1);
//     const thisWeekSongs = songInfos.filter(song => song.addedDate >= startOfWeek && song.addedDate < today);
//     if (thisWeekSongs.length > 0) {
//         result.push(new RecentSongInfoData(startOfWeek, thisWeekSongs));
//     }

//     // This Month (from start of month to start of week - 1)
//     const thisMonthSongs = songInfos.filter(song => song.addedDate >= startOfMonth && song.addedDate < startOfWeek);
//     if (thisMonthSongs.length > 0) {
//         result.push(new RecentSongInfoData(startOfMonth, thisMonthSongs));
//     }

//     // This Year (from start of year to start of month - 1)
//     const thisYearSongs = songInfos.filter(song => song.addedDate >= startOfYear && song.addedDate < startOfMonth);
//     if (thisYearSongs.length > 0) {
//         result.push(new RecentSongInfoData(startOfYear, thisYearSongs));
//     }

//     // Rest by year
//     const restSongs = songInfos.filter(song => song.addedDate < startOfYear);
//     const yearGroups = restSongs.reduce((acc, song) => {
//         const year = song.addedDate.getFullYear();
//         if (!acc[year]) acc[year] = [];
//         acc[year].push(song);
//         return acc;
//     }, {} as { [year: number]: SongInfo[] });

//     for (const year in yearGroups) {
//         const yearDate = new Date(parseInt(year), 0, 1);
//         result.push(new RecentSongInfoData(yearDate, yearGroups[year]));
//     }

//     // Sort by date descending (newest first)
//     result.sort((a, b) => b.addedDate.getTime() - a.addedDate.getTime());

//     return result;
// }