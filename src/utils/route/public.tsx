import React, { FC } from "react"
import { Navigate } from "react-router-dom"
import { url } from "enums/Route"
import { isLogged } from "utils/new/constants"
import DataWrapper from "utils/new/wrapper/data-wrapper"

interface IProps {
  element: React.ElementType
  path?: string | string[] | undefined
}

const PublicRoute: FC<IProps> = ({ element: Component }) => {
  if (isLogged) {
    return <Navigate to={{ pathname: url.OVERVIEW }} replace />
  }

  return (
    <DataWrapper>
      <Component />
    </DataWrapper>
  )
}

export default PublicRoute
