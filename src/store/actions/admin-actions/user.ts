import { RESPONDR_CM_BASE_URL, RESPONDR_QR_BASE_URL } from 'app-constants'
import * as utils from '../../services/new/utils'
import { userTypes } from 'store/types'

export const createUser = (
  data: object,
  onSuccess?: (res: any) => void,
  onFailure?: (err: any) => void
) => {
  return utils.httpPostMethod({
    apiData: {
      url: '',
      customurl: `${RESPONDR_CM_BASE_URL}/Auth/register`,
      header: utils.header(''),
      data
    },
    actionType: userTypes.createUser,
    onSuccess: (res) => {
      onSuccess?.(res)
    },
    onFailure: (err) => {
      onFailure?.(err)
    }
  })
}

export const getAllUsers = (query: string) => {
  return utils.httpGetMethod({
    apiData: {
      url: '',
      customurl: `${RESPONDR_QR_BASE_URL}/User/paged${query}`,
      header: utils.header('')
    },
    actionType: userTypes.getAllUsers
  })
}

export const getUserById = (id: string) => {
  return utils.httpGetMethod({
    apiData: {
      url: '',
      customurl: `${RESPONDR_QR_BASE_URL}/Admin/UserManagement/${id || ''}`,
      header: utils.header('')
    },
    actionType: userTypes.getUserById
  })
}

export const deleteUser = (id: string) => {
  return utils.httpDeleteMethod({
    apiData: {
      url: '',
      customurl: `${RESPONDR_CM_BASE_URL}/Admin/UserManagement/DeleteUser`,
      header: utils.header('')
    },
    actionType: userTypes.deleteUser
  })
}
