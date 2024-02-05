import { baseurl } from "utils/constants"
import * as utils from "../../services/new/utils"
import { role } from "store/types"

export const getAllRoles = (query: string) => {
  return utils.httpGetMethod({
    apiData: {
      url: "",
      customurl: `${baseurl}/Role${query || ""}`,
      header: utils.header(""),
    },
    actionType: role.getAllRoles,
  })
}

export const createRole = (
  data: object,
  update?: boolean,
  onSuccess?: (res: any) => void,
  onFailure?: (err: any) => void
) => {
  return utils.httpPostMethod({
    apiData: {
      url: "",
      customurl: update ? `${baseurl}/Role/update` : `${baseurl}/Role/addRole`,
      header: utils.header(""),
      data,
    },
    actionType: role.createRole,
    onSuccess: (res) => {
      onSuccess?.(res)
    },
    onFailure: (err) => {
      onFailure?.(err)
    },
  })
}

export const deleteRole = (name: string) => {
  return utils.httpDeleteMethod({
    apiData: {
      url: "",
      customurl: `${baseurl}/Role/delete?roleName=${name}`,
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

export const getRolesForOrganisation = (id: string) => {
  return utils.httpGetMethod({
    apiData: {
      url: "",
      customurl: `${baseurl}/Role/getRolesForOrganisation?orgId=${id}`,
      header: utils.header(""),
    },
    actionType: role.getRolesForOrganisation,
  })
}

export const unassignMultipleActionsForRole = (
  data: {
    roleId: number
    actionIds: number[]
  },
  onSuccess?: (res: any) => void,
  onFailure?: (err: any) => void
) => {
  return utils.httpPostMethod({
    apiData: {
      url: "",
      customurl: `${baseurl}/Action/UnassignMultiplectionsForRole`,
      header: utils.header(""),
      data,
    },
    actionType: role.unassignMultipleActionsForRole,
    onSuccess: (res) => {
      onSuccess?.(res)
    },
    onFailure: (err) => {
      onFailure?.(err)
    },
  })
}
