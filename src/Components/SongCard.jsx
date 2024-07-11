const SongCard = ({song}) => {
return (
    <div className="song-container bg-white flex flex col border border-gray-500 m-8 p-2">
        <p>{song.artist} - {song.title}</p>

        {/* we're ready to start adding the songs! Need an express.js or next.js restful server with a psql backend.
        Essentially I want to be able to see the setlist, sort the setlist by genre, decade, artist, alphabetically etc.
        Also, if a path exists on the returned song object, I want a listen link.*/}
    </div>
)

}

export default SongCard;