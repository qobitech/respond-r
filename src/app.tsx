import { Suspense } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import AuthRoute from 'route/auth'
import PublicRoute from 'route/public'

import { url } from 'app-constants/Route'
import LandingPage from 'components/pages/public/landing'
import { PulseSVG } from 'utils/svgs'
import Overview from 'components/pages/dashboard/traffic'
import IFireServicePage from 'components/pages/dashboard/fire-service'
import IMedicalPage from 'components/pages/dashboard/e-medical'
import IPolicePage from 'components/pages/dashboard/e-police'
import AdminManagement from 'components/pages/dashboard/admin-management'
import Login from 'components/pages/auth/login'

const App = () => {
  return (
    <Router basename={import.meta.env.VITE_PUBLIC_URL}>
      <Suspense
        fallback={
          <div
            style={{ width: '100%', height: '100vh' }}
            className="f-column text-center align-items-center"
          >
            <PulseSVG />
          </div>
        }
      >
        <Routes>
          <Route path="/dashboard" element={<AuthRoute />}>
            <Route path={url.TRAFFIC} element={<Overview />} />
            <Route path={url.FIRESERVICE} element={<IFireServicePage />} />
            <Route path={url.MEDICAL} element={<IMedicalPage />} />
            <Route path={url.POLICE} element={<IPolicePage />} />
            <Route
              path={`${url.MANAGEMENT}/:pageTab`}
              element={<AdminManagement />}
            />
          </Route>
          <Route path="/" element={<PublicRoute />}>
            <Route path={url.LANDING_PAGE} element={<LandingPage />} />
            <Route path={url.LOGIN} element={<Login />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
