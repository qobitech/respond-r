import { baseurl } from "utils/constants"
import * as utils from "../../services/new/utils"
import { organization } from "store/types"

export const getAllOrganization = (query: string) => {
  return utils.httpGetMethod({
    apiData: {
      url: "",
      customurl: `${baseurl}/Organisation/${query || ""}`,
      header: utils.header(""),
    },
    actionType: organization.getAllOrganization,
  })
}

export const createOrganization = (
  data: object,
  update?: boolean,
  onSuccess?: (res: any) => void,
  onFailure?: (err: any) => void
) => {
  return utils.httpPostMethod({
    apiData: {
      url: "",
      customurl: `${baseurl}/Organisation/${update ? "update" : "add"}`,
      header: utils.header(""),
      data,
    },
    actionType: update
      ? organization.updateOrganization
      : organization.createOrganization,
    onSuccess: (res) => {
      onSuccess?.(res)
    },
    onFailure: (err) => {
      onFailure?.(err)
    },
  })
}

export const deleteOrganization = (id: string) => {
  return utils.httpDeleteMethod({
    apiData: {
      url: "",
      customurl: `${baseurl}/Organisation/delete?id=${id}`,
      header: utils.header(""),
    },
    actionType: organization.deleteOrganization,
  })
}
