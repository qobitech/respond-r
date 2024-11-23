import React from 'react'
import '../global.scss'
import { PageComponent } from '../service-component'

const IFireServicePage = () => {
  return (
    <PageComponent
      section="E-fire department"
      signalRURL="SendFireEmergencyNotification"
    />
  )
}

export default IFireServicePage
