import { combineReducers } from "redux"
import {
  IAPIScopeReducer,
  IApplicationReducer,
  IAuthReducer,
  IBillingReducer,
  IGlobalReducer,
  IOrganizationReducer,
  IRoleReducer,
  IStates,
  IUserReducer,
} from "interfaces/IReducer"

const rootReducer = combineReducers<IStates>({
  auth: reducer<IAuthReducer>,
  global: reducer<IGlobalReducer>,
  apiscope: reducer<IAPIScopeReducer>,
  application: reducer<IApplicationReducer>,
  billing: reducer<IBillingReducer>,
  organization: reducer<IOrganizationReducer>,
  role: reducer<IRoleReducer>,
  user: reducer<IUserReducer>,
})

function reducer<T>(state = {} as T, action: { type: string; payload: any }) {
  return { ...state, [action.type]: action.payload }
}

export default rootReducer
