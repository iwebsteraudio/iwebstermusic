import React, { useState } from "react";
import { postNewSongsToSetlistWithRetry } from "../../../api/Api";
import { Song } from "utils/types";

interface AddSongsProps {
  songData: Song[];
  setSongData: React.Dispatch<React.SetStateAction<Song[]>>;
}

const AddSongs: React.FC<AddSongsProps> = ({ setSongData }) => {
  const [formData, setFormData] = useState({
    artist: "",
    title: "",
    genre: "",
    decade: "",
  });
  const [status, setStatus] = useState<string>("");

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const tempSong: Song = {
      song_id: Math.floor(Math.random() * 1000000),
      ...formData,
    };

    setSongData((prevSongs) => [...prevSongs, tempSong]);

    try {
      const response = await postNewSongsToSetlistWithRetry(formData);
      if (response.data) {
        setStatus("Song Posted Successfully!");
      } else {
        setStatus(`Error: ${response.data.message}`);
      }
    } catch (error: unknown) {
      setStatus("Error posting song!");
    }

    setFormData({
      artist: "",
      title: "",
      genre: "",
      decade: "",
    });
  };

  return (
    <div className="shadow-md rounded-md flex items-center justify-center bg-white w-full p-4 sm:p-6 md:p-8">
      <form
        className="w-full sm:w-3/4 md:w-2/3 text-1 font-monaSans"
        onSubmit={handleSubmit}
      >
        <h3 className="text-2xl sm:text-3xl font-extrabold italic text-center mb-6">
          Add songs
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <input
            className="border-b border-gray-300 focus:border-black focus:outline-none transition-all duration-1000 py-2 px-3"
            id="artist"
            name="artist"
            type="text"
            placeholder="Artist"
            value={formData.artist}
            onChange={handleChange}
            required
          />
          <div className="flex flex-col">
            <input
              className={`border-b border-gray-300 focus:border-black focus:outline-none transition-all duration-1000 py-2 px-3`}
              id="title"
              name="title"
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <input
            className="border-b border-gray-300 focus:border-black focus:outline-none transition-all duration-1000 py-2 px-3"
            id="genre"
            name="genre"
            type="genre"
            placeholder="What Genre?"
            value={formData.genre}
            onChange={handleChange}
            required
          />
          <select
            className="border-b border-gray-300 focus:border-black focus:outline-none transition-all duration-1000 py-2 px-3"
            id="decade"
            name="decade"
            value={formData.decade}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              What Decade?
            </option>
            <option value="1950">1950's</option>
            <option value="1960">1960's</option>
            <option value="1970">1970's</option>
            <option value="1980">1980's</option>
            <option value="1990">1990's</option>
            <option value="2000">2000's</option>
            <option value="2010">2010's</option>
            <option value="2020">2020's</option>
          </select>
        </div>

        <button
          className="bg-stone-200 hover:bg-stone-300 rounded px-10 py-3 w-full sm:w-auto"
          type="submit"
        >
          Send
        </button>
        <div className="text-red-500">{status && <p>{status}</p>}</div>
      </form>
    </div>
  );
};

export default AddSongs;
