export interface IOrganization {
  id: number
  name: string
  roles: null
}
export interface IOrganizations {
  message: string
  isSuccessful: boolean
  statusCode: number
  data: IOrganization[]
}
