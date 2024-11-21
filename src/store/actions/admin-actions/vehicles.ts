import { IN_CAR_QR_BASE_URL, VEHICLE_QR_BASE_URL } from 'utils/constants'
import * as utils from '../../services/new/utils'
import { vehicles } from 'store/types'

export const getVehicleByRegNumber = (query: string) => {
  return utils.httpGetMethod({
    apiData: {
      url: '',
      customurl: `${VEHICLE_QR_BASE_URL}/${query || 'kwl76bz'}`,
      header: utils.header('')
    },
    actionType: vehicles.getVehicleByRegNumber
  })
}

export const searchVehicleByRegNumber = (query: string) => {
  return utils.httpGetMethod({
    apiData: {
      url: '',
      customurl: `${IN_CAR_QR_BASE_URL}/search/regNumber/${query || ''}`,
      header: utils.header('')
    },
    actionType: vehicles.searchVehicleByRegNumber
  })
}

export const searchVehicleByChasisNumber = (query: string) => {
  return utils.httpGetMethod({
    apiData: {
      url: '',
      customurl: `${IN_CAR_QR_BASE_URL}/search/chasis/${query || ''}`,
      header: utils.header('')
    },
    actionType: vehicles.searchVehicleByChasisNumber
  })
}
