import { Button, Callout, Container, TextField } from "@radix-ui/themes"
import PlaylistHeader from "./PlaylistHeader"
import { useState } from "react"
import { userAPI } from "../services/UserService"
import { useAppSelector } from "../hooks/redux"
import { InfoCircledIcon } from "@radix-ui/react-icons"

export default function CreatePlaylist() {
  const [playlistTitle, setPlaylistTitle] = useState("")

  const { username } = useAppSelector((state) => state.userReducer)

  const [response, setResponse] = useState(null)

  const [createPlaylist] = userAPI.useCreatePlaylistMutation()

  const createPlaylistHandle = async () => {
    if (playlistTitle.length > 0) {
      const res = await createPlaylist({ username, playlist: playlistTitle })

      console.log("res", res.data)

      setResponse(res.data.status)
    }
  }

  return (
    <>
      <PlaylistHeader title="Create Playlist" />

      <Container size="1">
        <TextField.Root
          value={playlistTitle}
          onChange={(e) => setPlaylistTitle(e.target.value)}
          placeholder="Playlist Name"
        >
          <TextField.Slot></TextField.Slot>
        </TextField.Root>
        <Button onClick={createPlaylistHandle} style={{ marginTop: "10px" }}>
          Create
        </Button>
        {response && (
          <Callout.Root style={{ marginTop: "10px" }} color="green">
            <Callout.Icon>
              <InfoCircledIcon />
            </Callout.Icon>
            <Callout.Text>{response}</Callout.Text>
          </Callout.Root>
        )}
      </Container>
    </>
  )
}
