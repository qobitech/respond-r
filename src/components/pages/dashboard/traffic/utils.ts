import * as signalR from '@microsoft/signalr'
import { ILocation } from 'utils/map'
import { IStates } from 'interfaces/IReducer'
import { IFeed, IHit } from 'interfaces/IStream'
import { IVehicle } from 'interfaces/IVehicle'
import { ICell, ICellAction } from 'utils/report-table'

export interface IProps {
  states?: IStates
}

export interface ITableRecord {
  id: string
  row: ICell[]
  rowActions: ICellAction[]
}

export const tabEnum = {
  VEHICLEINFO: 'Vehicle Info',
  OFFENSES: 'Offenses',
  OWNERINFO: 'Owner Info',
  SOT: 'SOT',
  INSTANCE: 'Instance',
  NOTES: 'Notes'
}

export const getConnection = (url: string) => {
  return new signalR.HubConnectionBuilder()
    .withUrl(url, {
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets
    })
    .configureLogging(signalR.LogLevel.Trace)
    .withAutomaticReconnect()
    .build()
}

export type typeConnectionStatus =
  | 'connecting'
  | 'connected'
  | 're-connecting'
  | 'closed'

export interface IUS {
  hits: IHit[]
  feeds: IFeed[]
  connectionStatus: typeConnectionStatus
  startConnection: (url: string) => void
}

export const configFormEnums = {
  connectionUrl: 'connectionUrl',
  filePath: 'filePath',
  rtspUrl: 'rtspUrl',
  policeSignalR: 'policeSignalR',
  medicalSignalR: 'medicalSignalR',
  fireSignalR: 'fireSignalR',
  globalSignalR: 'globalSignalR'
} as const

export type chkType = (typeof configFormEnums)[keyof typeof configFormEnums]

export interface IUSIO {
  sendRTSPURL: (url: string) => void
  streamStatus: streamTypes | null
  stopRTSPFeed: () => void
  rtspurl: string | null
}

export type streamTypes = 'started' | 'loading' | 'error'

export const streamEnums = {
  STARTED: 'started',
  LOADING: 'loading',
  ERROR: 'error'
}

export interface IFeedFormHK {
  connectionUrl: string
  filePath: string
}

export interface IUFS {
  handleFilter: (selectedFilter?: string) => void
  selectedFilter: string | undefined
}

export interface ILHIC {
  imgSrc: string
  regNumber: string
  carMake: string
  carModel: string
  carColor: string
  offense: string
  handleOnClick?: () => void
}

export interface ILFIC {
  imgSrc: string
  regNumber: string
  carMake: string
  carType: string
  carColor: string
  offense: string
  handleOnClick?: () => void
}

export interface IVIS {
  vehicleData: IVehicle | undefined
}

export interface ILFS {
  filterProps: IUFS
  filters: string[]
}

export interface ILocationDetails {
  location: ILocation
  nearestPlace: string
  map: string
  markerContent?: JSX.Element
  markerColor?: string
  iconUrl?: string
  iconSize?: [number, number]
}
