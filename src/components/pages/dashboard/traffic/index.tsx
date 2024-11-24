import { FC, useState } from 'react'
import '../global.scss'
import './index.scss'
import 'utils/pagination.scss'
import 'utils/page.scss'
import RightSection from 'utils/right-section'
import { IFeed, IHit } from 'interfaces/IStream'
import { vehicleTypes } from 'store/types'
import { getFilePath } from './helpers'
import { useRTSP, useSignalR } from './hooks'
import MainView from './main-view'
import { Configuration } from './configuration'
import { LiveFeedStatusComponent } from './live-feed-status-component'
import { LiveFeedComponent } from './live-feed-component'
import { useRightSection } from 'utils/right-section/hooks'
import { CopyComponent, useCopy } from 'utils/hook'
import { Loader } from 'utils/components'
import { useGlobalContext } from 'context/hooks'

const Overview: FC = () => {
  const { state, action } = useGlobalContext()
  const { getVehicleByRegNumber, clearAction, setSearch, callRightSection } =
    action
  const searchAction = state?.global.search
  const searchedVehicleByChasis = state?.vehicle.searchVehicleByChasisNumber
  const searchedVehicleByReg = state?.vehicle.searchVehicleByRegNumber

  const vehicleSearchResult =
    searchAction?.type === 'chasis'
      ? searchedVehicleByChasis
      : searchAction?.type === 'regnumber'
      ? searchedVehicleByReg
      : null

  const rightSectionProps = state?.global.rightSection
  const vehicle = state?.vehicle
  const [mediaUrl, setMediaUrl] = useState<string>('')
  const [flags, setFlags] = useState<string[]>([])
  // const [camera, setCamera] = useState<string>()

  const handleFeedRequest = (i: IFeed) => {
    // get vehicle by reg number
    clearAction(vehicleTypes.getVehicleByRegNumber)
    getVehicleByRegNumber(i.regNumber)
    console.log('feed')
    setFlags(i.flags)
    setMediaUrl(getFilePath(i.filePath))
  }

  const handleHitRequest = (i: IHit) => {
    // get vehicle by reg number
    clearAction(vehicleTypes.getVehicleByRegNumber)
    getVehicleByRegNumber(i.regNumber)
    console.log('hit')
    setFlags(i.flag)
    setMediaUrl(getFilePath(i.displayUrl))
  }

  const rsProps = useRightSection(rightSectionProps, callRightSection)

  const signalRProps = useSignalR()

  const rtspProps = useRTSP()

  const [selectedView, setSelectedView] = useState<number>(0)

  const [copyProps] = useCopy()

  const isImage = selectedView === 0
  const isRtsp = selectedView === 1

  return (
    <>
      <RightSection rsProps={rsProps}>
        {rsProps.isView('custom', 'settings') ? (
          <Configuration signalRProps={signalRProps} rtspProps={rtspProps} />
        ) : null}
      </RightSection>
      <div className="main-page">
        <div className="pg-container">
          <LiveFeedStatusComponent signalRProps={signalRProps} />
          <div className="overview-page">
            <MainView
              mediaUrl={mediaUrl}
              flags={flags}
              isImage={isImage}
              isRtsp={isRtsp}
              rtspProps={rtspProps}
              setSelectedView={setSelectedView}
              vehicle={vehicle}
            />
            <div className="stream-section">
              <LiveFeedComponent
                handleFeedRequest={handleFeedRequest}
                handleHitRequest={handleHitRequest}
                signalRProps={signalRProps}
                setSearch={setSearch}
                searchAction={searchAction}
                copyProps={copyProps}
                vehicleSearchResult={vehicleSearchResult}
              />
            </div>
          </div>
        </div>
        <CopyComponent {...copyProps} />
        <Loader loader={false} />
      </div>
    </>
  )
}

export default Overview
