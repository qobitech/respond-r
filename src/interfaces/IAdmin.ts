import { IAPIScope, IApplication } from "./IApplication"
import {
  IAPIBundle,
  IAPIConfig,
  IAPIConfigGroup,
  IClientSubscription,
} from "./IBilling"
import { IOrganization } from "./IOrganization"
import { IPermission, IRole } from "./IRole"

export interface IUser {
  id: string
  employeeId: string
  username: string
  email: string
  firstName: string
  phoneNumber: string
  lastName: string
  middleName: string
  organizationName: string
  state: string
  deleted: string
  deletedAt: null
  disableAt: null
  organizationId: number
  isEnabled: boolean
  isFirstLogin: boolean
  userType: string
  emailConfirmed: boolean
  roles: Array<string>
}

export interface IAdmin {
  id: string
  name: string
  errors: string
  loading: boolean
  action: string
  tableIndex: string
  totalCount: number
  users: Array<IUser>
  applications: Array<IApplication>
  organizationInfo: Array<IOrganization>
  organizations: Array<IOrganization>
  apiScopes: Array<IAPIScope>
  apiBundles: Array<IAPIBundle>
  apiBundleById: IAPIBundle
  apiConfigs: Array<IAPIConfig>
  apiConfigGroups: Array<IAPIConfigGroup>
  clientSubscriptions: Array<IClientSubscription>
  roles: Array<IRole>
  permissions: Array<IPermission>
}
