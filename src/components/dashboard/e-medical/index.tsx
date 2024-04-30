import React from "react"
import "../global.scss"
import { PageComponent } from "../components"

const IMedicalPage = () => {
  return (
    <PageComponent
      section="E-healthcare"
      signalRURL="SendMedicalEmergencyNotification"
    />
  )
}

export default IMedicalPage
