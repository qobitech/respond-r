import React from "react"
import "../global.scss"
import { PageComponent } from "../components"

const IMedicalPage = () => {
  return (
    <PageComponent
      section="E-healthcare"
      signalRURL="SendMedicalEmergencyNotification"
      organization="Medical"
    />
  )
}

export default IMedicalPage
