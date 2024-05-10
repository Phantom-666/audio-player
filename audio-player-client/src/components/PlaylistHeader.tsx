import { useNavigate } from "react-router-dom"
import { userSlice } from "../store/reducers/UserSlice"
import { useAppDispatch } from "../hooks/redux"
import { playerSlice } from "../store/reducers/PlayerSlice"

export default function PlaylistHeader({ title }: { title: string }) {
  const nav = useNavigate()

  const { logoutAuth } = userSlice.actions
  const dispatch = useAppDispatch()

  const { setCurrentSong, setIsPlaying, setCurrentTime, setDuration } =
    playerSlice.actions

  return (
    <header className="flex justify-between items-center mb-6">
      <h1 className="text-white text-xl">
        <i
          className="fa fa-arrow-left text-white text-xl cursor-pointer"
          onClick={() => nav("/")}
        ></i>
        <span className="ml-1">{title}</span>
      </h1>
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
            nav("/")
          }}
        ></i>
      </div>
    </header>
  )
}
