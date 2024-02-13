import { IToken } from "interfaces/IAuth"
import jwtDecode from "jwt-decode"

export const TOKENKEY = "respondr-token"

export const TOKEN = localStorage.getItem(TOKENKEY)

export const getUserToken = () => {
  const token: IToken = TOKEN ? jwtDecode(TOKEN) : ({} as IToken)
  return token
}

const defaulttoken = {
  UserId: "dfvwcwcwewcewcewc",
  Organisation: "respondR",
  Username: "qobi",
  Email: "frank@respond-r.com",
  PhoneNumber: "+2348063457529",
  Role: "respondR-admin",
  nbf: 2342342442342,
  exp: 2342343243243,
  iat: 24234324324324,
}

// export const USERTOKEN = getUserToken()
export const USERTOKEN = defaulttoken

export const isLogged = true
// export const isLogged = USERTOKEN?.exp
//   ? !(USERTOKEN?.exp * 1000 < Date.now())
//   : false

export const PAGE_SIZE = 20

export const PRIMARY_COLOR = "#202A3A"
export const PRIMARY_COLOR_LIGHT = "#06679E"
export const HEADER_COLOR = "#235A62"
export const LABEL_COLOR = "#235A62"
export const PLACEHOLDER_COLOR = "#949494"
export const TEXT_COLOR = "#202A3A"
export const TEXT_COLOR_LIGHT = "#485E82"
export const TEXT_COLOR_INVALID = "#F56E9D"
export const TEXT_COLOR_SUCCESS = "#0F9979"

export const organizationEnums = {
  RESPONDR: "respondR",
  FIREFIGHTER: "firefighter",
  EPOLICE: "e-police",
  AMBULANCE: "ambulance",
  ETRAFFIC: "e-traffic",
} as const

export type organizationEnumsType =
  (typeof organizationEnums)[keyof typeof organizationEnums]

export const ROLE = USERTOKEN.Role
export const ORGANIZATION = USERTOKEN.Organisation

export const ISSUPERADMIN = ROLE?.includes("super-admin") || false
