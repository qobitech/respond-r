import { INotification } from 'interfaces/IGlobal'
import { ICallRightSection, vehicleSearchType } from 'store/actions/global'
import { ISideToast } from 'utils/toast'

export interface NavbarProps {
  notifyUser: INotification | undefined
  setMenuOpen: (menuOpen: boolean) => (dispatch: any) => void
  menuOpen: boolean
  callRightSection: (props: ICallRightSection) => (dispatch: any) => void
  searchVehicleByChasisNumber: (query: string) => (dispatch: any) => void
  searchVehicleByRegNumber: (query: string) => (dispatch: any) => void
  setSearch: (
    search: boolean,
    type: vehicleSearchType
  ) => (dispatch: any) => void
  searchLoad?: boolean
  setSideToast: (toast: ISideToast) => void
  sideToast: ISideToast
}

export type pageType =
  | 'e-traffic'
  | 'e-police'
  | 'firefighter'
  | 'management'
  | 'e-medical'
