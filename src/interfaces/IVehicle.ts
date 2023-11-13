interface ICarOwner {
  fullName: string
  phone: string
  email: string
  address: string
}

interface ICarLocation {
  latitude: string
  longitude: string
  address: string
}

export interface ISOTDetails {
  state: string
  regNumber: string
  owner: {
    fullName: string
    phone: string
    email: string
    address: string
  }
  engineNumber: string
  chassisNumber: string
  make: string
  model: string
  colour: string
  year: string
  registrationDate: string
  service: {
    inspection: null
    license: {
      expiryDate: string
      isActive: boolean
    }
    roadWorthiness: {
      expiryDate: string
      isActive: boolean
    }
  }
  createdAt: string
  transactionId: string
}

interface IMedia {
  publicId: string
  uri: string
  createdAt: string
}

export interface IInstance {
  camera: string
  createdAt: string
  imageUrl: string
}

export interface IVehicleOffense {
  id: string
  transactionId: string
  createdAt: string
  updatedAt: string
  latitude: string
  longitude: string
  address: string
  offense: {
    id: string
    name: string
    code: string
    description: string
    fineAmount: number
    finePoint: number
    additional: null
  }
  devise: {
    name: string
  }
  status: {
    id: string
    name: string
  }
  user: {
    id: number
    userName: string
  }
}

interface IVehicleWarning {
  id: string
  transactionId: string
  createdAt: string
  updatedAt: string
  location: {
    latitude: string
    longitude: string
    address: string
  }
  offense: {
    id: string
    name: string
    code: string
    description: string
    fineAmount: number
    finePoint: number
    additional: string
  }
  devise: {
    name: string
  }
  status: {
    id: string
    name: string
  }
  user: {
    id: number
    userName: string
  }
}

export interface IVehicleNote {
  message: string
  createdAt: string
  createdBy: {
    id: number
    userName: string
  }
}

export interface IVehicle {
  id: string
  regNumber: string
  code: string
  classification: string
  createdAt: string
  updatedAt: string
  make: string
  model: string
  color: string
  mainImageUrl: string
  engineNumber: string
  chassisNumber: string
  currentOwner: ICarOwner
  currentLocation: string
  createLocation: ICarLocation
  createDevise: {
    name: string
  }
  creationRequest: number
  isTaxi: boolean
  isAnonymous: boolean
  hasViolation: boolean
  hasWarning: boolean
  hasInsurance: boolean
  hasLicense: boolean
  hasRoadWorthiness: boolean
  hasExtraMedia: boolean
  hasMoreInstances: boolean
  hasExtraInstances: boolean
  isStolen: boolean
  hasNote: boolean
  hasBroadcast: boolean
  hasFlag: boolean
  isTruck: boolean
  hasMisMatch: boolean
  carMakerUrl: string
  instanceCount: number
  violationCount: number
  mediaCount: number
  warningCount: number
  organisation: {
    id: string
    name: string
  }
  vehicleInsurance: {
    isValid: boolean
    expiryDate: string
  }
  vehicleLicense: {
    isValid: boolean
    expiryDate: string
  }
  vehicleRoadWorthiness: {
    isValid: boolean
    expiryDate: string
  }
  sotDetails: ISOTDetails[]
  media: IMedia[]
  instances: IInstance[]
  vehicleOffenses: IVehicleOffense[]
  vehicleWarnings: IVehicleWarning[]
  notes: IVehicleNote[]
  tags: null
  flags: null | string[]
}

export interface IVehicleById {
  message: string
  status: number
  isSuccessful: boolean
  data: IVehicle
}

export interface ISearchVehicle {
  id: string
  regNumber: string
  code: string
  classification: string
  registration: {
    category: string
    localGovernment: string
    state: string
    confidence: number
  }
  orientation: string
  vehicleType: string
  isOnBlackList: boolean
  flags: null | string[]
  createdAt: string
  updatedAt: string
  make: string
  model: string
  color: string
  filePath: string
  timeStamp: string
  cameraName: string
  status: string
  isUploaded: string
  uploadedAt: string
}

export interface IVehicleSearch {
  message: string
  status: number
  isSuccessful: boolean
  data: {
    local: ISearchVehicle | null
    remote: IVehicle | null
  }
}
