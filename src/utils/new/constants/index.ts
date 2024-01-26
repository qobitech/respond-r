import { IToken } from "interfaces/IAuth"
import jwtDecode from "jwt-decode"

export const TOKENKEY = "respondr-token"

export const TOKEN = localStorage.getItem(TOKENKEY)

export const getUserToken = () => {
  const token: IToken = TOKEN ? jwtDecode(TOKEN) : ({} as IToken)
  return token
}

export const USERTOKEN = getUserToken()

export const isLogged = USERTOKEN?.exp
  ? !(USERTOKEN?.exp * 1000 < Date.now())
  : false

// export enum userRoles {
//   ADMIN = "Administrator",
//   REVIEWER = "Reviewer",
//   DATAENTRY = "Data Entry",
// }

// export const ISADMIN = userData.token.role === userRoles.ADMIN
// export const ISREVIEWER = userData.token.role === userRoles.REVIEWER
// export const ISDATAENTRY = userData.token.role === userRoles.DATAENTRY

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

export const organizationIdEnums = {
  RESPONDR: 1,
  FIREFIGHTER: 2,
  EPOLICE: 3,
  AMBULANCE: 4,
  ETRAFFIC: 5,
} as const

export const getOrgName = (data: organizationIdEnumsType) => {
  switch (data) {
    case 1:
      return organizationEnums.RESPONDR
    case 2:
      return organizationEnums.FIREFIGHTER
    case 3:
      return organizationEnums.EPOLICE
    case 4:
      return organizationEnums.AMBULANCE
    case 5:
      return organizationEnums.ETRAFFIC
    default:
      return "not found"
  }
}

export const getOrgId = (data: organizationEnumsType) => {
  switch (data) {
    case "ambulance":
      return organizationIdEnums.AMBULANCE
    case "e-police":
      return organizationIdEnums.EPOLICE
    case "e-traffic":
      return organizationIdEnums.ETRAFFIC
    case "firefighter":
      return organizationIdEnums.FIREFIGHTER
    case "respondR":
      return organizationIdEnums.RESPONDR
    default:
      return ""
  }
}

export type organizationIdEnumsType =
  (typeof organizationIdEnums)[keyof typeof organizationIdEnums]

export const roleEnums = {
  RESPONDR: "respondR-admin",
  SUPERADMIN: "super-admin",
  ADMIN: "admin",
  MODERATOR: "moderator",
  FIELDOFFICER: "field-officer",
} as const

export const roleIdEnums = {
  RESPONDR: 1,
  SUPERADMIN: 2,
  ADMIN: 3,
  MODERATOR: 4,
  FIELDOFFICER: 5,
} as const

export type roleType = (typeof roleEnums)[keyof typeof roleEnums]

export const getRoleId = (data: roleType) => {
  switch (data) {
    case "respondR-admin":
      return roleIdEnums.RESPONDR
    case "super-admin":
      return roleIdEnums.SUPERADMIN
    case "admin":
      return roleIdEnums.ADMIN
    case "moderator":
      return roleIdEnums.MODERATOR
    case "field-officer":
      return roleIdEnums.FIELDOFFICER
    default:
      return ""
  }
}

export const ROLE: roleType = "respondR-admin"
export const ORGANIZATION: organizationEnumsType = "respondR"
