import { useNavigate } from "react-router-dom"
import { userSlice } from "../store/reducers/UserSlice"
import { useAppDispatch, useAppSelector } from "../hooks/redux"
import { userAPI } from "../services/UserService"
import { playerSlice } from "../store/reducers/PlayerSlice"

export default function Playlists() {
  const nav = useNavigate()

  const functions = [
    {
      id: 1,
      name: "Find music",
      cover: "http://localhost:3001/music/images/find_music.jpg",

      onClick: () => {
        nav("/find_music")
      },
    },
    {
      id: 2,
      name: "Create playlist",
      cover: "http://localhost:3001/music/images/create_playlist.jpg",

      onClick: () => {
        nav("/create_playlist")
      },
    },
  ]

  const { setCurrentSong, setIsPlaying, setCurrentTime, setDuration } =
    playerSlice.actions

  const { logoutAuth } = userSlice.actions
  const dispatch = useAppDispatch()

  const { username } = useAppSelector((state) => state.userReducer)

  const p = userAPI.useGetPlaylistsQuery(username)

  return (
    <>
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-white text-xl">Functions</h1>
        <div>
          <i
            className="fa fa-times text-white text-xl cursor-pointer"
            onClick={() => {
              localStorage.removeItem("username")
              dispatch(setCurrentSong(null))
              dispatch(setIsPlaying(false))
              dispatch(setCurrentTime(0))
              dispatch(setDuration(0))
              dispatch(logoutAuth())
            }}
          ></i>
        </div>
      </header>
      <section className="grid grid-cols-1 gap-4">
        {functions.map((f) => (
          <div
            key={f.id}
            className="bg-[#181818] p-2 flex items-center rounded-lg cursor-pointer"
            onClick={f.onClick}
          >
            <img
              src={f.cover}
              alt={`Cover of ${f.name}`}
              className="h-[50px] w-[50px] object-cover rounded-lg"
            />
            <div className="ml-3">
              <h3 className="text-white text-md">{f.name}</h3>
            </div>
          </div>
        ))}
      </section>
      <h1 className="text-white text-xl mt-2">Playlists</h1>
      <section className="grid grid-cols-1 gap-4 mt-2">
        {p.data?.playlists.map((album: { id: number; name: string }) => (
          <div
            key={album.id}
            className="bg-[#181818] p-2 flex items-center rounded-lg cursor-pointer"
            onClick={() => nav(`/playlist/${album.id}`)}
          >
            <img
              src={
                album.name === "Liked"
                  ? "http://localhost:3001/music/images/liked_playlist.png"
                  : "http://localhost:3001/music/images/test-image-1.jpg"
              }
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
