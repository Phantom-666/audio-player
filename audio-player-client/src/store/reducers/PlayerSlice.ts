import { createSlice } from "@reduxjs/toolkit"

interface PlayerState {
  audioRef: HTMLAudioElement | null
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  currentSong: string | null
  currentSongs: { title: string }[]
}

const initialState: PlayerState = {
  audioRef: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 100,
  currentSong: null,
  currentSongs: [],
}

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    togglePlaying: (state) => {
      state.isPlaying = !state.isPlaying
    },
    setAudioRef: (state, action) => {
      state.audioRef = action.payload
    },
    setCurrentTime: (state, action) => {
      state.currentTime = action.payload
    },
    setDuration: (state, action) => {
      state.duration = action.payload
    },
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload
    },
    setVolume: (state, action) => {
      state.volume = action.payload
    },
    setCurrentSong: (state, action) => {
      state.currentSong = action.payload
    },

    setCurrentSongs: (state, action) => {
      state.currentSongs = action.payload
    },
  },
})

export default playerSlice.reducer
