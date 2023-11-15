import React, { ReactNode, useEffect, useState } from "react"
import Navbar from "./navbar"
import Footer from "./footer"
import "./index.scss"
import { isLogged } from "utils/new/constants"
import { IStates } from "interfaces/IReducer"
import { IAction } from "interfaces/IAction"
import SideBar from "./sidebar"
import ScrollIntoViewController from "./ScrollIntoViewController"
import { ThemeContext } from "contexts/theme-context"

interface PageProps {
  children: ReactNode
  states?: IStates
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
  } = props as unknown as IAction

  const searchLoad =
    states?.vehicle.searchVehicleByRegNumberLoading ||
    states?.vehicle.searchVehicleByChasisNumberLoading

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

  const isBrowserDefaultDark = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches

  const getDefaultTheme = (): "dark" | "light" => {
    const localStorageTheme = localStorage.getItem("theme")
    const browserDefault = isBrowserDefaultDark() ? "dark" : "light"
    return (localStorageTheme || browserDefault) as "dark" | "light"
  }

  const [theme, setTheme] = useState<"dark" | "light">(getDefaultTheme())

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`theme-${theme}`}>
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
    </ThemeContext.Provider>
  )
}

export default Page
