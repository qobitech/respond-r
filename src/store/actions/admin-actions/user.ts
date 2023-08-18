import { etraffica_baseurl } from "utils/constants"
import * as utils from "../../services/new/utils"
import { user } from "store/types"

export const createUser = (data: object, update?: boolean) => {
  return utils.httpPostMethod({
    apiData: {
      url: "",
      customurl: update
        ? `${etraffica_baseurl}/Admin/UserManagement/UpdateUserDetails`
        : `${etraffica_baseurl}/Admin/UserManagement/CreateUser`,
      header: utils.header(""),
      data,
    },
    actionType: update ? user.updateUser : user.createUser,
  })
}

export const getAllUsers = (query: string) => {
  return utils.httpGetMethod({
    apiData: {
      url: "",
      customurl: `${etraffica_baseurl}/Admin/UserManagement/GetAllUsers${
        query || ""
      }`,
      header: utils.header(""),
    },
    actionType: user.getAllUsers,
  })
}

export const getUserById = (id: string) => {
  return utils.httpGetMethod({
    apiData: {
      url: "",
      customurl: `${etraffica_baseurl}/Admin/UserManagement/${id || ""}`,
      header: utils.header(""),
    },
    actionType: user.getUserById,
  })
}

export const deleteUser = (id: string) => {
  return utils.httpDeleteMethod({
    apiData: {
      url: "",
      customurl: `${etraffica_baseurl}/Admin/UserManagement/DeleteUser`,
      header: utils.header(""),
    },
    actionType: user.deleteUser,
  })
}
