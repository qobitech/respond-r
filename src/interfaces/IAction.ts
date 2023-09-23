import { ICallRightSection } from "store/actions/global"
import * as utils from "../store/services/new/utils"
interface IAuth {
  setAuthorizationHeader: (token: string) => void
  registerOrganization: (adminDetails: object) => (dispatch: Function) => void
  clearOrgAuth: () => (dispatch: Function) => void
  verifyEmail: (data: object) => (dispatch: Function) => void
  userLogin: (data: {
    username: string
    password: string
    rememberMe: boolean
  }) => (dispatch: any) => void
  passwordReset: (data: object) => (dispatch: Function) => void
  requestPasswordToken: (email: {
    [key: string]: any
  }) => (dispatch: Function) => Promise<void>
  clearPasswordReset: () => (dispatch: Function) => void
  verifyPasswordResetToken: (data: object) => (dispatch: Function) => void
  updatePassword: (data: object) => (dispatch: Function) => void
  generateAccessToken: (data: object) => (dispatch: Function) => void
  getRefreshToken: (data: object) => (dispatch: Function) => void
  logOut: () => (dispatch: Function) => void
}

interface IAPIScope {
  getAPIScopes: () => (dispatch: any) => void
  createAPIScope: (data: object, update?: boolean) => (dispatch: any) => void
}

interface IApplication {
  getAllApplications: (query: string) => (dispatch: any) => void
  getApplicationById: (id: string) => (dispatch: any) => void
  createApplication: (data: object, update?: boolean) => (dispatch: any) => void
  deleteApplication: (id: number) => (dispatch: any) => void
}

interface IBilling {
  getAPIBundles: (query: string) => (dispatch: any) => void
  getAPIBundleById: (id: string) => (dispatch: any) => void
  createAPIBundle: (data: object, update?: boolean) => (dispatch: any) => void
  deleteAPIBundle: (id: string) => (dispatch: any) => void
  getAPIConfigs: (query: string) => (dispatch: any) => void
  createAPIConfig: (data: object, update?: boolean) => (dispatch: any) => void
  deleteAPIConfig: (id: string) => (dispatch: any) => void
  getAPIConfigGroups: (query: string) => (dispatch: any) => void
  createAPIConfigGroup: (
    data: object,
    update?: boolean
  ) => (dispatch: any) => void
  getClientSubscriptions: (query: string) => (dispatch: any) => void
  subscribeToBundle: (data: object) => (dispatch: any) => void
  addAppsToSub: (
    data: Array<{
      applicationId: number
      organizationSubscriptionId: number
    }>
  ) => (dispatch: any) => void
}

interface IOrganization {
  getOrganizationInfo: (query: string) => (dispatch: any) => void
  getAllOrganizations: (query: string) => (dispatch: any) => void
  deleteOrganization: (id: string) => (dispatch: any) => void
}

interface IRole {
  getAllRoles: (query: string) => (dispatch: any) => void
  createRole: (data: object, update?: boolean) => (dispatch: any) => void
  deleteRole: (id: string) => (dispatch: any) => void
  getPermissions: (query: string) => (dispatch: any) => void
}

interface IUser {
  createUser: (data: object, update?: boolean) => (dispatch: any) => void
  getAllUsers: (query: string) => (dispatch: any) => void
  deleteUser: (id: string) => (dispatch: any) => void
  getUserById: (id: string) => (dispatch: any) => void
}

interface IGlobalActions {
  clearAction: (actionType: utils.I_ACTION_TYPE) => (dispatch: any) => void
  setMenuOpen: (menuOpen: boolean) => (dispatch: any) => void
  setSubMenuOpen: (subMenuOpen: number) => (dispatch: any) => void
  setNotificationStatus: (
    notice: string,
    status: boolean
  ) => (dispatch: any) => void
  callRightSection: (props: ICallRightSection) => (dispatch: any) => void
}

interface IVehicleActions {
  getVehicleByRegNumber: (query: string) => (dispatch: any) => void
}

export interface IAction
  extends IAuth,
    IGlobalActions,
    IAPIScope,
    IApplication,
    IBilling,
    IOrganization,
    IUser,
    IVehicleActions {}
