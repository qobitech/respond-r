import { baseurl } from "utils/constants"
import * as utils from "../../services/new/utils"
import { action } from "store/types"

export const getAllAction = (query: string) => {
  return utils.httpGetMethod({
    apiData: {
      url: "",
      customurl: `${baseurl}/Action${query || ""}`,
      header: utils.header(""),
    },
    actionType: action.getAllAction,
  })
}

export const createAction = (
  data: object,
  update?: boolean,
  onSuccess?: (res: any) => void,
  onFailure?: (err: any) => void
) => {
  if (!update)
    return utils.httpPostMethod({
      apiData: {
        url: "",
        customurl: `${baseurl}/Action`,
        header: utils.header(""),
        data,
      },
      actionType: action.createAction,
      onSuccess: (res) => {
        onSuccess?.(res)
      },
      onFailure: (err) => {
        onFailure?.(err)
      },
    })
  return utils.httpPutMethod({
    apiData: {
      url: "",
      customurl: `${baseurl}/Action`,
      header: utils.header(""),
      data,
    },
    actionType: action.createAction,
    onSuccess: (res) => {
      onSuccess?.(res)
    },
    onFailure: (err) => {
      onFailure?.(err)
    },
  })
}

export const getActionsForRole = (
  name: string,
  onSuccess?: (res: any) => void,
  onFailure?: (err: any) => void
) => {
  return utils.httpPostMethod({
    apiData: {
      url: "",
      customurl: `${baseurl}/Action/getactionsforrole?roleName=${name}`,
      header: utils.header(""),
    },
    actionType: action.getActionsForRole,
    onSuccess: (res) => {
      onSuccess?.(res)
    },
    onFailure: (err) => {
      onFailure?.(err)
    },
  })
}

export const addActionToRole = (
  data: object,
  onSuccess?: (res: any) => void,
  onFailure?: (err: any) => void
) => {
  return utils.httpPostMethod({
    apiData: {
      url: "",
      customurl: `${baseurl}/Role/addActionsToRole`,
      header: utils.header(""),
      data,
    },
    actionType: action.addActionToRole,
    onSuccess: (res) => {
      onSuccess?.(res)
    },
    onFailure: (err) => {
      onFailure?.(err)
    },
  })
}

export const deleteAction = (
  data: { actionIds: number[] },
  onSuccess?: (res: any) => void,
  onFailure?: (err: any) => void
) => {
  return utils.httpDeleteMethod({
    apiData: {
      url: "",
      customurl: `${baseurl}/Action`,
      header: utils.header(""),
      data,
    },
    actionType: action.deleteAction,
    onSuccess: (res) => {
      onSuccess?.(res)
    },
    onFailure: (err) => {
      onFailure?.(err)
    },
  })
}
