import * as authactions from "../actions/auth-actions"
import * as globalactions from "./global"
import * as roleactions from "./admin-actions/role"
import * as organizationactions from "./admin-actions/organization"
import * as actionactions from "./admin-actions/action"
import * as useractions from "./admin-actions/user"
import * as vehicleactions from "./admin-actions/vehicles"
import * as demoActions from "./admin-actions/get-demo-actions"
import * as loggedActions from "./admin-actions/logged"
import * as reportActions from "./admin-actions/report"
import * as assetActions from "./admin-actions/assets"

export const actions = {
  ...authactions,
  ...globalactions,
  ...roleactions,
  ...useractions,
  ...vehicleactions,
  ...demoActions,
  ...organizationactions,
  ...actionactions,
  ...loggedActions,
  ...reportActions,
  ...assetActions,
}
