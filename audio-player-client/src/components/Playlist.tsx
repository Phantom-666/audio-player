export default function Playlist() {
  const songs = [
    {
      id: 2,
      name: "test1",
      artist: "Artist 1",
      cover: "http://localhost:3001/music/images/test-image-1.jpg",
    },
    {
      id: 3,
      name: "Song 2",
      artist: "Artist 2",
      cover: "http://localhost:3001/music/images/test-image-1.jpg",
    },
    {
      id: 4,
      name: "Song 3",
      artist: "Artist 3",
      cover: "http://localhost:3001/music/images/test-image-1.jpg",
    },
    {
      id: 5,
      name: "Song 4",
      artist: "Artist 4",
      cover: "http://localhost:3001/music/images/test-image-1.jpg",
    },
  ]

  return (
    <>
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-white text-xl">Liked playlist</h1>
        <div>
          <i className="fa fa-heart text-white text-xl"></i>
        </div>
      </header>
      <section className="grid grid-cols-1 gap-4">
        {songs.map((song) => (
          <div
            key={song.id}
            className="bg-[#181818] p-2 flex items-center rounded-lg cursor-pointer"
          >
            <img
              src={song.cover}
              alt={`Cover of ${song.name}`}
              className="h-[50px] w-[50px] object-cover rounded-lg"
            />
            <div className="ml-3">
              <h3 className="text-white text-md">{song.name}</h3>
            </div>
          </div>
        ))}
      </section>
    </>
  )
}
