import * as utils from "../../services/new/utils"
import { vehicles } from "store/types"

export const getVehicleByRegNumber = (query: string) => {
  return utils.httpGetMethod({
    apiData: {
      url: "",
      customurl: `https://etraffika-m-vehicle-query.herokuapp.com/api/v1/Vehicle/${query}`,
      header: utils.header(""),
    },
    actionType: vehicles.getVehicleByRegNumber,
  })
}
