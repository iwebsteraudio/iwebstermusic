export interface Song {
  song_id: number;
  title: string;
  artist: string;
  genre: string;
  decade: string;
}

export interface SongMp3 {
  fileName: string;
  url: string;
}
