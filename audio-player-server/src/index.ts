import express from "express"
import path from "path"

const PORT = process.env.PORT || 3001

const run = () => {
  const app = express()

  const musicDirectory = path.join(__dirname, "..", "music")

  app.use("/music", express.static(musicDirectory))

  app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
}

run()
