import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { url } from 'app-constants/Route'
import './navbar.scss'
import Logo from 'assets/images/CHITHUB_LOGO.png'
import { NavbarProps, pageType } from './utils'
import { PageIdentifier } from './page-identifier'
import { HamburgerSVG } from 'utils/svgs'
import Toggle from 'utils/toggle'
import { TypeButton } from 'utils/button'
import Toast, { SideToast } from 'utils/toast'
import { isLogged } from 'app-constants'
import { SearchComponent } from './search-component'

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

  const getPageIdentifier = (): pageType => {
    switch (true) {
      case _isUrl(url.TRAFFIC):
        return 'e-traffic'
      case _isUrl(url.FIRESERVICE):
        return 'firefighter'
      case _isUrl(url.POLICE):
        return 'e-police'
      case _isUrl(url.MEDICAL):
        return 'e-medical'
      default:
        return 'management'
    }
  }

  const pageIdentifier = getPageIdentifier()

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
        {isLogged ? <PageIdentifier page={pageIdentifier} /> : null}
        <div className="nav-other-components">
          {isLogged && <SearchComponent navProps={props} />}
          <Toggle />
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
