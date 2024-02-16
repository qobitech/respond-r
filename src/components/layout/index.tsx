import React, { ReactNode, useContext, useEffect, useState } from "react"
import Navbar from "./navbar"
import Footer from "./footer"
import "./index.scss"
import { isLogged, USERTOKEN } from "utils/new/constants"
import { IStates } from "interfaces/IReducer"
import { IAction } from "interfaces/IAction"
import SideBar from "./sidebar"
import ScrollIntoViewController from "./ScrollIntoViewController"
import { GlobalContext, IGlobalContext, themeType } from "context"
import { PulseSVG } from "utils/new/svgs"
import { GODUSER } from "utils/new/constants/roles"

export const useGlobalContext = (): IGlobalContext => {
  const context = useContext(GlobalContext)

  return context
}

interface PageProps {
  children: ReactNode
  states?: IStates
}

export const getActionRoles = () => {
  const actionRoles = localStorage.getItem("actionRoles")
  if (actionRoles) return JSON.parse(actionRoles) as string[]
  return []
}

export const storeActionRoles = (actionsRoles: string[] | undefined) => {
  if (!actionsRoles?.length) return
  if (!getActionRoles().length) {
    localStorage.setItem("actionRoles", JSON.stringify(actionsRoles))
  }
}

export const clearActionRoles = () => {
  localStorage.removeItem("actionRoles")
}

const Page: React.FC<PageProps> = ({ children, states, ...props }) => {
  const {
    setNotificationStatus,
    setMenuOpen,
    setSearch,
    logOut,
    callRightSection,
    searchVehicleByChasisNumber,
    searchVehicleByRegNumber,
    getLoggedActionsForRole,
    getLoggedOrganization,
    getLoggedRoles,
  } = props as unknown as IAction

  const searchLoad =
    states?.vehicle.searchVehicleByRegNumberLoading ||
    states?.vehicle.searchVehicleByChasisNumberLoading

  const actionsRoles = states?.logged?.getLoggedActionsForRole?.data
  const organizations = states?.logged?.getLoggedOrganization?.data
  const roles = states?.logged?.getLoggedRoles?.data
  const notifyUser = states?.global.notifyUser
  const menuOpen = states?.global.menuOpen

  useEffect(() => {
    let timeOut: NodeJS.Timeout
    if (notifyUser)
      timeOut = setTimeout(() => {
        setNotificationStatus("", false)
      }, 3000)

    return () => {
      clearTimeout(timeOut)
    }
  }, [notifyUser, setNotificationStatus])

  const query = (sign: string) =>
    GODUSER
      ? ""
      : `${sign}OrganisationId=${
          getOrganization?.("name", USERTOKEN.Organisation)?.id || ""
        }`

  const getAllLoggedRoles = (query: string) => {
    if (GODUSER) getLoggedRoles(query)
    if (organizations?.length) getLoggedRoles(query)
  }

  useEffect(() => {
    if (isLogged) {
      if (!roles) getAllLoggedRoles(query("?"))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organizations])

  useEffect(() => {
    if (isLogged) {
      if (!actionsRoles) getLoggedActionsForRole(USERTOKEN.Role)
      if (!organizations) getLoggedOrganization("")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const preLoad =
    states?.logged.getLoggedActionsForRoleLoading ||
    states?.logged.getLoggedOrganizationLoading ||
    states?.logged.getLoggedRolesLoading

  const isBrowserDefaultDark = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches

  const getDefaultTheme = (): themeType => {
    const localStorageTheme = localStorage.getItem("theme")
    const browserDefault = isBrowserDefaultDark() ? "dark" : "light"
    return (localStorageTheme || browserDefault) as themeType
  }

  const [theme, setTheme] = useState<themeType>(getDefaultTheme())
  const [search, setSearchValue] = useState<string>("")
  const [globalStartConnection, setGlobalStartConnection] = useState<{
    action: boolean
    url: string
  }>({ action: false, url: "" })

  const activateGlobalStartConnection = (url: string) => {
    setGlobalStartConnection(() => ({
      action: true,
      url,
    }))
  }

  const disableGlobalStartConnection = () => {
    setGlobalStartConnection((prev) => ({
      action: false,
      url: "",
    }))
  }

  const getOrganization = (type: "id" | "name", key: string | number) => {
    if (type === "id") return organizations?.find((org) => org.id === key)
    return organizations?.find((org) => org.name === key)
  }

  const getRole = (id: number) => {
    return roles?.find((org) => org.id === id)
  }

  const isAction = (action: string) => {
    return actionsRoles?.includes(action) || false
  }

  return (
    <GlobalContext.Provider
      value={{
        theme,
        setTheme,
        search,
        setSearch: setSearchValue,
        actions: actionsRoles || [],
        organizations: organizations || [],
        getOrganization,
        roles: roles || [],
        getRole,
        isAction,
        userOrganization: getOrganization?.("name", USERTOKEN.Organisation),
        activateGlobalStartConnection,
        disableGlobalStartConnection,
        globalStartConnection,
      }}
    >
      <div className={`theme-${theme}`}>
        {preLoad ? (
          <div className="pre-loader">
            <PulseSVG />
            <p>Please wait...</p>
          </div>
        ) : null}
        <SideBar
          setMenuOpen={setMenuOpen}
          menuOpen={menuOpen || false}
          logOut={logOut}
        />
        <div className={`page_layout fitContent`}>
          <Navbar
            notifyUser={notifyUser}
            setMenuOpen={setMenuOpen}
            menuOpen={menuOpen || false}
            callRightSection={callRightSection}
            searchVehicleByChasisNumber={searchVehicleByChasisNumber}
            searchVehicleByRegNumber={searchVehicleByRegNumber}
            searchLoad={searchLoad}
            setSearch={setSearch}
          />
          <ScrollIntoViewController>
            <div className="contents">{children}</div>
          </ScrollIntoViewController>
          {!isLogged && <Footer />}
        </div>
      </div>
    </GlobalContext.Provider>
  )
}

export default Page

export const ActionWrapper = ({
  action,
  children,
}: {
  action: string
  children?: any
}) => {
  const { isAction } = useGlobalContext()

  if (isAction?.(action)) return <>{children}</>

  return <></>
}
