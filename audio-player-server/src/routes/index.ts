import { Router } from "express"
import userContoller from "../controller/user.controller"

const router = Router()

router.post("/user/create", userContoller.createUser)
router.post("/user/get", userContoller.getUser)

router.post("/playlist/create", userContoller.createPlaylist)
router.get("/:username/playlists", userContoller.getUserPlaylists)
router.get("/find_music", userContoller.findMusic)
router.get("/songs", userContoller.getSongs)
router.post("/like_song", userContoller.likeSong)
router.post("/unlike_song", userContoller.unlikeSong)

router.get("/playlist/name", userContoller.getPlaylistName)
router.post("/add_to_playlist", userContoller.addToPlaylist)
router.post("/delete_from_playlist", userContoller.deleteFromPlaylist)

export default router
