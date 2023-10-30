import { baseurl } from "utils/constants"
import * as utils from "../../services/new/utils"
import { billing } from "store/types"

export const getAPIBundles = (query: string) => {
  return utils.httpGetMethod({
    apiData: {
      url: "",
      customurl: `${baseurl}/api-bundles/GetAll${query || ""}`,
      header: utils.header(""),
    },
    actionType: billing.getAPIBundles,
  })
}

export const getAPIBundleById = (id: string) => {
  return utils.httpGetMethod({
    apiData: {
      url: "",
      customurl: `${baseurl}/api-bundles/Details/${id}`,
      header: utils.header(""),
    },
    actionType: billing.getAPIBundleById,
  })
}

export const createAPIBundle = (data: object, update?: boolean) => {
  return utils.httpPostMethod({
    apiData: {
      url: "",
      customurl: update
        ? `${baseurl}/api-bundles/Update`
        : `${baseurl}/api-bundles/Create`,
      header: utils.header(""),
      data,
    },
    actionType: update ? billing.updateAPIBundle : billing.createAPIBundle,
  })
}

export const deleteAPIBundle = (id: string) => {
  return utils.httpDeleteMethod({
    apiData: {
      url: "",
      customurl: `${baseurl}/api-bundles/Delete/${id}`,
      header: utils.header(""),
    },
    actionType: billing.deleteAPIBundle,
  })
}

export const getAPIConfigs = (query: string) => {
  return utils.httpGetMethod({
    apiData: {
      url: "",
      customurl: `${baseurl}/api-configurations/GetAll${query || ""}`,
      header: utils.header(""),
    },
    actionType: billing.getAPIConfigs,
  })
}

export const createAPIConfig = (data: object, update?: boolean) => {
  return utils.httpPostMethod({
    apiData: {
      url: "",
      customurl: update
        ? `${baseurl}/api-configurations/Update`
        : `${baseurl}/api-configurations/Create`,
      header: utils.header(""),
      data,
    },
    actionType: update ? billing.updateAPIConfig : billing.createAPIConfig,
  })
}

export const deleteAPIConfig = (id: string) => {
  return utils.httpDeleteMethod({
    apiData: {
      url: "",
      customurl: `${baseurl}/api-configurations/Delete/${id}`,
      header: utils.header(""),
    },
    actionType: billing.deleteAPIConfig,
  })
}

export const getAPIConfigGroups = (query: string) => {
  return utils.httpGetMethod({
    apiData: {
      url: "",
      customurl: `${baseurl}/api-configurations/Group/GetAll${query || ""}`,
      header: utils.header(""),
    },
    actionType: billing.getAPIConfigGroups,
  })
}

export const createAPIConfigGroup = (data: object, update?: boolean) => {
  return utils.httpPostMethod({
    apiData: {
      url: "",
      customurl: update
        ? `${baseurl}/api-configurations/Group/Create/Update`
        : `${baseurl}/api-configurations/Group/Create`,
      header: utils.header(""),
      data,
    },
    actionType: update
      ? billing.updateAPIConfigGroup
      : billing.createAPIConfigGroup,
  })
}

export const getClientSubscriptions = (query: string) => {
  return utils.httpGetMethod({
    apiData: {
      url: "",
      customurl: `${baseurl}/subscriptions/GetAll${query || ""}`,
      header: utils.header(""),
    },
    actionType: billing.getClientSubscriptions,
  })
}

export const subscribeToBundle = (data: object) => {
  return utils.httpPostMethod({
    apiData: {
      url: "",
      customurl: `${baseurl}/subscriptions/Subscribe`,
      header: utils.header(""),
      data,
    },
    actionType: billing.subscribeToBundle,
  })
}

export const addAppsToSub = (
  data: Array<{ applicationId: number; organizationSubscriptionId: number }>
) => {
  return utils.httpPostMethod({
    apiData: {
      url: "",
      customurl: `${baseurl}/subscriptions/Subscribe/AddClient`,
      header: utils.header(""),
      data,
    },
    actionType: billing.addAppsToSub,
  })
}
