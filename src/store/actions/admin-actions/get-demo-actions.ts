import { baseurlEPoliceTest } from "utils/constants"
import * as utils from "../../services/new/utils"
import { demoActions } from "store/types"

export const getDemoEPoliceNotifications = () => {
  return utils.httpGetMethod({
    apiData: {
      url: "",
      customurl: `${baseurlEPoliceTest}/Police`,
      header: utils.header(""),
    },
    actionType: demoActions.getDemoEPoliceNotifications,
  })
}
