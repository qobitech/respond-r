import { managementTabEnums } from "components/dashboard/admin-management"
import { ORGANIZATION, ROLE, organizationEnumsType } from "utils/new/constants"
import { GODUSER } from "utils/new/constants/roles"

const errorPage = "/login"

const isView = (org: organizationEnumsType, url: string) =>
  GODUSER || ORGANIZATION === org ? url : errorPage

export const url = {
  LANDING_PAGE: "/",
  LOGIN: "/login",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  REGISTER: "/register",
  VERIFY_EMAIL: "/verify-email",
  INSTRUCTIONS: "/how-to",
  OVERVIEW: "/dashboard/overview",
  TRAFFIC: isView("e-traffic", "/dashboard/e-traffic"),
  POLICE: isView("e-police", "/dashboard/e-police"),
  FIRESERVICE: isView("firefighter", "/dashboard/fire-service"),
  MEDICAL: isView("ambulance", "/dashboard/e-medical"),
  MANAGEMENT:
    GODUSER || ROLE === "super-admin" ? "/dashboard/management" : errorPage,
  PAGE404: "",
}

export const getOverview = () => {
  switch (ORGANIZATION) {
    case "ambulance":
      return url.MEDICAL
    case "e-police":
      return url.POLICE
    case "e-traffic":
      return url.TRAFFIC
    case "firefighter":
      return url.FIRESERVICE
    case "respondR":
      return `${url.MANAGEMENT}/${managementTabEnums.USERS}`
    default:
      return "/"
  }
}
