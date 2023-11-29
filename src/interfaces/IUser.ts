export interface IUser {
  deleted: string
  deletedAt: null
  disableAt: null
  email: string
  emailConfirmed: boolean
  employeeId: string
  firstName: string
  id: string
  isEnabled: boolean
  isFirstLogin: boolean
  lastName: string
  middleName: null
  organizationId: number
  organizationName: string
  phoneNumber: string
  roles: string[]
  state: string
  userType: string
  username: string
  status: string
}

export interface IAllUsers {
  users: IUser[]
  currentPage: number
  isSuccessful: boolean
  pageSize: number
  responseCode: string
  responseMessage: string
  totalCount: number
  totalPages: number
}

export interface ICreateUserResponse {
  errorMessage: string
  message: string
  statusCode: number
  isSuccessful: boolean
}
