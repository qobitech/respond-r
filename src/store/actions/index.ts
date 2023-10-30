import * as authactions from "../actions/auth-actions"
import * as globalactions from "./global"
import * as apiscopeactions from "./admin-actions/api-scope"
import * as applicationactions from "./admin-actions/application"
import * as billingactions from "./admin-actions/billing"
import * as organizationactions from "./admin-actions/organization"
import * as roleactions from "./admin-actions/role"
import * as useractions from "./admin-actions/user"
import * as vehicleactions from "./admin-actions/vehicles"
import * as demoActions from "./admin-actions/get-demo-actions"

export const actions = {
  ...authactions,
  ...globalactions,
  ...apiscopeactions,
  ...applicationactions,
  ...billingactions,
  ...organizationactions,
  ...roleactions,
  ...useractions,
  ...vehicleactions,
  ...demoActions,
}
