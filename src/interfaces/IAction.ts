import { ICallRightSection, vehicleSearchType } from "store/actions/global"
import * as utils from "../store/services/new/utils"
interface IAuth {
  setAuthorizationHeader: (token: string) => void
  registerOrganization: (adminDetails: object) => (dispatch: Function) => void
  clearOrgAuth: () => (dispatch: Function) => void
  verifyEmail: (data: object) => (dispatch: Function) => void
  userLogin: (data: {
    email: string
    password: string
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
  setSearch: (
    search: boolean,
    type: vehicleSearchType
  ) => (dispatch: any) => void
}

interface IVehicleActions {
  getVehicleByRegNumber: (query: string) => (dispatch: any) => void
  searchVehicleByRegNumber: (query: string) => (dispatch: any) => void
  searchVehicleByChasisNumber: (query: string) => (dispatch: any) => void
}

interface IDemoActions {
  getDemoEPoliceNotifications: () => (dispatch: any) => void
}

export interface IAction
  extends IAuth,
    IGlobalActions,
    IUser,
    IDemoActions,
    IVehicleActions {}
