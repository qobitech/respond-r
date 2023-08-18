import { IAPIScopes, IAllApplications } from "./IApplication"
import { ILogin } from "./IAuth"
import { INotification } from "./IGlobal"
import { IAllOrganizations } from "./IOrganization"
import { IAllUsers } from "./IUser"

export interface IAuthReducer {
  registerOrganization: any
  registerOrganizationLoading: boolean
  registerOrganizationError: any
  verifyEmail: any
  verifyEmailLoading: boolean
  verifyEmailError: any
  userLogin: ILogin
  userLoginLoading: boolean
  userLoginError: string
  passwordReset: any
  passwordResetLoading: boolean
  passwordResetError: any
  requestPasswordToken: any
  requestPasswordTokenLoading: boolean
  requestPasswordTokenError: any
  verifyPasswordResetToken: any
  verifyPasswordResetTokenLoading: boolean
  verifyPasswordResetTokenError: any
  updatePassword: any
  updatePasswordLoading: boolean
  updatePasswordError: any
  generateAccessToken: any
  generateAccessTokenLoading: boolean
  generateAccessTokenError: any
  getRefreshToken: any
  getRefreshTokenLoading: boolean
  getRefreshTokenError: any
}

export interface IGlobalReducer {
  menuOpen: boolean
  menuOpenLoading: boolean
  menuOpenError: any
  subMenuOpen: number
  subMenuOpenLoading: boolean
  subMenuOpenError: any
  notifyUser: INotification
  notifyUserLoading: boolean
  notifyUserError: any
}

export interface IAPIScopeReducer {
  getAPIScopes: IAPIScopes
  getAPIScopesLoading: boolean
  getAPIScopesError: string
  createAPIScope: any
  createAPIScopeLoading: boolean
  createAPIScopeError: string
  updateAPIScope: any
  updateAPIScopeLoading: boolean
  updateAPIScopeError: string
}
export interface IApplicationReducer {
  getAllApplications: IAllApplications
  getAllApplicationsLoading: boolean
  getAllApplicationsError: string
  getApplicationById: any
  getApplicationByIdLoading: boolean
  getApplicationByIdError: string
  createApplication: any
  createApplicationLoading: boolean
  createApplicationError: string
  updateApplication: any
  updateApplicationLoading: boolean
  updateApplicationError: string
  deleteApplication: any
  deleteApplicationLoading: boolean
  deleteApplicationError: string
}
export interface IBillingReducer {
  getAPIBundles: any
  getAPIBundlesLoading: boolean
  getAPIBundlesError: string
  getAPIBundleById: any
  getAPIBundleByIdLoading: boolean
  getAPIBundleByIdError: string
  createAPIBundle: any
  createAPIBundleLoading: boolean
  createAPIBundleError: string
  updateAPIBundle: any
  updateAPIBundleLoading: boolean
  updateAPIBundleError: string
  deleteAPIBundle: any
  deleteAPIBundleLoading: boolean
  deleteAPIBundleError: string
  getAPIConfigs: any
  getAPIConfigsLoading: boolean
  getAPIConfigsError: string
  createAPIConfig: any
  createAPIConfigLoading: boolean
  createAPIConfigError: string
  updateAPIConfig: any
  updateAPIConfigLoading: boolean
  updateAPIConfigError: string
  deleteAPIConfig: any
  deleteAPIConfigLoading: boolean
  deleteAPIConfigError: string
  getAPIConfigGroups: any
  getAPIConfigGroupsLoading: boolean
  getAPIConfigGroupsError: string
  createAPIConfigGroup: any
  createAPIConfigGroupLoading: boolean
  createAPIConfigGroupError: string
  updateAPIConfigGroup: any
  updateAPIConfigGroupLoading: boolean
  updateAPIConfigGroupError: string
  getClientSubscriptions: any
  getClientSubscriptionsLoading: boolean
  getClientSubscriptionsError: string
  subscribeToBundle: any
  subscribeToBundleLoading: boolean
  subscribeToBundleError: string
  addAppsToSub: any
  addAppsToSubLoading: boolean
  addAppsToSubError: string
}
export interface IOrganizationReducer {
  getOrganizationInfo: any
  getOrganizationInfoLoading: boolean
  getOrganizationInfoError: string
  getAllOrganizations: IAllOrganizations
  getAllOrganizationsLoading: boolean
  getAllOrganizationsError: string
  deleteOrganization: any
  deleteOrganizationLoading: boolean
  deleteOrganizationError: string
}
export interface IRoleReducer {
  getAllRoles: any
  getAllRolesLoading: boolean
  getAllRolesError: string
  createRole: any
  createRoleLoading: boolean
  createRoleError: string
  updateRole: any
  updateRoleLoading: boolean
  updateRoleError: string
  deleteRole: any
  deleteRoleLoading: boolean
  deleteRoleError: string
  getPermissions: any
  getPermissionsLoading: boolean
  getPermissionsError: string
}
export interface IUserReducer {
  createUser: any
  createUserLoading: boolean
  createUserError: string
  updateUser: any
  updateUserLoading: boolean
  updateUserError: string
  deleteUser: any
  deleteUserLoading: boolean
  deleteUserError: string
  getAllUsers: IAllUsers
  getAllUsersLoading: boolean
  getAllUsersError: string
  getUserById: any
  getUserByIdLoading: boolean
  getUserByIdError: string
}

export interface IStates {
  auth: IAuthReducer
  global: IGlobalReducer
  apiscope: IAPIScopeReducer
  application: IApplicationReducer
  billing: IBillingReducer
  organization: IOrganizationReducer
  role: IRoleReducer
  user: IUserReducer
}
