import { themeType } from 'context'
import { INotification } from 'interfaces/IGlobal'
import { IReport, IReports } from 'interfaces/IReport'
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

export interface IUseTheme {
  theme: themeType
  setTheme: React.Dispatch<React.SetStateAction<themeType>>
}

export interface IUseGlobalStartConnection {
  globalStartConnection: {
    action: boolean
    url: string
  }
  activateGlobalStartConnection: (url: string) => void
  disableGlobalStartConnection: () => void
}

export interface IUseSelectedReport {
  fetchReports: (page?: number) => void
  selectedReport: IReport
  handleSelectReport: (report: IReport | null) => void
  setReportById: (data: IReports) => void
}
