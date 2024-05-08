import { useNavigate } from "react-router-dom"

export default function Playlists() {
  const nav = useNavigate()

  const albums = [
    {
      id: 2,
      name: "Liked playlist",
      cover: "http://localhost:3001/music/images/liked_playlist.png",

      onClick: () => {
        nav("/playlist/liked")
      },
    },
  ]
  return (
    <>
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-white text-xl">Playlists</h1>
        <div>
          <i className="fa fa-heart text-white text-xl"></i>
        </div>
      </header>
      <section className="grid grid-cols-1 gap-4">
        {albums.map((album) => (
          <div
            key={album.id}
            className="bg-[#181818] p-2 flex items-center rounded-lg cursor-pointer"
            onClick={album.onClick}
          >
            <img
              src={album.cover}
              alt={`Cover of ${album.name}`}
              className="h-[50px] w-[50px] object-cover rounded-lg"
            />
            <div className="ml-3">
              <h3 className="text-white text-md">{album.name}</h3>
            </div>
          </div>
        ))}
      </section>
    </>
  )
}
