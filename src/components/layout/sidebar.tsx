import React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import "./sidebar.scss"
import { url } from "enums/Route"
import logo from "extras/images/car_logo.svg"
import {
  ApplicationsSVG,
  BillingSVG,
  HamburgerSVG,
  HomeSVG,
  LogoutSVG,
  OrganizationsSVG,
  ProfileSVG,
  SecuritySVG,
  UsersSVG,
} from "utils/new/svgs"

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
    {
      title: "Applications",
      imgsrc: <ApplicationsSVG />,
      isActive: _isUrl(url.APPLICATIONS),
      url: url.APPLICATIONS,
    },
    {
      title: "User Management",
      imgsrc: <UsersSVG />,
      isActive: _isUrl(url.USERS),
      url: url.USERS,
    },
    {
      title: "Organizations",
      imgsrc: <OrganizationsSVG />,
      isActive: _isUrl(url.ORGANIZATION),
      url: url.ORGANIZATION,
    },
    {
      title: "Billing",
      imgsrc: <BillingSVG />,
      isActive: _isUrl(url.BILLING),
      url: url.BILLING,
    },
    {
      title: "App Security",
      imgsrc: <SecuritySVG />,
      isActive: _isUrl(url.APP_SECURITY),
      url: url.APP_SECURITY,
    },
    {
      title: "Profile",
      imgsrc: <ProfileSVG />,
      imgalt: "profile",
      isActive: _isUrl(url.PROFILE),
      url: url.PROFILE,
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

        <img
          src={logo}
          alt="...logo"
          width="200px"
          onClick={() => navigate(url.LANDING_PAGE)}
        />
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
