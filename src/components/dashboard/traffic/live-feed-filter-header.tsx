import { FC } from 'react'
import { ILFS } from './utils'

export const LiveFeedFilterHeader: FC<ILFS> = ({ filterProps, filters }) => {
  return (
    <div className="live-feed-filter-section" style={{ gap: '15px' }}>
      {filters.map((i, index) => (
        <button
          className={filterProps.selectedFilter === i ? 'active' : ''}
          key={index}
          onClick={() => filterProps.handleFilter(i)}
        >
          {i}
        </button>
      ))}
    </div>
  )
}
