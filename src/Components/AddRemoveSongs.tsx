import React, { useState } from "react";
import { postNewSongsToSetlistWithRetry } from "../../api/Api";

const AddRemoveSongs: React.FC = () => {
  const [formData, setFormData] = useState({
    artist: "",
    title: "",
    genre: "",
    decade: "",
  });
  const [status, setStatus] = useState<string>("");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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

        <div className="text-red-500">{status && <p>{status}</p>}</div>

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
          <input
            className="border-b border-gray-300 focus:border-black focus:outline-none transition-all duration-1000 py-2 px-3"
            id="decade"
            name="decade"
            type="decade"
            placeholder="What Decade?"
            value={formData.decade}
            onChange={handleChange}
            required
          />
        </div>

        <button
          className="bg-stone-200 hover:bg-stone-300 rounded px-10 py-3 w-full sm:w-auto"
          type="submit"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default AddRemoveSongs;