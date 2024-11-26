import React, { useState } from 'react'
import Navbar from './navbar'
import Footer from './footer'
import './index.scss'
import { IAction } from 'interfaces/IAction'
import SideBar from './sidebar'
import ScrollIntoViewController from './ScrollIntoViewController'
import { GlobalContext } from 'context'
import { useLocation } from 'react-router-dom'
import { url } from 'app-constants/Route'
import { ThemeContext } from 'context/theme-context'
import { PageProps } from './helpers'
import { useRightSection } from 'utils/right-section/hooks'
import { isLogged, USERTOKEN } from 'app-constants'
import { ISideToast } from 'utils/toast'
import { PulseSVG } from 'utils/svgs'
import {
  useGlobalStartConnection,
  useIsLogged,
  useSelectedReport,
  useTheme
} from './hooks'

const Page: React.FC<PageProps> = ({ children, states, ...props }) => {
  const {
    setMenuOpen,
    setSearch,
    logOut,
    callRightSection,
    searchVehicleByChasisNumber,
    searchVehicleByRegNumber
  } = props as unknown as IAction

  const searchLoad =
    states?.vehicle.searchVehicleByRegNumberLoading ||
    states?.vehicle.searchVehicleByChasisNumberLoading

  const actionsRoles = states?.logged?.getLoggedActionsForRole?.data
  const organizations = states?.logged?.getLoggedOrganization?.data
  const roles = states?.logged?.getLoggedRoles?.data
  const notifyUser = states?.global.notifyUser
  const menuOpen = states?.global.menuOpen

  const preLoad =
    states?.logged.getLoggedActionsForRoleLoading ||
    states?.logged.getLoggedOrganizationLoading ||
    states?.logged.getLoggedRolesLoading

  const getOrganization = (type: 'id' | 'name', key: string | number) => {
    if (type === 'id') return organizations?.find((org) => org.id === key)
    return organizations?.find((org) => org.name === key)
  }

  useIsLogged({
    action: props as unknown as IAction,
    notifyUser,
    getOrganization,
    organizations,
    roles,
    actionsRoles
  })

  const { theme, setTheme } = useTheme()

  const [search, setSearchValue] = useState<string>('')

  const [sideToast, setSideToast] = useState<ISideToast>({
    notice: '',
    show: false,
    status: false
  })

  const getRole = (id: number) => {
    return roles?.find((org) => org.id === id)
  }

  const isAction = (action: string) => {
    // return actionsRoles?.includes(action) || false
    // return demoRoleActions?.includes(action) || false
    return true
  }

  const location = useLocation()

  const getOrganizationPath = () => {
    if (location.pathname.includes(url.FIRESERVICE)) return 'Fire'
    if (location.pathname.includes(url.MEDICAL)) return 'Medical'
    if (location.pathname.includes(url.POLICE)) return 'Police'
    return null
  }

  const organization = getOrganizationPath()

  const fetchAssets = () => {
    if (!organization) return
    const action = props as unknown as IAction
    action?.getAssets()
  }

  const rsProps = useRightSection()

  const {
    activateGlobalStartConnection,
    disableGlobalStartConnection,
    globalStartConnection
  } = useGlobalStartConnection()

  const { fetchReports, selectedReport, handleSelectReport, setReportById } =
    useSelectedReport({
      organization,
      states,
      action: props as unknown as IAction
    })

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
        userOrganization: getOrganization?.('name', USERTOKEN.Organisation),
        activateGlobalStartConnection,
        disableGlobalStartConnection,
        globalStartConnection,
        state: states,
        action: props as unknown as IAction,
        setSelectedReport: handleSelectReport,
        selectedReport,
        setReportById,
        fetchAssets,
        fetchReports,
        organization,
        setSideToast,
        sideToast,
        rsProps
      }}
    >
      <ThemeContext.Provider value={{ theme, setTheme }}>
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
            handleSelectReport={handleSelectReport}
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
              setSideToast={setSideToast}
              sideToast={sideToast}
            />
            <ScrollIntoViewController>
              <div className="contents">{children}</div>
            </ScrollIntoViewController>
            {!isLogged && <Footer />}
          </div>
        </div>
      </ThemeContext.Provider>
    </GlobalContext.Provider>
  )
}

export default Page
