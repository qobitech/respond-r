import React from "react"
import "./index.scss"
import "../../../utils/new/pagination.scss"
import "../../../utils/new/page.scss"
import { IStates } from "interfaces/IReducer"

interface IProps {
  states?: IStates
}

const UserProfile: React.FC<IProps> = ({ states, ...props }) => {
  return (
    <div className="main-page">
      <div className="pg-container"></div>
    </div>
  )
}

export default UserProfile
