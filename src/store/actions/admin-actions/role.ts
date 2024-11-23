import { RESPONDR_CM_BASE_URL, RESPONDR_QR_BASE_URL } from 'app-constants'
import * as utils from '../../services/new/utils'
import { roleTypes } from 'store/types'

export const getAllRoles = (query: string) => {
  return utils.httpGetMethod({
    apiData: {
      url: '',
      customurl: `${RESPONDR_QR_BASE_URL}/Role${query || ''}`,
      header: utils.header('')
    },
    actionType: roleTypes.getAllRoles
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
      url: '',
      customurl: update
        ? `${RESPONDR_CM_BASE_URL}/Role/update`
        : `${RESPONDR_CM_BASE_URL}/Role/addRole`,
      header: utils.header(''),
      data
    },
    actionType: roleTypes.createRole,
    onSuccess: (res) => {
      onSuccess?.(res)
    },
    onFailure: (err) => {
      onFailure?.(err)
    }
  })
}

export const deleteRole = (name: string) => {
  return utils.httpDeleteMethod({
    apiData: {
      url: '',
      customurl: `${RESPONDR_CM_BASE_URL}/Role/delete?roleName=${name}`,
      header: utils.header('')
    },
    actionType: roleTypes.deleteRole
  })
}

export const getPermissions = (query: string) => {
  return utils.httpGetMethod({
    apiData: {
      url: '',
      customurl: `${RESPONDR_CM_BASE_URL}/Permissions/GetAll`,
      header: utils.header('')
    },
    actionType: roleTypes.getPermissions
  })
}

export const getRolesForOrganisation = (id: string) => {
  return utils.httpGetMethod({
    apiData: {
      url: '',
      customurl: `${RESPONDR_CM_BASE_URL}/Role/getRolesForOrganisation?orgId=${id}`,
      header: utils.header('')
    },
    actionType: roleTypes.getRolesForOrganisation
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
      url: '',
      customurl: `${RESPONDR_CM_BASE_URL}/Action/UnassignMultiplectionsForRole`,
      header: utils.header(''),
      data
    },
    actionType: roleTypes.unassignMultipleActionsForRole,
    onSuccess: (res) => {
      onSuccess?.(res)
    },
    onFailure: (err) => {
      onFailure?.(err)
    }
  })
}
