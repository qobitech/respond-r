// import { IUser } from "./IAdmin"

export interface IOrgAuth {
  conformationToken: string
  conformationUrl: string
  isSuccessful: boolean
  responseMessage: string
  responseCode: string
}

export interface IRefreshToken {
  accessToken: string
  refreshToken: string
  tokenExpiryDate: string
  audience: string
}

export interface IGeneratedToken {
  access_token: string
  expires_in: number
  token_type: string
  scope: string
}

export interface IPasswordReset {
  passwordResetLink: string
  token: string
  isSuccessful: boolean
  responseMessage: string
  responseCode: string
}

export interface IVPasswordReset {
  isSuccessful: boolean
  responseMessage: string
  responseCode: string
}

export interface IVEmail {
  isSuccessful: boolean
  responseMessage: string
  responseCode: string
}

export interface ISignInResult {
  succeeded: boolean
  isLockedOut: boolean
  isNotAllowed: boolean
  requiresTwoFactor: boolean
}

export interface ILoggedInDetails {
  user: IUser
  roles: Array<string>
  loginSuccessful: boolean
  responseMessage: null
  token: IRefreshToken
  signInResult: ISignInResult
}

export interface IAuth {
  orgAuth: IOrgAuth
  refreshToken: IRefreshToken
  generatedToken: IGeneratedToken
  passwordReset: IPasswordReset
  verifyPasswordReset: IVPasswordReset
  verifyEmail: IVEmail
  loggedInDetails: ILoggedInDetails
  loading: boolean
  action: string
  errors: string
  authenticated: boolean
}

export interface IUser {
  id: string
  employeeId: string
  username: string
  email: string
  firstName: string
  emailConfirmed: boolean
  lastName: string
  middleName: string
  organizationName: string
  state: string
  userType: string
  isEnabled: boolean
  isFirstLogin: boolean
  disableAt: string
  deleted: "N"
  deletedAt: string
  organizationId: string
}

export interface IUserToken {
  jti: string
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string
  username: string
  userId: string
  exp: number
  iss: string
  aud: string
}

export interface IToken {
  accessToken: string
  refreshToken: string
  tokenExpiryDate: string
  audience: string
}

export interface ISignInResult {
  succeeded: boolean
  isLockedOut: boolean
  isNotAllowed: boolean
  requiresTwoFactor: boolean
}

export interface ILogin {
  user: IUser
  roles: string[]
  loginSuccessful: boolean
  responseMessage: null
  token: IToken
  signInResult: ISignInResult
}

export interface ILoginError {
  user: null
  roles: null
  loginSuccessful: boolean
  responseMessage: string
  token: null
  signInResult: ISignInResult
}
