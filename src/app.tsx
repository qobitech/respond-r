import React, { Suspense } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./index.scss"
import AuthRoute from "utils/route/auth"
import { url } from "enums/Route"
import Overview from "components/dashboard/overview"

const App = () => (
  <Router>
    <Suspense fallback={<></>}>
      {/* <RouteList /> */}
      <Routes>
        <Route path={url.OVERVIEW} element={<AuthRoute element={Overview} />} />
      </Routes>
    </Suspense>
  </Router>
)

export default App
