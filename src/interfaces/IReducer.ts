import { ICallRightSection } from "store/actions/global"
import { INotification } from "./IGlobal"
import { IAllUsers } from "./IUser"
import { IVehicleById } from "./IVehicle"
import { ILoginResponse } from "./IAuth"
import { IDemoEPolice } from "./IDemo"

export interface IAuthReducer {
  userLogin: ILoginResponse
  userLoginLoading: boolean
  userLoginError: string
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

export interface IVehicleReducer {
  getVehicleByRegNumber: IVehicleById
  getVehicleByRegNumberLoading: boolean
  getVehicleByRegNumberError: any
}

export interface IDemoReducer {
  getDemoEPoliceNotifications: IDemoEPolice
  getDemoEPoliceNotificationsLoading: boolean
  getDemoEPoliceNotificationsError: any
}

export interface IStates {
  auth: IAuthReducer
  global: IGlobalReducer
  role: IRoleReducer
  user: IUserReducer
  vehicle: IVehicleReducer
  demo: IDemoReducer
}
