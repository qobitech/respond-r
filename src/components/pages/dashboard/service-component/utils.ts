import { IUseImage } from 'utils/hook'
import { typeConnectionStatus } from '../traffic/utils'
import { typeAdminSections } from '../admin-wrapper/utils'
import { IReport } from 'interfaces/IReport'
import { IATE } from 'store/actions/admin-actions/assets'
import { statusType } from '../asset/location-assets'
import { IAssets } from 'interfaces/IAsset'
import { IURS } from 'store/actions/admin-actions/report'
import { IReportReducer } from 'interfaces/IReducer'

export interface IPHUS<T> {
  feeds: T[]
  connectionStatus: typeConnectionStatus
  startConnection: (url: string) => void
  stopConnection: () => void
  handleFeedSelect: (feed: T | null) => void
  feed: T | null
  // handleDemoFeeds: (feeds: T[]) => void
}

export type typeSignalRURL =
  | 'SendFireEmergencyNotification'
  | 'SendPoliceEmergencyNotification'
  | 'SendMedicalEmergencyNotification'

export interface IMediaURL {
  mediaUrl: {
    type: 'video' | 'image' | null
    url: string
    load: boolean
  }
}

export const isImageExist = async (
  url: string,
  imgProps: IUseImage
): Promise<boolean> =>
  await new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      imgProps.handleLoad(true)
      resolve(true)
      cleanup()
    }
    img.onerror = () => {
      imgProps.handleError(true)
      resolve(false)
      cleanup()
    }
    img.src = url

    // Cleanup function to remove event listeners and clear the src attribute
    const cleanup = () => {
      img.onload = null
      img.onerror = null
      img.src = ''
      imgProps.handleLoad(false)
      imgProps.handleError(false)
    }
  })

export interface IPageComponent {
  section: typeAdminSections
  signalRURL: typeSignalRURL
}

export interface IMVL {
  feed: IReport | null
  assignAssets: (
    data: IATE,
    callBack: (status: statusType, id: string) => void
  ) => void
  assets: IAssets
  updateReport: (data: IURS) => void
  updateReportProps: IReportReducer
}
