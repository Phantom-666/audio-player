import express from "express"
import path from "path"
import routes from "./routes"
import cors from "cors"

const PORT = process.env.PORT || 3001

const run = () => {
  const app = express()
  app.use(cors())

  const musicDirectory = path.join(__dirname, "..", "music")

  app.use(express.json())
  app.use("/music", express.static(musicDirectory))

  app.use("/api", routes)

  app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
}

run()
