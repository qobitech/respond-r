import { IAction } from "interfaces/IAction"
import { IOrganization } from "interfaces/IOrganization"
import { IStates } from "interfaces/IReducer"
import { IReport, IReports } from "interfaces/IReport"
import { IRole } from "interfaces/IRole"
import { createContext } from "react"
import { ISideToast } from "utils/new/toast"

export type themeType = "dark" | "light"

export interface IGlobalContext {
  actions?: string[]
  search?: string
  theme?: themeType
  setSearch?: React.Dispatch<React.SetStateAction<string>>
  setTheme?: React.Dispatch<React.SetStateAction<themeType>>
  organizations?: IOrganization[]
  getOrganization?: (
    type: "id" | "name",
    key: string | number
  ) => IOrganization | undefined
  userOrganization?: IOrganization
  roles?: IRole[]
  getRole?: (roleId: number) => IRole | undefined
  isAction?: (action: string) => boolean
  activateGlobalStartConnection?: (url: string) => void
  disableGlobalStartConnection?: () => void
  globalStartConnection?: { action: boolean; url: string }
  state?: IStates
  action?: IAction
  setSelectedReport?: (report: IReport | null) => void
  selectedReport?: IReport | null
  setReportById?: (data: IReports) => void
  fetchAssets?: () => void
  fetchReports?: (page?: number) => void
  organization?: "Fire" | "Police" | "Medical" | null
  setSideToast?: (toast: ISideToast) => void
  sideToast?: ISideToast
}

export const GlobalContext = createContext<IGlobalContext>({
  actions: [],
  search: "",
  theme: "dark",
  organizations: [],
  roles: [],
  globalStartConnection: { action: false, url: "" },
})
