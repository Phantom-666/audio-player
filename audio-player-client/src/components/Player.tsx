import { useAppDispatch, useAppSelector } from "../hooks/redux"
import { playerSlice } from "../store/reducers/PlayerSlice"

export default function Player({
  audioRef,
}: {
  audioRef: React.RefObject<HTMLAudioElement>
}) {
  const { isPlaying, currentTime, duration, volume, currentSong } =
    useAppSelector((state) => state.playerReducer)

  const dispatch = useAppDispatch()

  const { togglePlaying, setCurrentTime, setIsPlaying, setVolume } =
    playerSlice.actions

  const togglePlay = () => {
    if (!currentSong) return

    if (isPlaying) {
      audioRef.current!.pause()
    } else {
      audioRef.current!.play()
    }

    dispatch(togglePlaying())
  }

  const updateTime = () => {
    dispatch(setCurrentTime(audioRef.current!.currentTime))
  }
  const handleAudioEnded = () => {
    dispatch(setIsPlaying(false))
  }

  const formatTime = (time: number) => {
    const min = Math.floor(time / 60)
    const sec = Math.floor(time % 60)

    return `${min}:${sec.toString().padStart(2, "0")}`
  }

  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#181818] p-2 flex justify-between items-center">
      <div>
        <i
          onClick={togglePlay}
          className={`fa text-white text-xl cursor-pointer ${
            isPlaying ? "fa-pause" : "fa-play"
          }`}
        ></i>
      </div>
      <div className="flex justify-center w-full">
        <audio
          ref={audioRef}
          onTimeUpdate={updateTime}
          onEnded={handleAudioEnded}
        />

        <div>
          <p className="text-white">
            {formatTime(currentTime)}
            {currentSong ? ` Now Playing: ${currentSong} ` : " Choose a Song "}
            {formatTime(duration)}
          </p>
        </div>
      </div>
      <div className="mr-2">
        <i className="fa fa-forward text-white text-xl"></i>
      </div>

      <input
        type="range"
        className="w-full mr-2"
        max={duration}
        value={currentTime}
        onChange={(e) =>
          (audioRef.current!.currentTime = Number(e.target.value))
        }
      />

      <input
        type="range"
        className="appearance-none w-2/12 h-1 bg-gray-300 rounded-lg overflow-hidden focus:outline-none"
        min="0"
        max="100"
        value={volume}
        onChange={(e) => {
          audioRef.current!.volume = Number(e.target.value) / 100
          dispatch(setVolume(Number(e.target.value)))
        }}
      />
    </div>
  )
}
