export interface IDemoEPolice {
  Id: string
  UserId: string
  Description: string
  Latitude: string
  Longitude: string
  NearestPlace: string
  City: string
  State: string
  Country: string
  Map: string
  Words: string
  DeviceId: string
  MediaFiles: string[]
  CreatedAt: string
  UpdatedAt: string
  CanBeContacted: boolean
  ReferenceId: string
}

export interface IEPoliceRespondr {
  canBeContacted: boolean
  city: string
  country: string
  createdAt: string
  description: string
  deviceId: string
  id: string
  latitude: string
  longitude: string
  map: "https://w3w.co/assessing.stables.bidders"
  mediaFiles: string[]
  nearestPlace: string
  referenceId: string
  state: string
  status: number
  updatedAt: string
  userId: string
  words: string
}
