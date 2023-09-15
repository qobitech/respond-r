import React, { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { url } from "enums/Route"
import { MenuItems } from "./menuItems"
import "./navbar.scss"
import Toast from "utils/new/toast"
import { INotification } from "interfaces/IGlobal"
import { USERTOKEN, isLogged } from "utils/new/constants"
import {
  CogSVG,
  EllipsisSVG,
  HamburgerSVG,
  LogoSVG,
  NotificationtSVG,
  UserSVG,
} from "utils/new/svgs"
import { TypeInput } from "utils/new/input"

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
          <div onClick={() => navigate(url.LANDING_PAGE)}>
            <LogoSVG />
          </div>
        )}
        {isLogged && (
          <div className="nav-other-components">
            <SearchComponent />
            <div className="nav-separator" />
            <ConfigurationComponent />
          </div>
        )}
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
          <UserComponent imgSrc="" name="" />
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

const SearchComponent = () => {
  return (
    <div className="nav-search-component">
      <input placeholder="Search" />
    </div>
  )
}

const ConfigurationComponent = () => {
  return (
    <div className="nav-config-component">
      <CogSVG />
      <p>Settings</p>
    </div>
  )
}

const UserComponent = ({ name, imgSrc }: { name: string; imgSrc: string }) => {
  return (
    <div className="nav-user-component">
      <div className="nav-profile">
        <div className="nav-user-profile">
          <img src={imgSrc || ""} alt="" />
        </div>
        <p>{name || "User"}</p>
      </div>
      <EllipsisSVG />
    </div>
  )
}
