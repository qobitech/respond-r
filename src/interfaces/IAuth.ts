import { organizationEnumsType } from "utils/new/constants"

export interface IToken {
  UserId: string
  Organisation: organizationEnumsType
  Username: string
  Email: string
  PhoneNumber: string
  Role: string
  nbf: number
  exp: number
  iat: number
}

export interface ILoginResponse {
  isSuccessful: boolean
  message: string
  statusCode: number
  token: string
}
