import { useAppDispatch, useAppSelector } from "../hooks/redux"
import { playerSlice } from "../store/reducers/PlayerSlice"
import PlaylistHeader from "./PlaylistHeader"
import { userAPI } from "../services/UserService"
import { useLocation } from "react-router-dom"

export default function Playlist({
  audioRef,
}: {
  audioRef: React.RefObject<HTMLAudioElement>
}) {
  const { username } = useAppSelector((state) => state.userReducer)
  const location = useLocation()
  const playlistId = location.pathname.split("/playlist/")[1]

  const playlistName = userAPI.useGetPlaylistNameQuery(playlistId)
  const dispatch = useAppDispatch()
  const { setDuration, setCurrentSong, setCurrentSongs } = playerSlice.actions

  const { data } = userAPI.useFetchSongsQuery({
    username,
    playlist: playlistId,
  })

  if (data) {
    if (data.songs)
      if (data.songs.length !== 0) dispatch(setCurrentSongs(data.songs))
  }

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

  const [likeSongFetch] = userAPI.useLikeSongMutation()
  const [unlikeSongFetch] = userAPI.useUnlikeSongMutation()

  const [deleteFromPlaylistFetch] = userAPI.useDeleteFromPlaylistMutation()

  const likeMusic = async (songName: string) => {
    await likeSongFetch({ username, songName })
  }

  const unLikeMusic = async (songName: string) => {
    await unlikeSongFetch({ username, songName })
  }

  const deleteFromPlaylist = async (songName: string, playlistId: number) => {
    const res = await deleteFromPlaylistFetch({
      songName,
      playlistId,
      username,
    })

    console.log("res", res)
  }

  return (
    <>
      <PlaylistHeader title={playlistName.data} />

      <section className="grid grid-cols-1 gap-4 mt-2">
        {data &&
          data.songs.map(
            (
              song: {
                id: number
                artist: string
                title: string
                isLiked: boolean
              },
              i: number
            ) => (
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
                {playlistName.data === "Liked" ? (
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
                        ? "fa fa-heart text-red-600 text-xl cursor-pointer mr-2 hover:text-gray-600"
                        : "fa fa-heart text-white text-xl cursor-pointer mr-2 hover:text-red-600"
                    }
                  ></i>
                ) : (
                  <i
                    onClick={(e) => {
                      e.stopPropagation()

                      deleteFromPlaylist(song.title, Number(playlistId))
                    }}
                    className="fa fa-times mr-2 text-white text-xl cursor-pointer hover:text-gray-600"
                  ></i>
                )}
              </div>
            )
          )}
      </section>
    </>
  )
}
