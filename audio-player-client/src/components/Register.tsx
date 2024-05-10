import { Button, Container, TextField } from "@radix-ui/themes"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { userAPI } from "../services/UserService"

export default function Register() {
  const [userInput, setUserInput] = useState("")

  const [createUser, { error }] = userAPI.useCreateUserMutation()

  const nav = useNavigate()
  const register = async () => {
    if (userInput.length === 0) return

    createUser({ username: userInput })

    nav("/")
  }

  return (
    <Container size="1">
      <TextField.Root
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Username"
      >
        <TextField.Slot></TextField.Slot>
      </TextField.Root>
      <Button onClick={register} style={{ marginTop: "10px" }}>
        Register
      </Button>
      <Button
        onClick={() => nav("/")}
        style={{ marginTop: "10px", marginLeft: "10px" }}
      >
        Login
      </Button>
    </Container>
  )
}
