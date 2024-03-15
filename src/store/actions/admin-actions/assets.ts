import { baseurlReport, baseurlCommandReport } from "utils/constants"
import * as utils from "../../services/new/utils"
import { assets } from "store/types"

export const getAllAssets = () => {
  return utils.httpGetMethod({
    apiData: {
      url: "",
      customurl: `${baseurlReport}Asset/get-all-paged`,
      header: utils.header(""),
    },
    actionType: assets.getAllAssets,
  })
}

export const createAsset = () => {
  return utils.httpPostMethod({
    apiData: {
      url: "",
      customurl: `${baseurlReport}Asset`,
      header: utils.header(""),
    },
    actionType: assets.createAsset,
  })
}

export const getAssetById = (assetId: string) => {
  return utils.httpGetMethod({
    apiData: {
      url: "",
      customurl: `${baseurlCommandReport}Asset/${assetId}`,
      header: utils.header(""),
    },
    actionType: assets.getAssetById,
  })
}
