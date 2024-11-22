import { IFeed, IHit } from 'interfaces/IStream'
import { IUS } from './utils'
import { vehicleSearchType } from 'store/actions/global'
import { IVehicleSearchPayload } from 'interfaces/IGlobal'
import { ICopyProps } from 'utils/new/hook'
import { IVehicleSearch } from 'interfaces/IVehicle'
import { useFilterSection } from './hooks'
import { SearchResults } from './search-result'
import { SearchSectionHeader } from './search-section-header'
import { LiveFeedFilterHeader } from './live-feed-filter-header'
import { LiveFeedResults } from './live-feed-result'

export const LiveFeedComponent = ({
  signalRProps,
  handleHitRequest,
  handleFeedRequest,
  setSearch,
  searchAction,
  copyProps,
  vehicleSearchResult
}: {
  handleHitRequest: (i: IHit) => void
  handleFeedRequest: (i: IFeed) => void
  signalRProps: IUS
  setSearch: (
    search: boolean,
    type: vehicleSearchType
  ) => (dispatch: any) => void
  searchAction?: IVehicleSearchPayload
  copyProps: ICopyProps
  vehicleSearchResult: IVehicleSearch | undefined | null
}) => {
  const filters = [`Hits`, `All Feeds`]
  const useFilterProps = useFilterSection(filters[0])

  const isFeed = useFilterProps.selectedFilter === filters[1]
  const isHit = useFilterProps.selectedFilter === filters[0]

  return (
    <div className="live-feed-component">
      {searchAction?.search ? (
        <div style={{ width: '90%' }}>
          <SearchSectionHeader setSearch={setSearch} />
        </div>
      ) : (
        <div style={{ width: '90%' }}>
          <LiveFeedFilterHeader
            filterProps={useFilterProps}
            filters={filters}
          />
        </div>
      )}

      {searchAction?.search ? (
        <div style={{ width: '90%' }}>
          <div className="live-feed-component-wrapper">
            <SearchResults
              vehicleSearchResult={vehicleSearchResult}
              handleFeedRequest={handleFeedRequest}
            />
          </div>
        </div>
      ) : (
        <LiveFeedResults
          copyProps={copyProps}
          handleFeedRequest={handleFeedRequest}
          handleHitRequest={handleHitRequest}
          isFeed={isFeed}
          isHit={isHit}
          signalRProps={signalRProps}
        />
      )}
    </div>
  )
}
