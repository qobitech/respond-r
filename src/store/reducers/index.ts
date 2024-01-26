import { combineReducers } from "redux"
import {
  IActionReducer,
  IAuthReducer,
  IDemoReducer,
  IGlobalReducer,
  IOrganizationReducer,
  IRoleReducer,
  IStates,
  IUserReducer,
  IVehicleReducer,
} from "interfaces/IReducer"

const rootReducer = combineReducers<IStates>({
  auth: reducer<IAuthReducer>,
  global: reducer<IGlobalReducer>,
  role: reducer<IRoleReducer>,
  user: reducer<IUserReducer>,
  vehicle: reducer<IVehicleReducer>,
  demo: reducer<IDemoReducer>,
  organization: reducer<IOrganizationReducer>,
  actions: reducer<IActionReducer>,
})

function reducer<T>(state = {} as T, action: { type: string; payload: any }) {
  return { ...state, [action.type]: action.payload }
}

export default rootReducer
