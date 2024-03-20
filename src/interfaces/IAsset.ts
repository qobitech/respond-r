export interface IAsset {
  id: string
  shortCode: string
  name: string
  type: string
  category: string
  status: string
  location: {
    longitude: string
    latitude: string
    city: string
    state: string
    country: string
    map: string
    words: string
    nearestPlace: string
  }
  contact: {
    name: string
    phone: string
    role: string
  }
  createdBy: { id: number; userName: string }
  createdAt: string
  updatedAt: string
}

export interface IAssets {
  data: IAsset[]
  currentPage: number
  lastPage: number
  total: number
  pageSize: number
}

export interface ICreateAsset {
  shortCode: string
  name: string
  type: string
  category: string
  status: string
  location: {
    longitude: string
    latitude: string
  }
  contact: {
    name: string
    phone: string
    role: string
  }
  createdBy: {
    id: number
    userName: string
  }
}

export type assetType =
  | "police-vehicle"
  | "fire-truck"
  | "police"
  | "street-camera"
  | "frsc-patrol"
  | "hospital"
  | "ambulance"
  | "police-station"
  | "traffic-light"
  | "drts-patrol"
