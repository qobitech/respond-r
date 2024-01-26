import { IPagination } from "./IOther"

export interface IRoleAction {
  name: string
  id: string
}
export interface IRoleActions extends IPagination {
  message: string
  isSuccessful: boolean
  statusCode: number
  data: IRoleAction[]
}

export interface ICreateAction {
  message: string
  isSuccessful: boolean
  statusCode: number
  data: {
    id: number
    name: string
    actionRoles: string
  }
}

export interface IActionsForRole {
  message: string
  isSuccessful: boolean
  statusCode: number
  data: string[]
}
