import { IToken } from 'interfaces/IAuth'
import jwtDecode from 'jwt-decode'

export const TOKENKEY = 'respondr-token'

export const TOKEN = localStorage.getItem(TOKENKEY)

export const getUserToken = () => {
  const token: IToken = TOKEN ? jwtDecode(TOKEN) : ({} as IToken)
  return token
}

const defaulttoken = {
  UserId: 'dfvwcwcwewcewcewc',
  Organisation: 'respondR',
  Username: 'qobi',
  Email: 'frank@respond-r.com',
  PhoneNumber: '+2348063457529',
  Role: 'respondR-admin',
  nbf: 2342342442342,
  exp: 2342343243243,
  iat: 24234324324324
}

// export const USERTOKEN = getUserToken();
export const USERTOKEN = defaulttoken

export const isLogged = true
// export const isLogged = USERTOKEN?.exp
//   ? !(USERTOKEN?.exp * 1000 < Date.now())
//   : false

export const PAGE_SIZE = 20

export const PRIMARY_COLOR = '#202A3A'
export const PRIMARY_COLOR_LIGHT = '#06679E'
export const HEADER_COLOR = '#235A62'
export const LABEL_COLOR = '#235A62'
export const PLACEHOLDER_COLOR = '#949494'
export const TEXT_COLOR = '#202A3A'
export const TEXT_COLOR_LIGHT = '#485E82'
export const TEXT_COLOR_INVALID = '#F56E9D'
export const TEXT_COLOR_SUCCESS = '#0F9979'

export const organizationEnums = {
  RESPONDR: 'respondR',
  FIREFIGHTER: 'firefighter',
  EPOLICE: 'e-police',
  AMBULANCE: 'ambulance',
  ETRAFFIC: 'e-traffic'
} as const

export type organizationEnumsType =
  (typeof organizationEnums)[keyof typeof organizationEnums]

export const ROLE = USERTOKEN.Role
export const ORGANIZATION = USERTOKEN.Organisation

export const ISSUPERADMIN = ROLE?.includes('super-admin') || false

export type typeBaseUrls = 'commandURL' | 'queryURL'

export const getBaseUrl = (type: typeBaseUrls) => {
  const url = localStorage.getItem(type) || ''
  return url
}

export const pageurl = {
  LANDING_PAGE: '/',
  EMIAL_VERIFICATION: '/verify-email',
  OVERVIEW: '/dashboard',
  LOGIN: '/login',
  REGISTER: '/register'
}

export const isBaseURL = (url: typeBaseUrls) => {
  return !!getBaseUrl(url)
}

export const baseurlReport = isBaseURL('queryURL')
  ? isBaseURL('queryURL') + '/api/v1/'
  : process.env.REACT_APP_BASEURL_REPORT

export const baseurlCommandReport = isBaseURL('commandURL')
  ? isBaseURL('commandURL') + '/api/v1/'
  : process.env.REACT_APP_BASEURL_REPORT

export const baseurlEPoliceTest =
  'https://respondr-command-2b9239ad3a3a.herokuapp.com/api/v1'

export const RESPONDR_CM_BASE_URL = `http://127.0.0.1:30814/api/v1`
export const VEHICLE_QR_BASE_URL = `https://etraffica.ngrok.app/vehicle-query/api/v1`
export const IN_CAR_QR_BASE_URL = `http://127.0.0.1:30816/api/v1`

export const validEmailRegex = /\S+@\S+\.\S+/
export const naijaPhoneRegex = /^[+][0-9]\d{9,13}$/

// export const identity_server = 'https://identityserver.myapiservices.net/api/v1'
// https://identitymanager.myapiservices.net/api/v1/UserLogin
// export const baseurl = 'https://apigateway.myapiservices.net/identity-manager';
// export const RESPONDR_QR_BASE_URL = `http://127.0.0.1:30814/api/v1`
// export const RESPONDR_CM_BASE_URL = `http://127.0.0.1:30817/api/v1`
// export const baseurl = process.env.REACT_APP_ETRAFFIKA_BASEURL;
// /^[+][1-9][0-9]{9,13}$/
