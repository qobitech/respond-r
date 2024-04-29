import { baseurlReport, isBaseURL } from "utils/constants"
import * as utils from "../../services/new/utils"
import { assets } from "store/types"

export const getAssets = () => {
  return utils.httpGetMethod({
    apiData: {
      url: "",
      customurl: `${baseurlReport}Asset/get-all-paged`,
      header: utils.header(""),
    },
    actionType: assets.getAssets,
  })
}

export interface IAssetQuery {
  overwrite?: "true" | "false"
  getLatest?: string
}

export const getAllAssets = ({ overwrite, getLatest }: IAssetQuery) => {
  const ov = overwrite === "true" ? "overwrite=true&" : ""
  const gl = getLatest === "true" ? "getLatest=true" : ""
  const q = ov || gl ? "?" : ""
  return utils.httpGetMethod({
    apiData: {
      url: "",
      customurl: `${baseurlReport}Asset/get-all${q}${ov}${gl}`,
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
      customurl: `${baseurlReport}Asset/${assetId}`,
      header: utils.header(""),
    },
    actionType: assets.getAssetById,
  })
}

export interface IATE {
  assignedBy: {
    id: number
    userName: string
  }
  emergency: {
    emergencyType: string
    emergencyId: string
  }
  assetId: string
}

export const assignAssetToEmergency = (
  data: IATE,
  onSuccess?: (res: any) => void,
  onFailure?: (err: any) => void
) => {
  return utils.httpPostMethod({
    apiData: {
      url: "",
      customurl: `${
        isBaseURL("commandURL") + "/api/v1/"
      }AllocationManager/assign-asset-to-emergency`,
      header: utils.header(""),
      data,
    },
    actionType: assets.assignAssetToEmergency,
    onSuccess,
    onFailure,
  })
}
