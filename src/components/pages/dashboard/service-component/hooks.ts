import { useEffect, useState } from 'react'
import { IMediaURL, IPHUS, isImageExist, typeSignalRURL } from './utils'
import { getConnection, typeConnectionStatus } from '../traffic/utils'
import { isBaseURL } from 'app-constants'
import { getUrl } from '../traffic/helpers'
import { handleDataStream } from '../traffic/data'
import hitSound from 'assets/audio/hit.mp3'
import { IUseImage } from 'utils/hook'

export const useSignalR = <T extends {}>(
  signalKey: typeSignalRURL,
  onSignal?: () => void
): IPHUS<T> => {
  const [connection, setConnection] = useState<signalR.HubConnection>()
  const [feeds, setFeeds] = useState<T[]>([])
  const [feed, setFeed] = useState<T | null>(null)
  const [connectionStatus, setConnectionStatus] =
    useState<typeConnectionStatus>('closed')

  const handleFeedSelect = (feed: T | null) => {
    setFeed(feed)
  }

  const startConnection = (url: string) => {
    const commandURL = isBaseURL('commandURL')
      ? isBaseURL('commandURL') + '/notificationHub'
      : ''
    const defaultURL = import.meta.env.VITE_REACT_APP_SIGNALR || ''
    setConnectionStatus('connecting')
    const storedUrl = getUrl('globalSignalR') || ''
    if (!commandURL && !url && !storedUrl && !!defaultURL) {
      setConnectionStatus('closed')
      return
    }
    const connection = getConnection(
      commandURL || url || storedUrl || defaultURL
    )
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

  useEffect(() => {
    startConnection('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const stopConnection = () => {
    setConnectionStatus('closed')
    connection?.off(signalKey)
    connection?.stop()
  }

  const hit = new Audio(hitSound)
  const playHit = () => {
    hit.play()
  }

  const mapDataArray = (i: any) => {
    return ''
  }

  useEffect(() => {
    connection?.on(signalKey, (data: any) => {
      playHit()
      setFeeds(() => [...handleDataStream(feeds, mapDataArray, '')(data)])
      onSignal?.()
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
    feeds,
    connectionStatus,
    startConnection,
    stopConnection,
    handleFeedSelect,
    feed
  }
}

export const useGetMediaUrl = (url: string, imgProps: IUseImage): IMediaURL => {
  const getMediaUrl = async (): Promise<{
    type: 'video' | 'image' | null
    url: string
    load: boolean
  }> => {
    if (url) {
      const isImage = await isImageExist(url, imgProps)
      return {
        type: isImage ? 'image' : 'video',
        url,
        load: false
      }
    } else {
      return { type: 'image', url: '', load: false }
    }
  }
  const [mediaUrl, setMediaUrl] = useState<{
    type: 'video' | 'image' | null
    url: string
    load: boolean
  }>({ type: 'image', url: '', load: false })

  useEffect(() => {
    setMediaUrl({ load: true, type: null, url: '' })
    getMediaUrl().then((data) => {
      setMediaUrl(data)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url])

  return {
    mediaUrl
  }
}
