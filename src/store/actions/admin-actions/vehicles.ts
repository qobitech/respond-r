import { IN_CAR_QR_BASE_URL, VEHICLE_QR_BASE_URL } from 'app-constants'
import * as utils from '../../services/new/utils'
import { vehicleTypes } from 'store/types'

export const getVehicleByRegNumber = (query: string) => {
  return utils.httpGetMethod({
    apiData: {
      url: '',
      customurl: `${VEHICLE_QR_BASE_URL}/Vehicle/${query || 'kwl76bz'}`,
      header: utils.header('')
    },
    actionType: vehicleTypes.getVehicleByRegNumber
  })
}

export const searchVehicleByRegNumber = (query: string) => {
  return utils.httpGetMethod({
    apiData: {
      url: '',
      customurl: `${IN_CAR_QR_BASE_URL}/Vehicle/search/regNumber/${
        query || ''
      }`,
      header: utils.header('')
    },
    actionType: vehicleTypes.searchVehicleByRegNumber
  })
}

export const searchVehicleByChasisNumber = (query: string) => {
  return utils.httpGetMethod({
    apiData: {
      url: '',
      customurl: `${IN_CAR_QR_BASE_URL}/Vehicle/search/chasis/${query || ''}`,
      header: utils.header('')
    },
    actionType: vehicleTypes.searchVehicleByChasisNumber
  })
}
