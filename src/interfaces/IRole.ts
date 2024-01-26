export interface IRole {
  organisationId: number
  userRoles: null
  actionRoles: null
  organisation: null
  id: number
  name: string
  normalizedName: string
  concurrencyStamp: null
}

export interface IRoles {
  message: string
  isSuccessful: boolean
  statusCode: number
  data: IRole[]
}

export interface IPermission {
  permission: string
  description: string
  permissionGroup: number
}
