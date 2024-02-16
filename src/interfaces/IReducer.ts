import { ICallRightSection } from "store/actions/global"
import { INotification, IVehicleSearchPayload } from "./IGlobal"
import { IAllUsers, ICreateUserError, ICreateUserResponse } from "./IUser"
import { IVehicleById, IVehicleSearch } from "./IVehicle"
import { ILoginResponse } from "./IAuth"
import { IDemoEPolice } from "./IDemo"
import { IRoles } from "./IRole"
import { IOrganizations } from "./IOrganization"
import { IActionsForRole, ICreateAction, IRoleActions } from "./IRoleActions"
import { IReports } from "./IReport"

export interface IAuthReducer {
  userLogin: ILoginResponse
  userLoginLoading: boolean
  userLoginError: string
}

export interface IGlobalReducer {
  menuOpen: boolean
  menuOpenLoading: boolean
  menuOpenError: any
  search: IVehicleSearchPayload
  searchLoading: boolean
  searchError: any
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
  getAllRoles: IRoles
  getAllRolesLoading: boolean
  getAllRolesError: string
  createRole: any
  createRoleLoading: boolean
  createRoleError: string
  deleteRole: any
  deleteRoleLoading: boolean
  deleteRoleError: string
  getRolesForOrganisation: IRoles
  getRolesForOrganisationLoading: boolean
  getRolesForOrganisationError: string
  unassignMultipleActionsForRole: any
  unassignMultipleActionsForRoleLoading: boolean
  unassignMultipleActionsForRoleError: string
}
export interface IOrganizationReducer {
  getAllOrganization: IOrganizations
  getAllOrganizationLoading: boolean
  getAllOrganizationError: string
  createOrganization: any
  createOrganizationLoading: boolean
  createOrganizationError: string
  deleteOrganization: any
  deleteOrganizationLoading: boolean
  deleteOrganizationError: string
}

export interface IActionReducer {
  getAllAction: IRoleActions
  getAllActionLoading: boolean
  getAllActionError: string
  createAction: ICreateAction
  createActionLoading: boolean
  createActionError: string
  deleteAction: any
  deleteActionLoading: boolean
  deleteActionError: string
  addActionToRole: any
  addActionToRoleLoading: boolean
  addActionToRoleError: string
  getActionsForRole: IActionsForRole
  getActionsForRoleLoading: boolean
  getActionsForRoleError: string
}

export interface ILoggedReducer {
  getLoggedActionsForRole: IActionsForRole
  getLoggedActionsForRoleLoading: boolean
  getLoggedActionsForRoleError: string
  getLoggedOrganization: IOrganizations
  getLoggedOrganizationLoading: boolean
  getLoggedOrganizationError: string
  getLoggedRoles: IRoles
  getLoggedRolesLoading: boolean
  getLoggedRolesError: string
}

export interface IUserReducer {
  createUser: ICreateUserResponse
  createUserLoading: boolean
  createUserError: ICreateUserError
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
  searchVehicleByRegNumber: IVehicleSearch
  searchVehicleByRegNumberLoading: boolean
  searchVehicleByRegNumberError: any
  searchVehicleByChasisNumber: IVehicleSearch
  searchVehicleByChasisNumberLoading: boolean
  searchVehicleByChasisNumberError: any
}

export interface IDemoReducer {
  getDemoEPoliceNotifications: IDemoEPolice
  getDemoEPoliceNotificationsLoading: boolean
  getDemoEPoliceNotificationsError: any
}

export interface IReportReducer {
  getAllReports: IReports
  getAllReportsLoading: boolean
  getAllReportsError: any
}

export interface IStates {
  auth: IAuthReducer
  global: IGlobalReducer
  role: IRoleReducer
  user: IUserReducer
  vehicle: IVehicleReducer
  demo: IDemoReducer
  organization: IOrganizationReducer
  actions: IActionReducer
  logged: ILoggedReducer
  report: IReportReducer
}
