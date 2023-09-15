interface IPropActions {
  dataAction: string
  dataLoading: string
  dataError: string
}

const generateActionTypes = <K extends string>(
  action: K[]
): { [R in K]: IPropActions } => {
  return Object.assign(
    {},
    ...action.map(
      (i) =>
        ({
          [i]: {
            dataAction: i,
            dataLoading: i + "Loading",
            dataError: i + "Error",
          },
        } as unknown as { [R in K]: IPropActions })
    )
  )
}

export const authType = generateActionTypes([
  "registerOrganization",
  "verifyEmail",
  "userLogin",
  "passwordReset",
  "requestPasswordToken",
  "verifyPasswordResetToken",
  "updatePassword",
  "generateAccessToken",
  "getRefreshToken",
])

export const globalType = generateActionTypes([
  "menuOpen",
  "subMenuOpen",
  "notifyUser",
  "rightSection",
])

export const apiScopeType = generateActionTypes([
  "getAPIScopes",
  "createAPIScope",
  "updateAPIScope",
])

export const applications = generateActionTypes([
  "getAllApplications",
  "getApplicationById",
  "deleteApplication",
  "createApplication",
  "updateApplication",
])

export const organization = generateActionTypes([
  "getOrganizationInfo",
  "getAllOrganizations",
  "deleteOrganization",
])

export const role = generateActionTypes([
  "getAllRoles",
  "createRole",
  "updateRole",
  "deleteRole",
  "getPermissions",
])

export const user = generateActionTypes([
  "createUser",
  "updateUser",
  "getAllUsers",
  "deleteUser",
  "getUserById",
])

export const billing = generateActionTypes([
  "getAPIBundles",
  "getAPIBundleById",
  "createAPIBundle",
  "updateAPIBundle",
  "deleteAPIBundle",
  "getAPIConfigs",
  "createAPIConfig",
  "updateAPIConfig",
  "deleteAPIConfig",
  "getAPIConfigGroups",
  "createAPIConfigGroup",
  "updateAPIConfigGroup",
  "getClientSubscriptions",
  "subscribeToBundle",
  "addAppsToSub",
])
