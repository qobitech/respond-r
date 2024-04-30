import React from "react"
import "../global.scss"
import { PageComponent } from "../components"

const IFireServicePage = () => {
  return (
    <PageComponent
      section="E-fire department"
      signalRURL="SendFireEmergencyNotification"
    />
  )
}

export default IFireServicePage
