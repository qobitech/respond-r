import { baseurl } from "utils/constants"
import * as utils from "../../services/new/utils"
import { role } from "store/types"

export const getAllRoles = (query: string) => {
  return utils.httpGetMethod({
    apiData: {
      url: "",
      customurl: `${baseurl}/Roles/GetAll${query || ""}`,
      header: utils.header(""),
    },
    actionType: role.getAllRoles,
  })
}

export const createRole = (data: object, update?: boolean) => {
  return utils.httpPostMethod({
    apiData: {
      url: "",
      customurl: update ? `${baseurl}/roles/Update` : `${baseurl}/Roles/Create`,
      header: utils.header(""),
      data,
    },
    actionType: update ? role.updateRole : role.createRole,
  })
}

export const deleteRole = (id: string) => {
  return utils.httpDeleteMethod({
    apiData: {
      url: "",
      customurl: `${baseurl}/Roles/Delete`,
      header: utils.header(""),
    },
    actionType: role.deleteRole,
  })
}

export const getPermissions = (query: string) => {
  return utils.httpGetMethod({
    apiData: {
      url: "",
      customurl: `${baseurl}/Permissions/GetAll`,
      header: utils.header(""),
    },
    actionType: role.getPermissions,
  })
}
