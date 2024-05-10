import { Routes, Route } from "react-router-dom"
import Playlists from "../Playlists"
import Playlist from "../Playlist"
import FindMusic from "../FindMusic"
import CreatePlaylist from "../CreatePlaylist"

export default function RoutesNav({
  audioRef,
}: {
  audioRef: React.RefObject<HTMLAudioElement>
}) {
  return (
    <>
      <Routes>
        <Route path="/" element={<Playlists />} />
        <Route
          path="/playlist/:id"
          element={<Playlist audioRef={audioRef} />}
        />
        <Route path="/find_music" element={<FindMusic audioRef={audioRef} />} />
        <Route path="/create_playlist" element={<CreatePlaylist />} />
      </Routes>
    </>
  )
}
