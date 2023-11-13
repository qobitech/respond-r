import { ISearchVehicle } from "interfaces/IVehicle"

export const MAX_DATA_COUNTER = 20

interface IT {
  [key: string]: any
}

const isDataExist = <T extends IT>(
  data: T,
  dataArray: T[],
  mapDataArray: (i: T) => string,
  keyId: string
) => {
  const temp = dataArray
  const index = temp.map(mapDataArray).indexOf(data[keyId])
  return index !== -1
}

const stackData = <T extends IT>(data: T, dataArray: T[]) => {
  const temp = dataArray
  temp.unshift(data)
  return temp
}

const removeData = <T extends IT>(dataArray: T[]) => {
  const temp = dataArray
  temp.splice(temp.length - 1, 1)
  return temp
}

export const handleDataStream = <T extends IT>(
  dataArray: T[],
  mapDataArray: (i: T) => string,
  keyId: string
) => {
  return (data: T) => {
    if (isDataExist(data, dataArray, mapDataArray, keyId)) return dataArray
    if (dataArray.length < MAX_DATA_COUNTER) {
      return stackData(data, dataArray)
    }
    if (dataArray.length === MAX_DATA_COUNTER) {
      const temp = removeData(dataArray)
      return stackData(data, temp)
    }
    return dataArray
  }
}

export const vehicleSearchDemoData = {
  cameraName: "ere",
  classification: "rer",
  code: "34565",
  color: "RED",
  createdAt: "34-12-2023",
  filePath: "eerefefe",
  flags: ["refrfr"],
  id: "23efrefew",
  isOnBlackList: false,
  isUploaded: "true",
  make: "CAMRY",
  model: "CAM",
  orientation: "erfefwe",
  registration: {
    category: "erferfwr",
    confidence: 20,
    localGovernment: "ijebu",
    state: "lagos",
  },
  regNumber: "dtgerfre",
  status: "dfefewf",
  timeStamp: "erferfwr",
  updatedAt: "ergerfer",
  uploadedAt: "wefwerggrwe",
  vehicleType: "erferfefew",
}

export const vsdd: ISearchVehicle[] = new Array(5).fill(vehicleSearchDemoData)
