import React, { ReactNode, useEffect } from "react"
import Navbar from "./navbar"
import Footer from "./footer"
import "./index.scss"
import { isLogged } from "utils/new/constants"
import { IStates } from "interfaces/IReducer"
import { IAction } from "interfaces/IAction"
import SideBar from "./sidebar"
import ScrollIntoViewController from "./ScrollIntoViewController"

interface PageProps {
  children: ReactNode
  states?: IStates
}

const Page: React.FC<PageProps> = ({ children, states, ...props }) => {
  const { setNotificationStatus, setMenuOpen, logOut } =
    props as unknown as IAction

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
  return (
    <>
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
        />
        <ScrollIntoViewController>
          <div className="contents">{children}</div>
        </ScrollIntoViewController>
        {!isLogged && <Footer />}
      </div>
    </>
  )
}

export default Page
