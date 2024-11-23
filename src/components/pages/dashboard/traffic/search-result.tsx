import { IFeed } from 'interfaces/IStream'
import { IVehicleSearch } from 'interfaces/IVehicle'
import { useState } from 'react'
import {
  convertRemoteSearchDataToFeed,
  convertSearchDataToFeed,
  getFilePath
} from './helpers'
import { LiveFeedItemComponent } from './live-feed-item-component'

export const SearchResults = ({
  vehicleSearchResult,
  handleFeedRequest
}: {
  vehicleSearchResult: IVehicleSearch | undefined | null
  handleFeedRequest: (i: IFeed) => void
}) => {
  const tabEnums = { LOCAL: 'Local', REMOTE: 'Remote' }

  const [tab, setTab] = useState<string>(tabEnums.LOCAL)

  const local = vehicleSearchResult?.data.local
  const remote = vehicleSearchResult?.data.remote

  return (
    <div>
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
          {tab === tabEnums.LOCAL ? (
            <>
              {!local ? (
                <p className="no-data-txt">No data</p>
              ) : (
                <LiveFeedItemComponent
                  carColor={local.color || '...'}
                  carMake={local.make || '...'}
                  imgSrc={getFilePath(local.filePath || '...')}
                  carType={local.model || '...'}
                  offense={(local?.flags?.length || 0) + ''}
                  regNumber={local.regNumber || '...'}
                  handleOnClick={() => {
                    handleFeedRequest(convertSearchDataToFeed(local))
                  }}
                />
              )}
            </>
          ) : null}
          {tab === tabEnums.REMOTE ? (
            <>
              {!remote ? (
                <p className="no-data-txt">No data</p>
              ) : (
                <LiveFeedItemComponent
                  carColor={remote.color || '...'}
                  carMake={remote.make || '...'}
                  imgSrc={remote.mainImageUrl || '...'}
                  carType={remote.model || '...'}
                  offense={(remote?.flags?.length || 0) + ''}
                  regNumber={remote.regNumber || '...'}
                  handleOnClick={() => {
                    handleFeedRequest(convertRemoteSearchDataToFeed(remote))
                  }}
                />
              )}
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}
