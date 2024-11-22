import { useEffect, useState } from 'react'
import {
  getConnection,
  IUFS,
  IUS,
  IUSIO,
  streamTypes,
  typeConnectionStatus
} from './utils'
import { getUrl, setUrl } from './helpers'
import { IFeed, IHit } from 'interfaces/IStream'
import hitSound from '../../../extras/audio/hit.mp3'
import { handleDataStream } from './data'

export const useRTSP = (): IUSIO => {
  const [
    streamStatus
    // setStreamStatus
  ] = useState<streamTypes | null>(null)
  const [rtspurl, setRtspURL] = useState<string | null>(getUrl('rtspUrl'))

  const sendRTSPURL = (url?: string) => {
    // setStreamStatus("loading")
    if (url && url !== rtspurl) setUrl('rtspUrl', url)
    // httpRequest(url || rtspurl || "")
    setRtspURL(url || '')
  }

  const stopRTSPFeed = () => {
    // httpRequest("stop")
    setRtspURL(null)
  }

  return {
    sendRTSPURL,
    streamStatus,
    stopRTSPFeed,
    rtspurl
  }
}

export const useSignalR = (): IUS => {
  const [connection, setConnection] = useState<signalR.HubConnection>()
  const [hits, setHits] = useState<IHit[]>([])
  const [feeds, setFeeds] = useState<IFeed[]>([])
  const [connectionStatus, setConnectionStatus] =
    useState<typeConnectionStatus>('closed')
  const [trigger, setTrigger] = useState<number>(0)

  const handleTrigger = () => {
    const temp = Math.random()
    setTrigger(temp === trigger ? temp + 1 : temp)
  }

  const startConnection = (url: string) => {
    setConnectionStatus('connecting')
    const storedUrl = getUrl('connectionUrl') || ''
    if (url || storedUrl) {
      const connection = getConnection(url || storedUrl)
      connection
        ?.start()
        .then(() => {
          setConnectionStatus('connected')
        })
        .catch(() => {
          setConnectionStatus('closed')
        })
      setConnection(connection)
    }
  }

  const hit = new Audio(hitSound)
  const playHit = () => {
    hit.play()
  }

  const mapDataArray = (i: IHit | IFeed) => {
    return i.regNumber
  }

  useEffect(() => {
    connection?.on('SendNotification', (data: IFeed) => {
      handleTrigger()
      setFeeds(handleDataStream(feeds, mapDataArray, 'regNumber')(data))
    })
    connection?.on('SendHits', (data: IHit) => {
      handleTrigger()
      setHits(handleDataStream(hits, mapDataArray, 'regNumber')(data))
      playHit()
    })
    connection?.onreconnecting(() => {
      setConnectionStatus('re-connecting')
    })
    connection?.onreconnected(() => {
      setConnectionStatus('connected')
    })
    connection?.onclose(() => {
      setConnectionStatus('closed')
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connection])

  return {
    hits,
    feeds,
    connectionStatus,
    startConnection
  }
}

export const useFilterSection = (defaultSelected: string): IUFS => {
  const [selectedFilter, setSelectedFilter] = useState<string | undefined>(
    defaultSelected
  )

  const handleFilter = (selectedFilter?: string) => {
    setSelectedFilter(selectedFilter)
  }
  return {
    selectedFilter,
    handleFilter
  }
}
