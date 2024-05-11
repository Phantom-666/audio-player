import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { IUser, IUserResponse } from "../models/IUser"

const REACT_APP_API_URL = "http://localhost:3001/api"

export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({ baseUrl: REACT_APP_API_URL }),
  tagTypes: ["User", "Playlist", "Songs"],
  endpoints: (builder) => ({
    getPlaylists: builder.query({
      query: (user_id: string) => ({
        url: `/${user_id}/playlists`,
        method: "GET",
      }),

      providesTags: ["Playlist"],
    }),

    getPlaylistName: builder.query({
      query: (playlist_id: string) => ({
        url: `/playlist/name`,
        method: "GET",
        params: { _playlist_id: playlist_id },
      }),
    }),

    fetchSongs: builder.query({
      query: (body: { username: string; playlist: string }) => ({
        url: `/songs`,
        method: "GET",
        params: {
          _username: body.username,
          _playlist: body.playlist,
        },
      }),

      providesTags: ["Songs"],
    }),

    findMusic: builder.mutation({
      query: ({
        template,
        username,
      }: {
        template: string
        username: string
      }) => ({
        url: `/find_music`,
        params: {
          _template: template,
          _username: username,
        },
      }),
    }),

    getUser: builder.mutation<IUser, IUser>({
      query: (user) => ({ url: "/user/get", method: "POST", body: user }),
      invalidatesTags: ["User"],
    }),

    createUser: builder.mutation<IUserResponse, IUser>({
      query: (user) => ({
        url: "/user/create",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),

    createPlaylist: builder.mutation({
      query: (playlist) => ({
        url: "/playlist/create",
        method: "POST",
        body: playlist,
      }),
      invalidatesTags: ["Playlist"],
    }),

    likeSong: builder.mutation({
      query: (song) => ({
        url: "/like_song",
        method: "POST",
        body: song,
      }),
      invalidatesTags: ["Songs"],
    }),

    unlikeSong: builder.mutation({
      query: (song) => ({
        url: "/unlike_song",
        method: "POST",
        body: song,
      }),
      invalidatesTags: ["Songs"],
    }),

    addToPlaylist: builder.mutation({
      query: (song) => ({
        url: "/add_to_playlist",
        method: "POST",
        body: song,
      }),
      invalidatesTags: ["Songs"],
    }),

    deleteFromPlaylist: builder.mutation({
      query: (song) => ({
        url: "/delete_from_playlist",
        method: "POST",
        body: song,
      }),
      invalidatesTags: ["Songs"],
    }),

    deletePlaylist: builder.mutation({
      query: (playlist) => ({
        url: "/playlist/delete",
        method: "POST",
        body: playlist,
      }),
      invalidatesTags: ["Playlist"],
    }),
  }),
})
