import React, { FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { url } from 'app-constants/Route'
import { isLogged } from 'app-constants'
import DataWrapper from 'utils/wrapper/data-wrapper'

interface IProps {
  path?: string | string[] | undefined
}

const AuthRoute: FC<IProps> = () => {
  if (!isLogged) {
    return <Navigate to={{ pathname: url.LANDING_PAGE }} replace />
  }

  return (
    <DataWrapper>
      <Outlet />
    </DataWrapper>
  )
}

export default AuthRoute
