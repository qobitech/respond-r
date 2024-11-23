import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { url } from 'app-constants/Route'
import './navbar.scss'
import Logo from 'assets/images/CHITHUB_LOGO.png'
import { NavbarProps, pageType } from './utils'
import { ConfigurationComponent } from './configuration-component'
import { TrafficSearchComponent } from './traffic-search-component'
import { FireSearchComponent } from './fire-search-component'
import { PoliceSearchComponent } from './police-search-component'
import { PageIdentifier } from './page-identifier'
import { HamburgerSVG } from 'utils/svgs'
import Toggle from 'utils/toggle'
import { TypeButton } from 'utils/button'
import Toast, { SideToast } from 'utils/toast'
import { isLogged } from 'app-constants'

const Navbar = (props: NavbarProps) => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleClick = () => {
    props.setMenuOpen(!props.menuOpen)
  }

  function _isUrl(page: string) {
    if (!page) return false
    return location.pathname.includes(page)
  }

  const isTraffic = _isUrl(url.TRAFFIC)
  const isFireService = _isUrl(url.FIRESERVICE)
  const isPolice = _isUrl(url.POLICE)
  const isMedical = _isUrl(url.MEDICAL)

  const getPageIdentifier = (): pageType => {
    switch (true) {
      case isTraffic:
        return 'e-traffic'
      case isFireService:
        return 'firefighter'
      case isPolice:
        return 'e-police'
      case isMedical:
        return 'e-medical'
      default:
        return 'management'
    }
  }

  return (
    <div className="nav-container">
      <nav
        className="navbarItems"
        style={{ padding: isLogged ? '1rem 0px' : '0.4rem 0' }}
      >
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
            <img src={Logo} alt="Chithub technologies" />
          </div>
        )}
        {isLogged ? <PageIdentifier page={getPageIdentifier()} /> : null}
        <div className="nav-other-components">
          {isLogged && (
            <>
              {isTraffic ? (
                <TrafficSearchComponent
                  searchVehicleByChasisNumber={
                    props.searchVehicleByChasisNumber
                  }
                  searchVehicleByRegNumber={props.searchVehicleByRegNumber}
                  load={props.searchLoad}
                  setSearch={props.setSearch}
                />
              ) : null}
              {isFireService ? <FireSearchComponent /> : null}
              {isPolice ? <PoliceSearchComponent /> : null}
            </>
          )}
          <Toggle />
          {isLogged && (
            <ConfigurationComponent
              openSettings={() => {
                props.callRightSection({
                  action: 'custom',
                  component: 'settings'
                })
              }}
            />
          )}
          {!isLogged && (
            <div className="auth-actions">
              <TypeButton
                buttonSize="small"
                title="LOGIN"
                onClick={() => navigate(url.LOGIN)}
              />
            </div>
          )}
        </div>
      </nav>
      <Toast
        status={props.notifyUser?.status || false}
        notice={props.notifyUser?.notice || ''}
      />
      <SideToast
        sideToast={props.sideToast}
        setSideToast={props.setSideToast}
      />
    </div>
  )
}

export default Navbar
