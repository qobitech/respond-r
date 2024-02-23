import React from "react"
import { IStates } from "interfaces/IReducer"
import "../global.scss"
import { IAction } from "interfaces/IAction"
import { PageComponent } from "../components"

interface IProps {
  states: IStates
}

const IPolicePage: React.FC<IProps> = ({ states, ...props }) => {
  const actions = props as unknown as IAction

  return (
    <PageComponent
      actions={actions}
      section="E-police"
      signalRURL="SendPoliceEmergencyNotification"
      states={states}
      organization="Police"
    />
  )
}

export default IPolicePage
