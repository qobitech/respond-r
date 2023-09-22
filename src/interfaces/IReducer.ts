import { ICallRightSection } from "store/actions/global"
import { INotification } from "./IGlobal"
import { IAllUsers } from "./IUser"

export interface IAuthReducer {
  registerOrganization: any
  registerOrganizationLoading: boolean
  registerOrganizationError: any
  verifyEmail: any
  verifyEmailLoading: boolean
  verifyEmailError: any
  userLogin: any
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
  rightSection: ICallRightSection
  rightSectionLoading: boolean
  rightSectionError: any
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
  role: IRoleReducer
  user: IUserReducer
}
