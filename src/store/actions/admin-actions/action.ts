import { RESPONDR_CM_BASE_URL, RESPONDR_QR_BASE_URL } from 'app-constants'
import * as utils from '../../services/new/utils'
import { actionTypes } from 'store/types'

export const getAllAction = (query: string) => {
  return utils.httpGetMethod({
    apiData: {
      url: '',
      customurl: `${RESPONDR_QR_BASE_URL}/Action${query || ''}`,
      header: utils.header('')
    },
    actionType: actionTypes.getAllAction
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
        url: '',
        customurl: `${RESPONDR_CM_BASE_URL}/Action`,
        header: utils.header(''),
        data
      },
      actionType: actionTypes.createAction,
      onSuccess: (res) => {
        onSuccess?.(res)
      },
      onFailure: (err) => {
        onFailure?.(err)
      }
    })
  return utils.httpPutMethod({
    apiData: {
      url: '',
      customurl: `${RESPONDR_CM_BASE_URL}/Action`,
      header: utils.header(''),
      data
    },
    actionType: actionTypes.createAction,
    onSuccess: (res) => {
      onSuccess?.(res)
    },
    onFailure: (err) => {
      onFailure?.(err)
    }
  })
}

export const getActionsForRole = (
  name: string,
  onSuccess?: (res: any) => void,
  onFailure?: (err: any) => void
) => {
  return utils.httpGetMethod({
    apiData: {
      url: '',
      customurl: `${RESPONDR_QR_BASE_URL}/Action/getactionsforrole?roleName=${name}`,
      header: utils.header('')
    },
    actionType: actionTypes.getActionsForRole,
    onSuccess: (res) => {
      onSuccess?.(res)
    },
    onFailure: (err) => {
      onFailure?.(err)
    }
  })
}

export const addActionToRole = (
  data: object,
  onSuccess?: (res: any) => void,
  onFailure?: (err: any) => void
) => {
  return utils.httpPostMethod({
    apiData: {
      url: '',
      customurl: `${RESPONDR_CM_BASE_URL}/Role/addActionsToRole`,
      header: utils.header(''),
      data
    },
    actionType: actionTypes.addActionToRole,
    onSuccess: (res) => {
      onSuccess?.(res)
    },
    onFailure: (err) => {
      onFailure?.(err)
    }
  })
}

export const deleteAction = (
  data: { actionIds: number[] },
  onSuccess?: (res: any) => void,
  onFailure?: (err: any) => void
) => {
  return utils.httpDeleteMethod({
    apiData: {
      url: '',
      customurl: `${RESPONDR_CM_BASE_URL}/Action`,
      header: utils.header(''),
      data
    },
    actionType: actionTypes.deleteAction,
    onSuccess: (res) => {
      onSuccess?.(res)
    },
    onFailure: (err) => {
      onFailure?.(err)
    }
  })
}
