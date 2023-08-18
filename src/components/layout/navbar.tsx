import React, { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import logo from "extras/images/car_logo.svg"
import { url } from "enums/Route"
import { MenuItems } from "./menuItems"
import "./navbar.scss"
import Toast from "utils/new/toast"
import { INotification } from "interfaces/IGlobal"
import { USERTOKEN, isLogged } from "utils/new/constants"
import {
  EllipsisSVG,
  HamburgerSVG,
  NotificationtSVG,
  UserSVG,
} from "utils/new/svgs"

interface NavbarProps {
  notifyUser: INotification | undefined
  setMenuOpen: (menuOpen: boolean) => (dispatch: any) => void
  menuOpen: boolean
}

const Navbar = (props: NavbarProps) => {
  const [clicked, setClicked] = useState(false)
  const handleClick = () => {
    props.setMenuOpen(!props.menuOpen)
  }
  const navigate = useNavigate()

  return (
    <div className="nav-container">
      <nav className="navbarItems">
        {props.menuOpen && <div className="backdrop" onClick={handleClick} />}

        {isLogged ? (
          <div className="hamburger" onClick={handleClick}>
            <HamburgerSVG />
          </div>
        ) : null}
        {!props.menuOpen && (
          <img
            src={logo}
            alt="...logo"
            width="200px"
            onClick={() => navigate(url.LANDING_PAGE)}
          />
        )}
        {/* {isLogged && (
          <div className="organization-section">
            <p className="title">ORGANIZATION</p>
            <div className="hyphen" />
            <p className="value">DORIME</p>
          </div>
        )} */}
        {!isLogged ? (
          <ul className={clicked ? "nav-menu active" : "nav-menu"}>
            {MenuItems.map((item, index) => (
              <div className="menu-item" key={index}>
                <NavLink
                  key={index}
                  className={({ isActive }) =>
                    isActive
                      ? `menu-item-container ${item.cName}`
                      : `${item.cName}`
                  }
                  to={item.url}
                  onClick={() =>
                    window.innerWidth < 758 ? setClicked(!clicked) : void 0
                  }
                >
                  {item.title}
                </NavLink>
              </div>
            ))}
            <button
              onClick={() => navigate(url.REGISTER)}
              className="button-cta"
            >
              REGISTER
            </button>
          </ul>
        ) : (
          <div className="user">
            <NotificationWidget />
            {/* <UserSVG /> */}
            <p>{USERTOKEN.username}</p>
            <EllipsisSVG />
          </div>
        )}
      </nav>
      <Toast
        status={props.notifyUser?.status || false}
        notice={props.notifyUser?.notice || ""}
      />
    </div>
  )
}

const NotificationWidget = () => {
  const navigate = useNavigate()
  return (
    <div
      className="notification-widget"
      onClick={() => navigate(url.NOTIFICATION)}
    >
      <div className="notification-alert" />
      <NotificationtSVG />
    </div>
  )
}

export default Navbar
