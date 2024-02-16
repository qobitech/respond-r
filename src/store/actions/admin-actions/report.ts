import { baseurlReport } from "utils/constants"
import * as utils from "../../services/new/utils"
import { report } from "store/types"

export const getAllReports = (organization: string, query?: string) => {
  return utils.httpGetMethod({
    apiData: {
      url: "",
      customurl: `${baseurlReport}/${organization}/get-all-paged${query || ""}`,
      header: utils.header(""),
    },
    actionType: report.getAllReports,
  })
}
