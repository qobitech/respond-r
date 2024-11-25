import { RESPONDR_CORE_BASE_URL } from 'app-constants'
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
      customurl: `${RESPONDR_CORE_BASE_URL}/Auth/register`,
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
      customurl: `${RESPONDR_CORE_BASE_URL}/User/paged${query}`,
      header: utils.header('')
    },
    actionType: userTypes.getAllUsers
  })
}

export const getUserById = (id: string) => {
  return utils.httpGetMethod({
    apiData: {
      url: '',
      customurl: `${RESPONDR_CORE_BASE_URL}/User/${id || ''}`,
      header: utils.header('')
    },
    actionType: userTypes.getUserById
  })
}

export const deleteUser = (email: string) => {
  return utils.httpDeleteMethod({
    apiData: {
      url: '',
      customurl: `${RESPONDR_CORE_BASE_URL}/User/email=${email}`,
      header: utils.header('')
    },
    actionType: userTypes.deleteUser
  })
}
