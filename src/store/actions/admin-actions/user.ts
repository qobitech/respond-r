import { baseurl } from "utils/constants"
import * as utils from "../../services/new/utils"
import { user } from "store/types"

export const createUser = (
  data: object,
  onSuccess?: (res: any) => void,
  onFailure?: (err: any) => void
) => {
  return utils.httpPostMethod({
    apiData: {
      url: "",
      customurl: `${baseurl}/Auth/register`,
      header: utils.header(""),
      data,
    },
    actionType: user.createUser,
    onSuccess: (res) => {
      onSuccess?.(res)
    },
    onFailure: (err) => {
      onFailure?.(err)
    },
  })
}

export const getAllUsers = (query: string) => {
  return utils.httpGetMethod({
    apiData: {
      url: "",
      customurl: `${baseurl}/User/${query}`,
      header: utils.header(""),
    },
    actionType: user.getAllUsers,
  })
}

export const getUserById = (id: string) => {
  return utils.httpGetMethod({
    apiData: {
      url: "",
      customurl: `${baseurl}/Admin/UserManagement/${id || ""}`,
      header: utils.header(""),
    },
    actionType: user.getUserById,
  })
}

export const deleteUser = (id: string) => {
  return utils.httpDeleteMethod({
    apiData: {
      url: "",
      customurl: `${baseurl}/Admin/UserManagement/DeleteUser`,
      header: utils.header(""),
    },
    actionType: user.deleteUser,
  })
}
