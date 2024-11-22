import { vehicleSearchType } from 'store/actions/global'

export const SearchSectionHeader = ({
  setSearch
}: {
  setSearch: (
    search: boolean,
    type: vehicleSearchType
  ) => (dispatch: any) => void
}) => {
  return (
    <div className="live-feed-filter-section">
      <p>Search Results</p>

      <button
        className="active"
        onClick={() => setSearch(false, null)}
        style={{ cursor: 'pointer' }}
      >
        <i className="fas fa-arrow-left mr-2" />
        Back to feed
      </button>
    </div>
  )
}
