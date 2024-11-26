import { ISearchVehicle, IVehicle } from 'interfaces/IVehicle'
import { chkType } from './utils'
import { IFeed } from 'interfaces/IStream'

export const getUrl = (urlKey: chkType) => {
  const url = localStorage.getItem(urlKey)
  return url
}

export const isUrlExist = (urlKey: chkType, url: string) => {
  return getUrl(urlKey) === url
}

export const setUrl = (urlKey: chkType, value: string) => {
  if (isUrlExist(urlKey, value)) return
  localStorage.removeItem(urlKey)
  localStorage.setItem(urlKey, value)
}

export const setUrls = (data: any) => {
  for (const i in data) {
    if (data[i]) setUrl(i as chkType, data[i])
  }
}

export const getFilePath = (i: string) => {
  if (!i) return ''
  if (i.includes('http')) return i.replaceAll('\\', '/')
  if (!getUrl('filePath')) return ''
  return getUrl('filePath') + `/` + i.replaceAll('\\', '/')
}

export const getStatus = (val?: boolean) => {
  if (val) return 'Valid'
  return 'Expired'
}

export const convertSearchDataToFeed = (
  i: ISearchVehicle | undefined | null
): IFeed => ({
  cameraName: i?.cameraName || '',
  classification: i?.classification || '',
  code: i?.code || '',
  colour: i?.color || '',
  filePath: i?.filePath || '',
  flags: i?.flags || [],
  isOnBlackList: i?.isOnBlackList || false,
  isUploaded: !!i?.isUploaded,
  make: i?.make || '',
  model: i?.model || '',
  orientation: i?.orientation || '',
  regNumber: i?.regNumber || '',
  timeStamp: i?.timeStamp || '',
  vehicleType: i?.model || ''
})

export const convertRemoteSearchDataToFeed = (
  i: IVehicle | undefined | null
): IFeed => ({
  cameraName: '',
  classification: i?.classification || '',
  code: i?.code || '',
  colour: i?.color || '',
  filePath: i?.mainImageUrl ? i?.mainImageUrl.replace('?dl=0', '?raw=1') : '',
  flags: i?.flags || [],
  isOnBlackList: i?.hasFlag || false,
  isUploaded: false,
  make: i?.make || '',
  model: i?.model || '',
  orientation: '',
  regNumber: i?.regNumber || '',
  timeStamp: '',
  vehicleType: i?.model || ''
})

export const getDate = (val: string) => {
  return new Date(val).toDateString()
}
