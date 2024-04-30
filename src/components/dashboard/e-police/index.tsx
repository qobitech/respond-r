import React from "react"
import "../global.scss"
import { PageComponent } from "../components"

const IPolicePage = () => {
  return (
    <PageComponent
      section="E-police"
      signalRURL="SendPoliceEmergencyNotification"
    />
  )
}

export default IPolicePage
