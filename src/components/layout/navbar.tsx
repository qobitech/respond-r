import React from "react"
import { useNavigate } from "react-router-dom"
import { url } from "enums/Route"
import "./navbar.scss"
import Toast from "utils/new/toast"
import { INotification } from "interfaces/IGlobal"
import { isLogged } from "utils/new/constants"
import { CogSVG, HamburgerSVG, LogoSVG } from "utils/new/svgs"
import { ICallRightSection } from "store/actions/global"

interface NavbarProps {
  notifyUser: INotification | undefined
  setMenuOpen: (menuOpen: boolean) => (dispatch: any) => void
  menuOpen: boolean
  callRightSection: (props: ICallRightSection) => (dispatch: any) => void
}

const Navbar = (props: NavbarProps) => {
  // const [clicked, setClicked] = useState(false)
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
            <ConfigurationComponent
              openSettings={() => {
                props.callRightSection({
                  action: "custom",
                  component: "settings",
                })
              }}
            />
          </div>
        )}
        {/* {!isLogged ? (
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
              LOGIN
            </button>
          </ul>
        ) : (
          <UserComponent imgSrc="" name="" />
        )} */}
      </nav>
      <Toast
        status={props.notifyUser?.status || false}
        notice={props.notifyUser?.notice || ""}
      />
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

const ConfigurationComponent = ({
  openSettings,
}: {
  openSettings: () => void
}) => {
  return (
    <div className="nav-config-component" onClick={openSettings}>
      <CogSVG />
      <p>Settings</p>
    </div>
  )
}

// const UserComponent = ({ name, imgSrc }: { name: string; imgSrc: string }) => {
//   return (
//     <div className="nav-user-component">
//       <div className="nav-profile">
//         <div className="nav-user-profile">
//           <img src={imgSrc || ""} alt="" />
//         </div>
//         <p>{name || "User"}</p>
//       </div>
//       <EllipsisSVG />
//     </div>
//   )
// }
