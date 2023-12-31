export interface IFeed {
  regNumber: string
  make: string
  model: string
  code: string
  classification: string
  colour: string
  orientation: string
  vehicleType: string
  filePath: string
  cameraName: string
  timeStamp: string
  isOnBlackList: boolean
  flags: Array<string | null>
  isUploaded: boolean
}

export interface IHit {
  regNumber: string
  vehicleId: string
  make: string
  model: string
  colour: string
  displayUrl: string
  flag: Array<string | null>
}
