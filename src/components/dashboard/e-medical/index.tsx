import React from "react"
import { IStates } from "interfaces/IReducer"
import "../global.scss"
import { IAction } from "interfaces/IAction"
import { PageComponent } from "../components"

interface IProps {
  states: IStates
}

const IMedicalPage: React.FC<IProps> = ({ states, ...props }) => {
  const actions = props as unknown as IAction

  return (
    <PageComponent
      actions={actions}
      states={states}
      section="E-healthcare"
      signalRURL="SendMedicalEmergencyNotification"
      organization="Medical"
    />
  )
}

export default IMedicalPage
