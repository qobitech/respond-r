import * as utils from "../../services/new/utils"
import { vehicles } from "store/types"

export const getVehicleByRegNumber = (query: string) => {
  return utils.httpGetMethod({
    apiData: {
      url: "",
      customurl: `https://etraffika-m-vehicle-query.herokuapp.com/api/v1/Vehicle/${
        query || "kwl76bz"
      }`,
      header: utils.header(""),
    },
    actionType: vehicles.getVehicleByRegNumber,
  })
}

export const searchVehicleByRegNumber = (query: string) => {
  return utils.httpGetMethod({
    apiData: {
      url: "",
      customurl: `http://incar-query/api/v1/search/regNumber/${query || ""}`,
      header: utils.header(""),
    },
    actionType: vehicles.searchVehicleByRegNumber,
  })
}

export const searchVehicleByChasisNumber = (query: string) => {
  return utils.httpGetMethod({
    apiData: {
      url: "",
      customurl: `http://incar-query/api/v1/search/chasis/${query || ""}`,
      header: utils.header(""),
    },
    actionType: vehicles.searchVehicleByChasisNumber,
  })
}
