import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store/configureStore'
import './index.scss'
import * as serviceWorker from './serviceWorker'
import { HelmetProvider } from 'react-helmet-async'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from 'app'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <Provider store={store()}>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </Provider>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
