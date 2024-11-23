import { IReport } from 'interfaces/IReport'
import { useState } from 'react'
import { handleFullScreen, useImage } from 'utils/hook'
import { Media } from './media'
import { Calendar2SVG, MarkerSVG, PhoneSVG, PulseSVG } from 'utils/svgs'
import { getTime } from '../admin-reports/helpers'
import { InfoSectionItem } from './info-section-item'
import { ActionComponent } from './action-component'
import { Assets } from './assets'

export const MainView = ({ feed }: { feed: IReport | null }) => {
  const [fileIndex, setFileIndex] = useState<number>(0)

  const handleFileIndex = (nav: 'left' | 'right') => {
    setFileIndex((prev) => {
      if (nav === 'left') return Math.max(0, prev - 1)
      if (nav === 'right')
        return Math.min((feed?.mediaFiles?.length || 1) - 1, prev + 1)
      return prev
    })
  }

  const imgProps = useImage()

  const tabEnum = {
    INFO: 'Info',
    ASSETS: 'Assets'
  }

  const [tab, setTab] = useState(tabEnum.INFO)

  return (
    <div className="video-section">
      <div className="media-container">
        <div className={`media-box`}>
          <Media
            files={feed?.mediaFiles}
            fileIndex={fileIndex}
            handleFileIndex={handleFileIndex}
            imgProps={imgProps}
          />
        </div>
      </div>
      <div className="media-nav-count">
        <p>
          {fileIndex + 1} of {feed?.mediaFiles?.length || '...'}
        </p>
        <div className="loader-box">{imgProps.isLoaded && <PulseSVG />}</div>
      </div>
      {feed !== null ? (
        <>
          <div className="header-info-prop">
            <div className="icon-txt">
              <Calendar2SVG />
              <p>
                {feed?.createdAt
                  ? new Date(feed.createdAt).toDateString()
                  : '...'}
                &nbsp;-&nbsp;<i>{getTime(feed?.createdAt)}</i>
              </p>
            </div>
            <div className="icon-txt">
              <PhoneSVG />
              <p>{feed?.deviceId || '...'}</p>
            </div>
            <ActionComponent
              title="Action"
              actions={[{ label: 'Assign' }, { label: 'Update status' }]}
            />
          </div>
          <div className="tab-section">
            <div className="tab-header">
              {Object.values(tabEnum).map((i, index) => (
                <div
                  className={`tab-item ${i === tab ? 'active' : ''}`}
                  key={index}
                  onClick={() => setTab(i)}
                >
                  <p>{i}</p>
                </div>
              ))}
            </div>
            <div className="tab-content">
              <div className="tab-body">
                <div className={tab === tabEnum.INFO ? '' : 'd-none'}>
                  <div className="mb-5">
                    <InfoSectionItem
                      label="Description"
                      value={feed?.description || '...'}
                    />
                  </div>
                  <div className="vehicle-info-section">
                    <InfoSectionItem
                      label="Transaction ID"
                      value={feed?.transactionId || '...'}
                    />
                    <InfoSectionItem
                      label="Words"
                      value={feed?.words || '...'}
                    />
                    <InfoSectionItem
                      label="Location"
                      value={feed?.city + ' | ' + feed?.state || '...'}
                      values={[feed?.city, feed?.state]}
                      icon={
                        <div
                          onClick={() => handleFullScreen(feed.map || '')}
                          className="location-map-icon"
                        >
                          <MarkerSVG />
                        </div>
                      }
                    />
                  </div>
                </div>
                <div className={tab === tabEnum.ASSETS ? '' : 'd-none'}>
                  <Assets
                    // allAssets={assets}
                    location={{
                      latitude: parseFloat(feed?.latitude || '0'),
                      longitude: parseFloat(feed?.longitude || '0')
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  )
}
