import React, { FC, useState } from "react"
import { useNavigate } from "react-router-dom"
import { url } from "enums/Route"
import "./navbar.scss"
import Toast from "utils/new/toast"
import { INotification } from "interfaces/IGlobal"
import { USERTOKEN, isLogged } from "utils/new/constants"
import { CogSVG, HamburgerSVG, LogoSVG, PulseSVG } from "utils/new/svgs"
import { ICallRightSection } from "store/actions/global"
import TextPrompt from "utils/new/text-prompt"

interface NavbarProps {
  notifyUser: INotification | undefined
  setMenuOpen: (menuOpen: boolean) => (dispatch: any) => void
  menuOpen: boolean
  callRightSection: (props: ICallRightSection) => (dispatch: any) => void
  searchVehicleByChasisNumber: (query: string) => (dispatch: any) => void
  searchVehicleByRegNumber: (query: string) => (dispatch: any) => void
  setSearch: (search: boolean) => (dispatch: any) => void
  searchLoad?: boolean
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
          <div
            onClick={() => navigate(url.LANDING_PAGE)}
            className="logo-container"
          >
            <LogoSVG />
            {USERTOKEN.Role === "e-police" ? (
              <p style={{ fontSize: "13px" }}>POLICE</p>
            ) : null}
          </div>
        )}
        {isLogged && (
          <div className="nav-other-components">
            <SearchComponent
              searchVehicleByChasisNumber={props.searchVehicleByChasisNumber}
              searchVehicleByRegNumber={props.searchVehicleByRegNumber}
              load={props.searchLoad}
              setSearch={props.setSearch}
            />
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

const SearchComponent = ({
  searchVehicleByChasisNumber,
  searchVehicleByRegNumber,
  load,
  setSearch,
}: {
  searchVehicleByChasisNumber: (query: string) => (dispatch: any) => void
  searchVehicleByRegNumber: (query: string) => (dispatch: any) => void
  load?: boolean
  setSearch: (search: boolean) => (dispatch: any) => void
}) => {
  const [inputValue, setInputValue] = useState<string>("")
  const [error, setError] = useState<string>("")

  const handleOnChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target
    setInputValue(value)
    setError("")
  }

  const handleSearch = (searchType: "reg" | "chasis") => {
    if (!inputValue) {
      setError("input empty")
      return
    }
    if (searchType === "reg") searchVehicleByRegNumber(inputValue)
    if (searchType === "chasis") searchVehicleByChasisNumber(inputValue)
    setSearch(true)
  }

  return (
    <form className="nav-search-component" onSubmit={(e) => e.preventDefault()}>
      <div className="d-flex align-items-center" style={{ gap: "20px" }}>
        <input
          placeholder="Type here to search"
          onChange={handleOnChange}
          value={inputValue}
          onBlur={() => setError("")}
        />

        <CTAS
          load={load}
          onBtn1={() => {
            handleSearch("reg")
          }}
          onBtn2={() => {
            handleSearch("chasis")
          }}
        />
      </div>
      {error ? <TextPrompt prompt={error} status={false} /> : null}
    </form>
  )
}

interface ICTAS {
  load?: boolean
  onBtn1: () => void
  onBtn2: () => void
}

const CTAS: FC<ICTAS> = ({ load, onBtn1, onBtn2 }) => {
  const [btnClicked, setBtnClicked] = useState<number>(0)
  return (
    <div
      className="w-100 d-flex flex-wrap justify-content-center"
      style={{ gap: "20px" }}
    >
      {load ? (
        <PulseSVG />
      ) : (
        <div
          className="dropdown text-center d-flex align-items-center justify-content-center"
          style={{ gap: "20px" }}
        >
          <button
            className="btn btn-secondary dropdown-toggle px-2 border-0 text-dark"
            style={{ background: "none", outline: "none", fontSize: "14px" }}
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {btnClicked === 1 && load ? "loading..." : "Search"}
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <p
              className="dropdown-item cursor-pointer m-0 py-2"
              style={{ cursor: "pointer" }}
              onClick={() => {
                onBtn1?.()
                setBtnClicked(1)
              }}
            >
              Reg number
            </p>
            <p
              className="dropdown-item cursor-pointer m-0 py-2"
              style={{ cursor: "pointer" }}
              onClick={() => {
                onBtn2?.()
                setBtnClicked(1)
              }}
            >
              Chasis number
            </p>
          </div>
        </div>
      )}
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
