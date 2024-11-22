import { IUS } from './utils'

export const LiveFeedStatusComponent = ({
  signalRProps,
  title
}: {
  signalRProps: IUS
  title?: string
}) => {
  const isConnect = signalRProps.connectionStatus === 'closed'

  return (
    <div className="live-feed-component">
      <div className="live-feed-header-section">
        <p className="lf-header">{title || 'LIVE FEED'}</p>
        <p
          className={`lf-status ${signalRProps.connectionStatus}`}
          onClick={() => {
            if (isConnect) signalRProps.startConnection('')
          }}
        >
          <span className={`lf-status-bop ${signalRProps.connectionStatus}`} />
          {signalRProps.connectionStatus}
        </p>
      </div>
    </div>
  )
}
