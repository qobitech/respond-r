import React, { useState } from 'react'
import '../global.scss'
import './index.scss'
import 'utils/pagination.scss'
import 'utils/page.scss'
import RightSection from 'components/reusable/right-section'
import { IFeed, IHit } from 'interfaces/IStream'
import { IAction } from 'interfaces/IAction'
import { vehicleTypes } from 'store/types'
import { IProps } from './utils'
import { getFilePath } from './helpers'
import { useRTSP, useSignalR } from './hooks'
import MainView from './main-view'
import { Configuration } from './configuration'
import { LiveFeedStatusComponent } from './live-feed-status-component'
import { LiveFeedComponent } from './live-feed-component'
import { useRightSection } from 'components/reusable/right-section/hooks'
import { CopyComponent, useCopy } from 'utils/hook'
import { Loader } from 'utils/components'

const Overview: React.FC<IProps> = ({ states, ...props }) => {
  const { getVehicleByRegNumber, clearAction, setSearch, callRightSection } =
    props as unknown as IAction
  const searchAction = states?.global.search
  const searchedVehicleByChasis = states?.vehicle.searchVehicleByChasisNumber
  const searchedVehicleByReg = states?.vehicle.searchVehicleByRegNumber

  const vehicleSearchResult =
    searchAction?.type === 'chasis'
      ? searchedVehicleByChasis
      : searchAction?.type === 'regnumber'
      ? searchedVehicleByReg
      : null

  const rightSectionProps = states?.global.rightSection
  const vehicle = states?.vehicle
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
