import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import "font-awesome/css/font-awesome.min.css"
import { Provider } from "react-redux"
import { setupStore } from "./store"
import "@radix-ui/themes/styles.css"
import { Theme } from "@radix-ui/themes"

// TODO: load your music
// TODO: next song
// TODO: remove playlist

const store = setupStore()

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Theme>
        <App />
      </Theme>
    </Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
