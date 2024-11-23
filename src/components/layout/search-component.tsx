import { url } from 'app-constants/Route'
import { ConfigurationComponent } from './configuration-component'
import { FireSearchComponent } from './fire-search-component'
import { PoliceSearchComponent } from './police-search-component'
import { TrafficSearchComponent } from './traffic-search-component'
import { NavbarProps } from './utils'
import { FC } from 'react'

export const SearchComponent: FC<{ navProps: NavbarProps }> = ({
  navProps
}) => {
  const {
    searchVehicleByChasisNumber,
    searchVehicleByRegNumber,
    searchLoad,
    setSearch,
    callRightSection
  } = navProps
  function _isUrl(page: string) {
    if (!page) return false
    return location.pathname.includes(page)
  }

  const isTraffic = _isUrl(url.TRAFFIC)
  const isFireService = _isUrl(url.FIRESERVICE)
  const isPolice = _isUrl(url.POLICE)

  return (
    <>
      {isTraffic ? (
        <TrafficSearchComponent
          searchVehicleByChasisNumber={searchVehicleByChasisNumber}
          searchVehicleByRegNumber={searchVehicleByRegNumber}
          load={searchLoad}
          setSearch={setSearch}
        />
      ) : null}
      {isFireService ? <FireSearchComponent /> : null}
      {isPolice ? <PoliceSearchComponent /> : null}
      <ConfigurationComponent
        openSettings={() => {
          callRightSection({
            action: 'custom',
            component: 'settings'
          })
        }}
      />
    </>
  )
}
