import { baseurl } from "utils/constants"
import * as utils from "../../services/new/utils"
import { organization } from "store/types"

export const getOrganizationInfo = (query: string) => {
  return utils.httpGetMethod({
    apiData: {
      url: "",
      customurl: `${baseurl}/Organization/GetAll${query}`,
      header: utils.header(""),
    },
    actionType: organization.getOrganizationInfo,
  })
}

export const getAllOrganizations = (query: string) => {
  return utils.httpGetMethod({
    apiData: {
      url: "",
      customurl: `${baseurl}/Organization/GetAll${query}`,
      header: utils.header(""),
    },
    actionType: organization.getAllOrganizations,
  })
}

export const deleteOrganization = (id: string) => {
  return utils.httpDeleteMethod({
    apiData: {
      url: "",
      customurl: `${baseurl}/Organization/Delete`,
      header: utils.header(""),
    },
    actionType: organization.deleteOrganization,
  })
}
