import { IFeed, IHit } from 'interfaces/IStream'
import { IUS } from './utils'
import { LiveFeedItemComponent } from './live-feed-item-component'
import { getFilePath } from './helpers'
import { LiveHitItemComponent } from './live-hit-item-component'
import { NoFeeds } from './no-feeds'
import { useGlobalContext } from 'context/hooks'
import { ICopyProps } from 'utils/hook'
import { feedDemoDatas } from './mock-data'

export const LiveFeedResults = ({
  signalRProps,
  handleFeedRequest,
  handleHitRequest,
  copyProps,
  isFeed,
  isHit
}: {
  signalRProps: IUS
  handleHitRequest: (i: IHit) => void
  handleFeedRequest: (i: IFeed) => void
  copyProps: ICopyProps
  isFeed: boolean
  isHit: boolean
}) => {
  const { setSearch: setSearchValue } = useGlobalContext()

  // const feeds = signalRProps.feeds
  const feeds = feedDemoDatas
  return (
    <div className="live-feed-component-wrapper">
      {isFeed ? (
        <>
          {feeds[0] ? (
            feeds.map((i) => (
              <LiveFeedItemComponent
                key={i.regNumber}
                carColor={i.colour}
                carMake={i.make || '...'}
                carType={i.model || '...'}
                imgSrc={getFilePath(i.filePath)}
                offense={i.flags?.[0] ? i.flags?.length + '' : '0'}
                regNumber={i.regNumber}
                handleOnClick={() => {
                  handleFeedRequest(i)
                  setSearchValue?.(i.regNumber)
                }}
              />
            ))
          ) : (
            <NoFeeds />
          )}
        </>
      ) : null}
      {isHit ? (
        <>
          {signalRProps.hits[0] ? (
            signalRProps.hits.map((i) => (
              <LiveHitItemComponent
                key={i.regNumber}
                carColor={i.colour}
                carMake={i.make || '...'}
                carModel={i.model || '...'}
                imgSrc={getFilePath(i.displayUrl)}
                offense={i.flag?.[0] ? i.flag?.length + '' : '0'}
                regNumber={i.regNumber}
                handleOnClick={() => {
                  handleHitRequest(i)
                  copyProps.copy(i.regNumber)
                }}
              />
            ))
          ) : (
            <NoFeeds />
          )}
        </>
      ) : null}
    </div>
  )
}
