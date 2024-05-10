import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import {
  AlertDialog,
  Button,
  Checkbox,
  Container,
  Flex,
  Text,
  TextField,
} from "@radix-ui/themes"
import React, { useState } from "react"
import PlaylistHeader from "./PlaylistHeader"
import { userAPI } from "../services/UserService"
import { useAppDispatch, useAppSelector } from "../hooks/redux"
import { playerSlice } from "../store/reducers/PlayerSlice"

export default function FindMusic({
  audioRef,
}: {
  audioRef: React.RefObject<HTMLAudioElement>
}) {
  const [musicByTemplate, setMusicByTemplate] = useState<
    { title: string; isLiked: boolean; isInPlaylists: string[] }[]
  >([])
  const [musicSearch, setMusicSearch] = useState("")
  const [fetchMusic] = userAPI.useFindMusicMutation()

  const findMusic = async () => {
    const res = await fetchMusic({ template: musicSearch, username })

    console.log("res", res)

    setMusicByTemplate(res.data.musics)
  }

  const dispatch = useAppDispatch()

  const { setCurrentSong, setDuration } = playerSlice.actions

  const loadMusic = (songName: string) => {
    const url = `http://localhost:3001/music/all_music/${songName}`

    if (!audioRef) {
      return console.log("no audio ref")
    }

    dispatch(setCurrentSong(songName))

    audioRef.current!.src = url
    audioRef.current!.onloadedmetadata = () => {
      dispatch(setDuration(audioRef.current!.duration))
    }
  }

  const { username } = useAppSelector((state) => state.userReducer)

  const [likeSongFetch] = userAPI.useLikeSongMutation()
  const [unlikeSongFetch] = userAPI.useUnlikeSongMutation()

  const [addToPlaylistFetch] = userAPI.useAddToPlaylistMutation()

  const likeMusic = async (songName: string) => {
    await likeSongFetch({ username, songName })

    setMusicByTemplate(
      musicByTemplate.map((song) =>
        song.title === songName ? { ...song, isLiked: true } : song
      )
    )
  }

  const unLikeMusic = async (songName: string) => {
    await unlikeSongFetch({ username, songName })

    setMusicByTemplate(
      musicByTemplate.map((song) =>
        song.title === songName ? { ...song, isLiked: false } : song
      )
    )
  }

  const addToPlaylist = async (songName: string, playlistId: number) => {
    const res = await addToPlaylistFetch({ songName, playlistId, username })

    console.log("res", res)
  }

  const p = userAPI.useGetPlaylistsQuery(username)

  return (
    <Container>
      <PlaylistHeader title="Find music" />
      <TextField.Root
        value={musicSearch}
        onChange={(e) => setMusicSearch(e.target.value)}
        placeholder="Search the music…"
      >
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
      </TextField.Root>

      <Button onClick={findMusic} style={{ marginTop: "10px" }}>
        Search
      </Button>
      <AlertDialog.Root>
        <section className="grid grid-cols-1 gap-4 mt-2">
          {musicByTemplate.map((song, i) => (
            <div
              key={i}
              className="bg-[#181818] p-2 flex items-center rounded-lg justify-between cursor-pointer"
              onClick={() => loadMusic(song.title)}
            >
              <div className="flex items-center">
                <img
                  src={"http://localhost:3001/music/images/test-image-1.jpg"}
                  alt={song.title}
                  className="h-[50px] w-[50px] object-cover rounded-lg"
                />
                <div className="ml-3">
                  <h3 className="text-white text-md">
                    {song.title.split(".")[0]}
                  </h3>
                </div>
              </div>
              <div className="flex items-center">
                <AlertDialog.Trigger>
                  <i className="fa fa-dot-circle-o text-white cursor-pointer hover:text-gray-600 mr-2"></i>
                </AlertDialog.Trigger>
                <i
                  onClick={(e) => {
                    e.stopPropagation()
                    if (song.isLiked) {
                      unLikeMusic(song.title)
                    } else {
                      likeMusic(song.title)
                    }
                  }}
                  className={
                    song.isLiked
                      ? "fa fa-heart text-red-600 text-xl cursor-pointer hover:text-gray-600"
                      : "fa fa-heart text-white text-xl cursor-pointer hover:text-red-600"
                  }
                ></i>
              </div>
              <AlertDialog.Content maxWidth="450px">
                <AlertDialog.Title>Add to</AlertDialog.Title>
                <AlertDialog.Description size="2">
                  {p.data?.playlists.map(
                    (album: { id: number; name: string }, i: number) =>
                      album.name !== "Liked" && (
                        <Text as="label" size="2" key={i}>
                          <Flex gap="2">
                            <Checkbox
                              defaultChecked={song.isInPlaylists.includes(
                                album.name
                              )}
                              onClick={() => {
                                addToPlaylist(song.title, album.id)
                              }}
                            />
                            {album.name}
                          </Flex>
                        </Text>
                      )
                  )}
                </AlertDialog.Description>

                <Flex gap="3" mt="4" justify="end">
                  <AlertDialog.Cancel>
                    <Button variant="soft" color="gray">
                      Close
                    </Button>
                  </AlertDialog.Cancel>
                  {/* <AlertDialog.Action>
                    <Button variant="solid" color="red">
                      Revoke access
                    </Button>
                  </AlertDialog.Action> */}
                </Flex>
              </AlertDialog.Content>
            </div>
          ))}
        </section>
      </AlertDialog.Root>
    </Container>
  )
}
