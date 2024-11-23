import { IReport } from 'interfaces/IReport'
import { TypeButton } from 'utils/button'
import { LocationSVG } from 'utils/svgs'

export const LiveFeedItemComponent = ({
  feed,
  handleOnClick
}: {
  feed: IReport | null
  handleOnClick: () => void
}) => {
  return (
    <div className="map-feed-item-component" onClick={handleOnClick}>
      <div className="lf-media-section">
        <img src={feed?.mediaFiles?.[0] || ''} alt="" />
      </div>
      <div className="lf-info-section">
        <p className="lf-description">{feed?.description || '...'}</p>

        <div className="lf-location">
          <LocationSVG />
          <div className="lf-location-items">
            <p title={feed?.state || '...'} style={{ margin: '0' }}>
              {feed?.state || '...'}
            </p>
            <div className="lf-text-separator" />
            <p style={{ margin: '0' }} title={feed?.city || '...'}>
              {feed?.city || '...'}
            </p>
          </div>
        </div>
        <TypeButton buttonSize="small" title="Accept" buttonType="outlined" />
      </div>
    </div>
  )
}
