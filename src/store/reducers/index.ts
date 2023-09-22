import { combineReducers } from "redux"
import {
  IAuthReducer,
  IGlobalReducer,
  IRoleReducer,
  IStates,
  IUserReducer,
} from "interfaces/IReducer"

const rootReducer = combineReducers<IStates>({
  auth: reducer<IAuthReducer>,
  global: reducer<IGlobalReducer>,
  role: reducer<IRoleReducer>,
  user: reducer<IUserReducer>,
})

function reducer<T>(state = {} as T, action: { type: string; payload: any }) {
  return { ...state, [action.type]: action.payload }
}

export default rootReducer
