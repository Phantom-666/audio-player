import { Button, Container, TextField } from "@radix-ui/themes"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { userAPI } from "../services/UserService"
import { userSlice } from "../store/reducers/UserSlice"
import { useAppDispatch } from "../hooks/redux"

export default function Login() {
  const [loginInput, setLoginInput] = useState("")
  const nav = useNavigate()

  const { loginAuth, setUsername } = userSlice.actions

  const dispatch = useAppDispatch()

  const [getUser] = userAPI.useGetUserMutation()

  const loginHandle = async () => {
    const user = await getUser({ username: loginInput })

    if (user.data) {
      dispatch(setUsername(loginInput))
      dispatch(loginAuth())
    }
  }

  return (
    <Container size="1">
      <TextField.Root
        value={loginInput}
        onChange={(e) => setLoginInput(e.target.value)}
        placeholder="Username"
      >
        <TextField.Slot></TextField.Slot>
      </TextField.Root>
      <Button onClick={loginHandle} style={{ marginTop: "10px" }}>
        Login
      </Button>
      <Button
        onClick={() => nav("/register")}
        style={{ marginTop: "10px", marginLeft: "10px" }}
      >
        Register
      </Button>
    </Container>
  )
}
