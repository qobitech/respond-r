import { url } from "enums/Route"
import { baseurl } from "../../../utils/constants"
import * as utils from "../../services/new/utils"
import { authType } from "store/types"
import { TOKENKEY } from "utils/new/constants"
// import { ILogin } from "interfaces/IAuth"

const setAuthorizationHeader = (token: string) => {
  localStorage.setItem(TOKENKEY, token)
}

export const registerOrganization = (adminDetails: object) => {
  return utils.httpPostMethod({
    apiData: {
      url: "",
      customurl: `${baseurl}/UserManagement/OrganizationRegistration`,
      header: utils.headerNoAuth(),
      data: adminDetails,
    },
    actionType: authType.registerOrganization,
  })
}

export const verifyEmail = (data: object) => {
  return utils.httpPostMethod({
    apiData: {
      url: "",
      customurl: `${baseurl}/UserManagement/VerifyToken`,
      header: utils.headerNoAuth(),
      data,
    },
    actionType: authType.verifyEmail,
  })
}

export const userLogin = (data: { email: string; password: string }) => {
  return utils.httpPostMethod({
    apiData: {
      url: "",
      customurl: `${baseurl}/Auth/Login`,
      header: utils.headerNoAuth(),
      data,
    },
    actionType: authType.userLogin,
    onSuccess: (res: any) => {
      setAuthorizationHeader(res.token)
      setTimeout(() => {
        window.location.reload()
      }, 1500)
    },
  })
}

export const passwordReset = (data: object) => {
  return utils.httpPostMethod({
    apiData: {
      url: "",
      customurl: `${baseurl}/UserManagement/PasswordReset/UpdatePassword`,
      header: utils.headerNoAuth(),
      data,
    },
    actionType: authType.passwordReset,
  })
}

export const requestPasswordToken = (email: { [key: string]: any }) => {
  return utils.httpPostMethod({
    apiData: {
      url: "",
      customurl: `${baseurl}/PasswordReset/TokenLink/${email!?.email}`,
      header: utils.headerNoAuth(),
    },
    actionType: authType.requestPasswordToken,
    onSuccess: (res) => {
      if (res.status === 200) window.location.href = url.RESET_PASSWORD
    },
  })
}

export const verifyPasswordResetToken = (data: object) => {
  return utils.httpPostMethod({
    apiData: {
      url: "",
      customurl: `${baseurl}/PasswordReset/ValidateToken`,
      header: utils.headerNoAuth(),
      data,
    },
    actionType: authType.verifyPasswordResetToken,
  })
}

export const updatePassword = (data: object) => {
  return utils.httpPostMethod({
    apiData: {
      url: "",
      customurl: `${baseurl}/ChangePassword`,
      header: utils.headerNoAuth(),
      data,
    },
    actionType: authType.updatePassword,
  })
}

export const generateAccessToken = (data: object) => {
  return utils.httpPostMethod({
    apiData: {
      url: "",
      customurl: `${baseurl}/connect/token`,
      header: utils.headerNoAuth(),
      data,
    },
    actionType: authType.generateAccessToken,
  })
}

export const getRefreshToken = (data: object) => {
  return utils.httpPostMethod({
    apiData: {
      url: "",
      customurl: `${baseurl}/Session/RefreshToken`,
      header: utils.headerNoAuth(),
      data,
    },
    actionType: authType.getRefreshToken,
  })
}

export const logOut = () => (dispatch: Function) => {
  localStorage.clear()
  window.location.href = url.LOGIN
}
