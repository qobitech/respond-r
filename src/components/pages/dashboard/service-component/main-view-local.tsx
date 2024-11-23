import { FC, useState } from 'react'
import { handleFullScreen, useImage } from 'utils/hook'
import { Media } from './media'
import { Calendar2SVG, MarkerSVG, PhoneSVG, PulseSVG } from 'utils/svgs'
import { getTime } from '../admin-reports/helpers'
import { InfoSectionItem } from './info-section-item'
import { IMVL } from './utils'
import { IURS } from 'store/actions/admin-actions/report'
import { ActionComponent } from './action-component'
import { AssetsLocal } from './assets-local'

export const MainViewLocal: FC<IMVL> = ({
  feed,
  assignAssets,
  assets,
  updateReport,
  updateReportProps
}) => {
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

  const updateReportStatus = (status: string) => {
    const data: IURS = {
      assignedBy: {
        id: 1,
        userName: 'SYS-USER'
      },
      emergency: {
        emergencyId: feed?.id || '',
        emergencyType: ''
      },
      status
    }
    updateReport(data)
  }

  const reportStatusProps = [
    'New',
    'Assigned',
    'Accepted',
    'Closed',
    'Rejected'
  ]

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
              title="Update Status"
              actions={reportStatusProps.map((status) => ({
                label: status,
                action: () => {
                  updateReportStatus(status?.toLowerCase())
                }
              }))}
              load={updateReportProps.updateReportStatusLoading}
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
                          className={`location-map-icon ${feed?.status?.toLowerCase()}`}
                        >
                          <MarkerSVG />
                        </div>
                      }
                    />
                    <InfoSectionItem
                      label="Status"
                      value={feed?.status || '...'}
                      icon={
                        <div
                          className={`status-ball ${feed?.status?.toLowerCase()}`}
                        />
                      }
                      iconPosition="left"
                    />
                  </div>
                </div>
                <div className={tab === tabEnum.ASSETS ? '' : 'd-none'}>
                  <AssetsLocal
                    location={{
                      latitude: parseFloat(feed?.latitude || '0'),
                      longitude: parseFloat(feed?.longitude || '0')
                    }}
                    assets={assets}
                    assignAssets={assignAssets}
                    feed={feed}
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
