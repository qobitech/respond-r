import { url } from 'app-constants/Route'
import * as utils from '../../services/new/utils'
import { authType } from 'store/types'
import { RESPONDR_CORE_BASE_URL, TOKENKEY } from 'app-constants'

const setAuthorizationHeader = (token: string) => {
  localStorage.setItem(TOKENKEY, token)
}

export const userLogin = (data: { email: string; password: string }) => {
  return utils.httpPostMethod({
    apiData: {
      url: '',
      customurl: `${RESPONDR_CORE_BASE_URL}/Auth/Login`,
      header: utils.headerNoAuth(),
      data
    },
    actionType: authType.userLogin,
    onSuccess: (res: any) => {
      setAuthorizationHeader(res.token)
      setTimeout(() => {
        window.location.reload()
      }, 1500)
    }
  })
}

export const passwordReset = (data: object) => {
  return utils.httpPostMethod({
    apiData: {
      url: '',
      customurl: `${RESPONDR_CORE_BASE_URL}/Auth/ResetPassword`,
      header: utils.headerNoAuth(),
      data
    },
    actionType: authType.passwordReset
  })
}

export const updatePassword = (data: object) => {
  return utils.httpPostMethod({
    apiData: {
      url: '',
      customurl: `${RESPONDR_CORE_BASE_URL}/Auth/changePassword`,
      header: utils.headerNoAuth(),
      data
    },
    actionType: authType.updatePassword
  })
}

export const logOut = () => (dispatch: Function) => {
  localStorage.removeItem('respondr-token')
  window.location.href = url.LOGIN
}
