import { ORGANIZATION, ROLE, orgType } from "utils/new/constants"

const GODUSER = ROLE === "super-admin" && ORGANIZATION === "all"

const errorPage = "/login"

const isView = (org: orgType, url: string) =>
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
  FIRESERVICE: isView("fire-service", "/dashboard/fire-service"),
  MEDICAL: isView("e-medical", "/dashboard/e-medical"),
  MANAGEMENT:
    GODUSER || ROLE === "super-admin" ? "/dashboard/management" : errorPage,
  PAGE404: "",
}

export const getOverview = () => {
  switch (ORGANIZATION) {
    case "e-medical":
      return url.MEDICAL
    case "e-police":
      return url.POLICE
    case "e-traffic":
      return url.TRAFFIC
    case "fire-service":
      return url.FIRESERVICE
    case "all":
      return url.MANAGEMENT
    default:
      return "/"
  }
}
