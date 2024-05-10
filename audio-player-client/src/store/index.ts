import { combineReducers, configureStore } from "@reduxjs/toolkit"
import playerReducer from "./reducers/PlayerSlice"
import userReducer from "./reducers/UserSlice"
// import { userAPI } from "../services/UserService"
import { userAPI } from "../services/UserService"

const rootReducer = combineReducers({
  playerReducer,
  userReducer,
  [userAPI.reducerPath]: userAPI.reducer,
})

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(userAPI.middleware),
  })

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore["dispatch"]
