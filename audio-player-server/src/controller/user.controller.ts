import { Request, Response } from "express"
import db from "../db/db"
import fs from "fs/promises"
import path from "path"

const createUser = async (req: Request, res: Response) => {
  const { username } = req.body

  await db.createUser(username)

  res.status(200).json({ status: "Success" })
}

const getUser = async (req: Request, res: Response) => {
  const { username } = req.body

  const user = await db.getUser(username)

  res.status(200).json(user)
}

const createPlaylist = async (req: Request, res: Response) => {
  const { username, playlist } = req.body

  const createdPlaylist = await db.createPlaylist(username, playlist)
  res.status(200).json({ status: "Success", createdPlaylist })
}

const getUserPlaylists = async (req: Request, res: Response) => {
  const { username } = req.params

  const playlists = await db.getUserPlaylists(username)

  res.status(200).json({ playlists })
}

const findMusic = async (req: Request, res: Response) => {
  const template = req.query._template as string
  const username = req.query._username as string

  if (!template) throw new Error("template is required")

  const musicPath = path.resolve(__dirname, "..", "..", "music", "all_music")

  const files = await fs.readdir(musicPath)

  const sorted = files.filter((file) => file.includes(template))

  const musics = await db.checkForLikes(username, sorted)

  res.status(200).json({ musics })
}

const getSongs = async (req: Request, res: Response) => {
  const username = req.query._username as string
  const playlist = req.query._playlist as string

  const songs = await db.getSongs(username, Number(playlist))

  const result: {
    id: number
    title: string
    artist: string
    playlistId: number
    isLiked: boolean
  }[] = []
  songs.map((song) => {
    result.push({ ...song, isLiked: true })
  })

  res.status(200).json({ songs: result })
}

const likeSong = async (req: Request, res: Response) => {
  try {
    const { username, songName } = req.body

    const song = await db.likeSong(username, songName)

    res.status(200).json({ status: "Success", song })
  } catch (error: any) {
    res.status(400).json({ status: error.message })
  }
}

const unlikeSong = async (req: Request, res: Response) => {
  try {
    const { username, songName } = req.body

    const song = await db.unlikeSong(username, songName)

    res.status(200).json({ status: "Success", song })
  } catch (error: any) {
    res.status(400).json({ status: error.message })
  }
}

const getPlaylistName = async (req: Request, res: Response) => {
  const playlist_id = req.query._playlist_id as string

  const name = await db.getPlaylistName(Number(playlist_id))

  res.status(200).json(name)
}

const addToPlaylist = async (req: Request, res: Response) => {
  const { songName, playlistId, username } = req.body

  const song = await db.addOrRemoveToPlaylist(username, songName, playlistId)

  res.status(200).json({ status: "Success", song })
}

const deleteFromPlaylist = async (req: Request, res: Response) => {
  const { songName, playlistId, username } = req.body

  const song = await db.addOrRemoveToPlaylist(username, songName, playlistId)

  res.status(200).json({ status: "Success", song })
}

const deletePlaylist = async (req: Request, res: Response) => {
  const { playlistId, username } = req.body

  await db.deletePlaylist(username, Number(playlistId))

  res.status(200).json({ status: "Success" })
}

export default {
  createUser,
  getUser,
  createPlaylist,
  getUserPlaylists,
  findMusic,
  getSongs,
  likeSong,
  unlikeSong,
  addToPlaylist,
  getPlaylistName,
  deleteFromPlaylist,
  deletePlaylist,
}
