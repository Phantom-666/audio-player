import { PrismaClient } from "@prisma/client"

class PrismaDb {
  private prisma = new PrismaClient()

  async createUser(username: string) {
    const user = await this.prisma.user.create({
      data: { username },
    })

    await this.prisma.playlist.create({
      data: {
        name: "Liked",
        user: { connect: { id: user.id } },
      },
    })
  }

  async getUser(username: string) {
    return await this.prisma.user.findFirst({ where: { username } })
  }

  async createPlaylist(username: string, playlist: string) {
    const user = await this.prisma.user.findFirst({ where: { username } })

    if (!user) throw new Error("User not found")

    const newPlaylist = await this.prisma.playlist.create({
      data: {
        name: playlist,
        user: { connect: { id: user.id } },
      },
    })

    return newPlaylist
  }

  async getUserPlaylists(username: string) {
    const user = await this.getUser(username)

    if (!user) throw new Error("User not found")

    const playlists = await this.prisma.playlist.findMany({
      where: { userId: user?.id },
    })

    return playlists
  }

  async getSongs(username: string, playlistId: number) {
    const user = await this.getUser(username)

    if (!user) throw new Error("User not found")

    const playlist = await this.prisma.playlist.findFirst({
      where: { userId: user.id, id: playlistId },
    })

    if (!playlist) throw new Error("Playlist not found")

    const songs = await this.prisma.music.findMany({
      where: { playlistId: playlist?.id },
    })

    return songs
  }

  async likeSong(username: string, songName: string) {
    const user = await this.getUser(username)

    if (!user) throw new Error("User not found")

    const playlist = await this.prisma.playlist.findFirst({
      where: { userId: user.id, name: "Liked" },
    })

    if (!playlist) throw new Error("Playlist not found")

    const alreadyExists = await this.prisma.music.findFirst({
      where: { title: songName, playlistId: playlist.id },
    })

    if (alreadyExists) throw new Error("Song already exists")

    const song = await this.prisma.music.create({
      data: {
        artist: "None",
        title: songName,
        playlist: { connect: { id: playlist.id } },
      },
    })

    return song
  }

  async addOrRemoveToPlaylist(
    username: string,
    songName: string,
    playlistId: number
  ) {
    const user = await this.getUser(username)

    if (!user) throw new Error("User not found")

    // const playlist = await this.prisma.playlist.findFirst({
    //   where: { userId: user.id, name: playlistId },
    // })

    // if (!playlist) throw new Error("Playlist not found")

    const alreadyExists = await this.prisma.music.findFirst({
      where: { title: songName, playlistId: playlistId },
    })

    if (alreadyExists) {
      const song = await this.prisma.music.delete({
        where: { id: alreadyExists.id },
      })

      return song
    } else {
      const song = await this.prisma.music.create({
        data: {
          artist: "None",
          title: songName,
          playlist: { connect: { id: playlistId } },
        },
      })

      return song
    }
  }

  async unlikeSong(username: string, songName: string) {
    const user = await this.getUser(username)

    if (!user) throw new Error("User not found")

    const playlist = await this.prisma.playlist.findFirst({
      where: { userId: user.id, name: "Liked" },
    })

    if (!playlist) throw new Error("Playlist not found")

    const alreadyExists = await this.prisma.music.findFirst({
      where: { title: songName, playlistId: playlist.id },
    })

    if (!alreadyExists) throw new Error("Song not found")

    return await this.prisma.music.delete({
      where: { id: alreadyExists.id },
    })
  }

  async checkForLikes(username: string, playlist: string[]) {
    const user = await this.getUser(username)
    if (!user) throw new Error("User not found")

    const Liked = await this.prisma.playlist.findFirst({
      where: { userId: user.id, name: "Liked" },
    })

    const songs = await this.prisma.music.findMany({
      where: { playlistId: Liked?.id },
    })

    const result: { title: string; isLiked: boolean }[] = []

    for (let i = 0; i < playlist.length; ++i) {
      const songName = playlist[i]

      let isLiked = false

      for (let j = 0; j < songs.length; ++j) {
        if (songName === songs[j].title) {
          break
        }
      }

      result.push({ title: songName, isLiked })
    }

    const playlists = await this.prisma.playlist.findMany({
      where: { userId: user.id },
    })

    const music = []

    for (let i = 0; i < result.length; ++i) {
      const isInPlaylists = []

      for (let k = 0; k < playlists.length; ++k) {
        const songs = await this.prisma.music.findMany({
          where: { playlistId: playlists[k].id },
        })

        for (let j = 0; j < songs.length; ++j) {
          if (songs[j].title === result[i].title) {
            isInPlaylists.push(playlists[k].name)
          }
        }
      }

      music.push({ ...result[i], isInPlaylists })
    }

    return music
  }

  async getPlaylistName(playlist_id: number) {
    return (
      await this.prisma.playlist.findFirst({ where: { id: playlist_id } })
    )?.name
  }

  async deletePlaylist(username: string, playlistId: number) {
    const user = await this.getUser(username)

    if (!user) throw new Error("User not found")

    const songs = await this.prisma.music.deleteMany({
      where: { playlistId: playlistId },
    })

    const playlist = await this.prisma.playlist.delete({
      where: { userId: user.id, id: playlistId },
    })
  }
}

export default new PrismaDb()
