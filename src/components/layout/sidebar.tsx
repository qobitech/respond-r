import React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import "./sidebar.scss"
import { url } from "enums/Route"
import logo from "extras/images/car_logo.svg"
import { HamburgerSVG, HomeSVG, LogoSVG, LogoutSVG } from "utils/new/svgs"

interface IProps {
  setMenuOpen: (menuOpen: boolean) => (dispatch: any) => void
  menuOpen: boolean
  logOut: () => (dispatch: Function) => void
}

const SideBar = ({ setMenuOpen, menuOpen, logOut }: IProps) => {
  const location = useLocation()
  const navigate = useNavigate()
  function _isUrl(page: string) {
    return location.pathname.includes(page)
  }

  const menuItems = [
    {
      title: "Overview",
      imgsrc: <HomeSVG />,
      isActive: _isUrl(url.OVERVIEW),
      url: url.OVERVIEW,
    },
  ]

  const handleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <div
      className={`side-bar ${menuOpen ? "side_menu_open" : "side_menu_close"}`}
    >
      <div className="header">
        <div className="hamburger" onClick={handleMenu}>
          <HamburgerSVG />
        </div>
        <div onClick={() => navigate(url.LANDING_PAGE)}>
          <LogoSVG />
        </div>
      </div>

      <nav className="side-menu-container">
        {menuItems.map((i, index) => (
          <li
            className={`side-menu-item ${i.isActive ? "active" : ""}`}
            key={index}
            onClick={() => navigate(i.url)}
          >
            {i.imgsrc}
            <p>{i.title}</p>
          </li>
        ))}
      </nav>
      <nav className="side-menu-container logout" onClick={logOut}>
        <li className="side-menu-item">
          <LogoutSVG />
          <p>Logout</p>
        </li>
      </nav>
    </div>
  )
}

export default SideBar
