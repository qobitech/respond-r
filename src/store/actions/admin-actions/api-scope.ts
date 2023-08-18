import { etraffica_baseurl, identity_server } from "utils/constants"
import * as utils from "../../services/new/utils"
import { apiScopeType } from "store/types"

export const getAPIScopes = () => {
  return utils.httpGetMethod({
    apiData: {
      url: "",
      customurl: `${identity_server}/GeApiScopes`,
      header: utils.header(""),
    },
    actionType: apiScopeType.getAPIScopes,
  })
}

export const createAPIScope = (data: object, update?: boolean) => {
  return utils.httpPostMethod({
    apiData: {
      url: "",
      customurl: update
        ? `${etraffica_baseurl}/Roles/CreateApiScope`
        : `${etraffica_baseurl}/Admin/UserManagement/CreateUser`,
      header: utils.headerNoAuth(),
      data,
    },
    actionType: update
      ? apiScopeType.updateAPIScope
      : apiScopeType.createAPIScope,
  })
}
