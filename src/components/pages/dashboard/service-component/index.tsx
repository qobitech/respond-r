import React, { useState } from 'react'
import { NoFeeds } from '../traffic/no-feeds'
import AdminWrapper from '../admin-wrapper'
import { IReport } from 'interfaces/IReport'
import { trafficReportData } from '../traffic/mock-data'
import CreateAsset from '../asset/create-asset'
import LinkAsset from '../asset/link-asset'
import { NoMediaComponent } from '../traffic/no-media-component'
import { useRightSection } from 'utils/right-section/hooks'
import RightSection from 'utils/right-section'
import { useGlobalContext } from 'context/hooks'
import { ViewReport } from '../admin-reports/view-report'
import { IPageComponent } from './utils'
import { useSignalR } from './hooks'
import { Configuration } from './configuration'
import { LiveFeedStatusComponent } from './live-feed-status-component'
import { MainView } from './main-view'
import { LiveFeedItemComponent } from './live-feed-item-component'

export const PageComponent: React.FC<IPageComponent> = ({
  section,
  signalRURL
}) => {
  const { action, state, fetchReports } = useGlobalContext()

  const [selecteAssetId, setSelectedAssetId] = useState<string | null>(null)

  const rightSectionProps = state?.global.rightSection
  const rsProps = useRightSection<IReport>(
    rightSectionProps,
    action?.callRightSection
  )
  // const allAssets = state?.asset?.getAllAssets?.Data || []
  const signalRProps = useSignalR<IReport>(signalRURL, () => {
    fetchReports?.(1)
  })

  const addAsset = () => {
    rsProps.callSection('create', 'asset')
  }

  const linkAsset = (assetId: string) => {
    setSelectedAssetId(assetId)
    rsProps.callSection('custom', 'link-asset')
  }

  return (
    <>
      <RightSection rsProps={rsProps}>
        {rsProps.isView('custom', 'settings') ? (
          <Configuration signalR={signalRProps} urlKey="globalSignalR" />
        ) : null}
        {rsProps.isView('create', 'asset') ? <CreateAsset /> : null}
        {rsProps.isView('update', 'asset') ? <CreateAsset /> : null}
        {rsProps.isView('custom', 'link-asset') ? (
          <LinkAsset assetId={selecteAssetId} />
        ) : null}
        {rsProps.isView('custom', 'report') ? <ViewReport /> : null}
      </RightSection>
      <div className="main-page">
        <div className="pg-container">
          <LiveFeedStatusComponent signalRProps={signalRProps} />
          <AdminWrapper
            section={section}
            data={trafficReportData}
            addAsset={addAsset}
            linkAsset={linkAsset}
          >
            <div className="overview-page">
              {signalRProps?.feed ? (
                <MainView feed={signalRProps.feed} />
              ) : (
                <NoMediaComponent
                  load={false}
                  locationDetails={[
                    {
                      location: {
                        latitude: parseFloat(
                          signalRProps.feed?.latitude || '0'
                        ),
                        longitude: parseFloat(
                          signalRProps.feed?.longitude || '0'
                        )
                      },
                      map: signalRProps.feed?.map || '',
                      nearestPlace: signalRProps.feed?.nearestPlace || ''
                    }
                  ]}
                />
              )}
              <div className="stream-section">
                <div className="live-feed-component">
                  {signalRProps.feeds?.[0] ? (
                    signalRProps.feeds.map((i, index) => (
                      <LiveFeedItemComponent
                        key={Date.now() + index}
                        feed={i}
                        handleOnClick={() => {
                          signalRProps.handleFeedSelect(i)
                        }}
                      />
                    ))
                  ) : (
                    <NoFeeds />
                  )}
                </div>
              </div>
            </div>
          </AdminWrapper>
        </div>
      </div>
    </>
  )
}
