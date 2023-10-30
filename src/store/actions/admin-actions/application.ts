import { baseurl } from "utils/constants"
import * as utils from "../../services/new/utils"
import { applications } from "store/types"

export const getAllApplications = (query: string) => {
  return utils.httpGetMethod({
    apiData: {
      url: "",
      customurl: `${baseurl}/Applications/GetAll${query || ""}`,
      header: utils.header(""),
    },
    actionType: applications.getAllApplications,
  })
}

export const getApplicationById = (id: string) => {
  return utils.httpGetMethod({
    apiData: {
      url: "",
      customurl: `${baseurl}/Applications/${id}`,
      header: utils.header(""),
    },
    actionType: applications.getAllApplications,
  })
}

export const createApplication = (data: object, update?: boolean) => {
  return utils.httpPostMethod({
    apiData: {
      url: "",
      customurl: update
        ? `${baseurl}/Applications/Create`
        : `${baseurl}/Applications/Create`,
      header: utils.header(""),
      data,
    },
    actionType: update
      ? applications.updateApplication
      : applications.createApplication,
  })
}

export const deleteApplication = (id: number) => {
  return utils.httpDeleteMethod({
    apiData: {
      url: "",
      customurl: `${baseurl}/Applications/Delete/${id}`,
      header: utils.header(""),
    },
    actionType: applications.deleteApplication,
  })
}
