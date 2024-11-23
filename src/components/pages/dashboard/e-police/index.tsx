import React from 'react'
import '../global.scss'
import { PageComponent } from '../service-component'

const IPolicePage = () => {
  return (
    <PageComponent
      section="E-police"
      signalRURL="SendPoliceEmergencyNotification"
    />
  )
}

export default IPolicePage
