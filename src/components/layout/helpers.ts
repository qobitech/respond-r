import { IStates } from 'interfaces/IReducer'
import { ReactNode } from 'react'

export interface PageProps {
  children: ReactNode
  states?: IStates
}

export const getActionRoles = () => {
  const actionRoles = localStorage.getItem('actionRoles')
  if (actionRoles) return JSON.parse(actionRoles) as string[]
  return []
}

export const storeActionRoles = (actionsRoles: string[] | undefined) => {
  if (!actionsRoles?.length) return
  if (!getActionRoles().length) {
    localStorage.setItem('actionRoles', JSON.stringify(actionsRoles))
  }
}

export const clearActionRoles = () => {
  localStorage.removeItem('actionRoles')
}
