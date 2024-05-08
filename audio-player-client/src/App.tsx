import { useRef, useState } from "react"
import "./App.css"
import Player from "./components/Player"
import { BrowserRouter as Router } from "react-router-dom"
import RoutesNav from "./components/RoutesNav/RoutesNav"

// TODO: add redux

function App() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  const audioRef = useRef<HTMLAudioElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      const url = URL.createObjectURL(file)

      audioRef.current!.src = url
      audioRef.current!.onloadedmetadata = () => {
        setDuration(audioRef.current!.duration)
      }
    }
  }

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current!.pause()
    } else {
      audioRef.current!.play()
    }

    setIsPlaying(!isPlaying)
  }

  const formatTime = (time: number) => {
    const min = Math.floor(time / 60)
    const sec = Math.floor(time % 60)

    return `${min}:${sec.toString().padStart(2, "0")}`
  }

  const updateTime = () => {
    setCurrentTime(audioRef.current!.currentTime)
  }

  const loadMusic = () => {
    const url = `http://localhost:3001/music/test1.mp3`

    audioRef.current!.src = url
    audioRef.current!.onloadedmetadata = () => {
      setDuration(audioRef.current!.duration)
    }
  }
  const handleAudioEnded = () => {
    setIsPlaying(false)
  }
  //

  return (
    <Router>
      <div className="bg-[#121212] w-full min-h-screen font-roboto p-4">
        <RoutesNav />
        <Player />
      </div>
    </Router>
  )

  // return (
  //   <div className="App">
  //     <button onClick={loadMusic}>Load music</button>
  //     <input type="file" accept="audio/*" onChange={handleFileChange} />
  //     <audio
  //       ref={audioRef}
  //       onTimeUpdate={updateTime}
  //       onEnded={handleAudioEnded}
  //     />
  //     <div className="controls">
  //       <button onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</button>
  //       <span>{formatTime(currentTime)}</span>
  //       <input
  //         type="range"
  //         value={currentTime}
  //         max={duration}
  //         onChange={(e) => {
  //           audioRef.current!.currentTime = Number(e.target.value)
  //         }}
  //       />
  //       <span>{formatTime(duration)}</span>
  //     </div>
  //   </div>
  // )
}

export default App
