import React, { Suspense } from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter as Router } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./store/configureStore"
import loader from "./extras/images/loader/loader.svg"
import RouteList from "./routes"
import "./index.scss"
import * as serviceWorker from "./serviceWorker"
import { HelmetProvider } from "react-helmet-async"
import "leaflet/dist/leaflet.css"
import "bootstrap/dist/css/bootstrap.min.css"

const Routes = () => (
  <Router>
    <Suspense
      fallback={
        <div className="loader-container">
          <img src={loader} alt="loader icon" />
        </div>
      }
    >
      <RouteList />
    </Suspense>
  </Router>
)

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

root.render(
  <Provider store={store()}>
    <HelmetProvider>
      <Routes />
    </HelmetProvider>
  </Provider>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
