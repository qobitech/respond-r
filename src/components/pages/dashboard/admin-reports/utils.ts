import { assetType, IAssets } from 'interfaces/IAsset'
import { IReport } from 'interfaces/IReport'
import moveable from 'assets/images/moveable.svg'
import police_vehicle from 'assets/images/asset_icons/police-vehicle.svg'
import fire_truck from 'assets/images/asset_icons/fire-truck.svg'
import police from 'assets/images/asset_icons/police.svg'
import street_camera from 'assets/images/asset_icons/street-camera.svg'
import frsc_patrol from 'assets/images/asset_icons/frsc-patrol.svg'
import hospital from 'assets/images/asset_icons/hospital.svg'
import ambulance from 'assets/images/asset_icons/ambulance.svg'
import police_station from 'assets/images/asset_icons/police-station.svg'
import traffic_light from 'assets/images/asset_icons/traffic-light.svg'
import drts_patrol from 'assets/images/asset_icons/drts-patrol.svg'
import { IATE } from 'store/actions/admin-actions/assets'
import { statusType } from '../asset/location-assets'
import { IURS } from 'store/actions/admin-actions/report'
import { IReportReducer } from 'interfaces/IReducer'
import { ITableRecord } from 'utils/report-table'

export interface IReportData<T> {
  title: string
  data: T[]
}

export interface ObjectType {
  [key: string]: IReport[]
}

export const getIconUrl = (type: assetType) => {
  switch (type) {
    case 'ambulance':
      return ambulance
    case 'drts-patrol':
      return drts_patrol
    case 'fire-truck':
      return fire_truck
    case 'frsc-patrol':
      return frsc_patrol
    case 'hospital':
      return hospital
    case 'police':
      return police
    case 'police-station':
      return police_station
    case 'police-vehicle':
      return police_vehicle
    case 'street-camera':
      return street_camera
    case 'traffic-light':
      return traffic_light
    default:
      return moveable
  }
}

export interface IVRI {
  backToAllReports: () => void
  feed?: IReport | null
  assignAssets: (
    data: IATE,
    callBack: (status: statusType, id: string) => void
  ) => void
  assets: IAssets
  updateReport: (data: IURS) => void
  updateReportProps: IReportReducer
}

export interface IReportSection {
  reportsGroupedByDate: ObjectType
  getTableReport: (data: IReport[]) => ITableRecord[]
  // lastCardElementRef: (node: any) => void
  lastCardElementRef: React.RefObject<HTMLTableRowElement>
  hide?: boolean
}
