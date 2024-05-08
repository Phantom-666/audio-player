import { Routes, Route } from "react-router-dom"
import Playlists from "../Playlists"
import Playlist from "../Playlist"

export default function RoutesNav() {
  return (
    <>
      (
      <Routes>
        <Route path="/" element={<Playlists />} />
        <Route path="/playlist/:id" element={<Playlist />} />
      </Routes>
      )
    </>
  )
}
