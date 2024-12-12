import React, { useState } from "react";
import { Bars } from "react-loader-spinner";
import { deleteSongFromSetlist, patchSong } from "../../../api/Api";
import { Song } from "utils/types";

interface SongCardProps {
  song: Song;
  songData: Song[];
  setSongData: React.Dispatch<React.SetStateAction<Song[]>>;
  loading: boolean;
  sortBy: "decade" | "genre";
  isEditMode: boolean;
  error: string | null;
  setError: (err: string | null) => void;
}

const SongCard: React.FC<SongCardProps> = ({
  song,
  songData,
  setSongData,
  loading,
  sortBy,
  isEditMode,
  setError,
}) => {
  const [isSongEditMode, setIsSongEditMode] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    title: song.title,
    artist: song.artist,
    genre: song.genre,
    decade: song.decade,
  });

  const handleDelete = async () => {
    const updatedSongList = songData.filter((s) => s.song_id !== song.song_id);

    setSongData(updatedSongList);

    try {
      await deleteSongFromSetlist(song);
    } catch (error) {
      console.error("Failed to delete song", error);
      setSongData(songData);
      setError("Failed to delete the song. Please try again.");
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedSong = await patchSong(song.song_id, formData);
      const updatedSongList = songData.map((s) =>
        s.song_id === song.song_id ? updatedSong : s
      );

      setSongData(updatedSongList);
      setIsSongEditMode(false);
    } catch (error) {
      console.error("Failed to update song", error);
      setError("Failed to update the song. Please try again.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="song-container bg-white opacity-90 cd rounded p-2">
      {loading ? (
        <>
          <Bars
            height="20"
            width="20"
            color="blue"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
          <span className="sr-only">Loading...</span>
        </>
      ) : isSongEditMode ? (
        <form onSubmit={handleEditSubmit}>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="block w-full mb-2"
          />
          <input
            type="text"
            name="artist"
            value={formData.artist}
            onChange={handleInputChange}
            className="block w-full mb-2"
          />
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleInputChange}
            className="block w-full mb-2"
          />
          <input
            type="text"
            name="decade"
            value={formData.decade}
            onChange={handleInputChange}
            className="block w-full mb-2"
          />
          <button
            type="submit"
            className="bg-green-500 rounded-sm text-white px-2 py-1"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => setIsSongEditMode(false)}
            className="bg-gray-500 rounded-sm text-white px-2 py-1 ml-2"
          >
            Cancel
          </button>

        </form>
      ) :  (
        <>
          <h2 className="text-m font-semibold border-b mb-1">{song.title}</h2>
          <p className="text-sm text-gray-700 border-b pb-1">
            {song.artist} ({song.genre})
          </p>
          {sortBy !== "decade" && song.decade && (
            <p className="text-sm">{song.decade}'s </p>
          )}
          {isEditMode && (
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setIsSongEditMode(true)}
                className="bg-green-500 rounded-sm text-white"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-blue-600 rounded-sm text-white"
              >
                Delete
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SongCard;
