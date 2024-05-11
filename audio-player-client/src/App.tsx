import { useEffect, useRef } from "react"
import "./App.css"
import Player from "./components/Player"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import RoutesNav from "./components/RoutesNav/RoutesNav"
import { useAppDispatch, useAppSelector } from "./hooks/redux"
import Login from "./components/Login"
import Register from "./components/Register"
import { userSlice } from "./store/reducers/UserSlice"

function App() {
  const audioRef = useRef<HTMLAudioElement>(null)

  const { isAuth } = useAppSelector((state) => state.userReducer)
  const dispatch = useAppDispatch()

  const { loginAuth, setUsername } = userSlice.actions

  useEffect(() => {
    const username = localStorage.getItem("username")

    if (username) {
      dispatch(setUsername(username))
      dispatch(loginAuth())
    }
  }, [])

  return (
    <Router>
      {isAuth ? (
        <div className="bg-[#121212] w-full min-h-screen font-roboto p-4">
          <RoutesNav audioRef={audioRef} />
          <Player audioRef={audioRef} />
        </div>
      ) : (
        <div className="bg-[#121212] w-full min-h-screen font-roboto p-4 text-white">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      )}
    </Router>
  )
}

export default App
