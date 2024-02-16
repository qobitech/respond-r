export interface IReport {
  id: string
  userId: string
  description: string
  latitude: string
  longitude: string
  nearestPlace: string
  city: string
  state: string
  country: string
  map: string
  words: string
  deviceId: string
  mediaFiles: string[]
  createdAt: string
  updatedAt: string
  canBeContacted: boolean
  referenceId: string
  status: string
}

export interface IReports {
  data: IReport[]
  currentPage: number
  lastPage: number
  total: number
  pageSize: number
}
