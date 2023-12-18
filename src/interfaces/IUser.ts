export interface IUser {
  email: string
  userName: string
  organisationName: string
  phoneNumber: string
}

export interface IAllUsers {
  currentPage: number
  pageSize: number
  totalCount: number
  totalPages: number
  message: string
  statusCode: number
  isSuccessful: boolean
  data: IUser[]
}

export interface ICreateUserResponse {
  errorMessage: string
  message: string
  statusCode: number
  isSuccessful: boolean
}

export interface ICreateUserError {
  type: string
  title: string
  status: number
  traceId: string
  errors: {
    [key: string]: any
  }
}
