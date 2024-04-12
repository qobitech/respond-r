import React from "react"
import "../global.scss"
import { PageComponent } from "../components"

const IPolicePage = () => {
  return (
    <PageComponent
      section="E-police"
      signalRURL="SendPoliceEmergencyNotification"
      organization="Police"
    />
  )
}

export default IPolicePage
