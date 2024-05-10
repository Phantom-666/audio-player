import { createSlice } from "@reduxjs/toolkit"

interface UserState {
  isAuth: boolean
  username: string
}
const initialState: UserState = {
  isAuth: false,
  username: "",
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload
      localStorage.setItem("username", action.payload)
    },
    loginAuth: (state) => {
      state.isAuth = true
    },

    logoutAuth: (state) => {
      state.isAuth = false
      state.username = ""
    },
  },
})

export default userSlice.reducer
