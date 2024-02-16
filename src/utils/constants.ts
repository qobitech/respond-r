export const pageurl = {
  LANDING_PAGE: "/",
  EMIAL_VERIFICATION: "/verify-email",
  OVERVIEW: "/dashboard",
  LOGIN: "/login",
  REGISTER: "/register",
}

// export const baseurl = process.env.REACT_APP_ETRAFFIKA_BASEURL;

// export const baseurl = "https://respondradmin.azurewebsites.net/api/v1"
export const baseurl =
  process.env.REACT_APP_BASEURL ||
  "https://respondradmin.azurewebsites.net/api/v1"
export const baseurlReport = process.env.REACT_APP_BASEURL_REPORT
export const baseurlEPoliceTest =
  "https://respondr-command-2b9239ad3a3a.herokuapp.com/api/v1"
export const identity_server = "https://identityserver.myapiservices.net/api/v1"
// https://identitymanager.myapiservices.net/api/v1/UserLogin
// export const baseurl = 'https://apigateway.myapiservices.net/identity-manager';

export const validEmailRegex = /\S+@\S+\.\S+/

export const naijaPhoneRegex = /^[+][0-9]\d{9,13}$/
// /^[+][1-9][0-9]{9,13}$/
