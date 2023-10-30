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
