import * as utils from "../../services/new/utils"
import { vehicles } from "store/types"

export const getVehicleByRegNumber = (query: string) => {
  return utils.httpGetMethod({
    apiData: {
      url: "",
      customurl: `http://localhost:9003/api/v1/Vehicle/${query || "kwl76bz"}`,
      header: utils.header(""),
    },
    actionType: vehicles.getVehicleByRegNumber,
  })
}

export const searchVehicleByRegNumber = (query: string) => {
  return utils.httpGetMethod({
    apiData: {
      url: "",
      customurl: `http://localhost:8016/api/v1/Vehicle/search/regNumber/${
        query || ""
      }`,
      header: utils.header(""),
    },
    actionType: vehicles.searchVehicleByRegNumber,
  })
}

export const searchVehicleByChasisNumber = (query: string) => {
  return utils.httpGetMethod({
    apiData: {
      url: "",
      customurl: `http://localhost:8016/api/v1/Vehicle/search/chasis/${
        query || ""
      }`,
      header: utils.header(""),
    },
    actionType: vehicles.searchVehicleByChasisNumber,
  })
}
