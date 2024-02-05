export interface IRole {
  actions: string[] | null
  id: number
  name: string
  organisationId: number
  // userRoles: null
  // actionRoles: null
  // organisation: null
  // normalizedName: string
  // concurrencyStamp: null
}

export interface IRoles {
  message: string
  isSuccessful: boolean
  statusCode: number
  currentPage: number
  pageSize: number
  totalCount: number
  totalPages: number
  data: IRole[]
}

export interface IPermission {
  permission: string
  description: string
  permissionGroup: number
}
