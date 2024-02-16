import { IOrganization } from "interfaces/IOrganization"
import { IRole } from "interfaces/IRole"
import { createContext } from "react"

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
}

export const GlobalContext = createContext<IGlobalContext>({
  actions: [],
  search: "",
  theme: "dark",
  organizations: [],
  roles: [],
  globalStartConnection: { action: false, url: "" },
})
