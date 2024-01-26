export interface IUser {
  email: string
  userName: string
  organisation: {
    id: number
    name: string
    role: null
  }
  roleForReturn: Array<{
    name: string
  }>
  phoneNumber: string
  id: number
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
