import React, { FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { getOverview } from 'app-constants/Route'
import { isLogged } from 'app-constants'
import DataWrapper from 'utils/wrapper/data-wrapper'

interface IProps {
  path?: string | string[] | undefined
}

const PublicRoute: FC<IProps> = () => {
  if (isLogged) {
    return <Navigate to={{ pathname: getOverview() }} replace />
  }

  return (
    <DataWrapper>
      <Outlet />
    </DataWrapper>
  )
}

export default PublicRoute
