import React from 'react'
import '../global.scss'
import { PageComponent } from '../service-component'

const IMedicalPage = () => {
  return (
    <PageComponent
      section="E-healthcare"
      signalRURL="SendMedicalEmergencyNotification"
    />
  )
}

export default IMedicalPage
