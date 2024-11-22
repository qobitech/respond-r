import { IUS, IUSIO } from './utils'
import { useState } from 'react'
import { LiveFeedStatusComponent } from './live-feed-status-component'
import { FeedForm } from './feed-form'
import { RTSPForm } from './rtsp-form'
import { IRightSection } from 'components/reusable/right-section/utils'

export const Configuration = ({
  signalRProps,
  rtspProps
}: {
  signalRProps: IUS
  rtspProps: IUSIO
  rsProps?: IRightSection<{}>
}) => {
  const tabEnums = { FEED: 'Feed', RTSP: 'RTSP' }

  const [tab, setTab] = useState<string>(tabEnums.FEED)

  return (
    <div>
      <LiveFeedStatusComponent signalRProps={signalRProps} title="Status" />
      <div style={{ paddingBottom: '20px' }} />
      <div className="tab-section">
        <div className="tab-header">
          {Object.values(tabEnums).map((i, index) => (
            <div
              className={`tab-item ${i === tab ? 'active' : ''}`}
              key={index}
              onClick={() => setTab(i)}
            >
              <p>{i}</p>
            </div>
          ))}
        </div>
        <div className="tab-body">
          {tab === tabEnums.FEED ? (
            <FeedForm signalRProps={signalRProps} />
          ) : null}
          {tab === tabEnums.RTSP ? <RTSPForm rtspProps={rtspProps} /> : null}
        </div>
      </div>
    </div>
  )
}
