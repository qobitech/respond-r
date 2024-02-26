import React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import "./sidebar.scss"
import { url } from "enums/Route"
import {
  CarsSVG,
  FireExtinguisherSVG,
  HamburgerSVG,
  LogoSVG,
  ManagementSVG,
  MedicalSVG,
  PoliceSVG,
  SwitchSVG,
} from "utils/new/svgs"
import { ISSUPERADMIN, ORGANIZATION } from "utils/new/constants"
import { GODUSER } from "utils/new/constants/roles"
import { managementTabEnums } from "components/dashboard/admin-management"
import Logo from "../../extras/images/CHITHUB_LOGO.png"

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
      title: "Traffic",
      imgsrc: <CarsSVG />,
      isActive: _isUrl(url.TRAFFIC),
      url: url.TRAFFIC,
      id: "e-traffic",
    },
    {
      title: "E-Police",
      imgsrc: <PoliceSVG />,
      isActive: _isUrl(url.POLICE),
      url: url.POLICE,
      id: "e-police",
    },
    {
      title: "Fire Service",
      imgsrc: <FireExtinguisherSVG />,
      isActive: _isUrl(url.FIRESERVICE),
      url: url.FIRESERVICE,
      id: "firefighter",
    },
    {
      title: "E-Medical",
      imgsrc: <MedicalSVG />,
      isActive: _isUrl(url.MEDICAL),
      url: url.MEDICAL,
      id: "e-medical",
    },
    {
      title: "Management",
      imgsrc: <ManagementSVG />,
      isActive: _isUrl(url.MANAGEMENT),
      url: `${url.MANAGEMENT}/${managementTabEnums.USERS}`,
      id: "management",
    },
  ].filter((i) =>
    GODUSER
      ? i
      : ISSUPERADMIN
      ? i.id === "management" || i.id === ORGANIZATION
      : i.id === ORGANIZATION
  )

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
        <div
          onClick={() => navigate(url.LANDING_PAGE)}
          className="logo-container"
        >
          <img src={Logo} alt="Chithub technologies" />
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
          <SwitchSVG />
          <p>Logout</p>
        </li>
      </nav>
    </div>
  )
}

export default SideBar
