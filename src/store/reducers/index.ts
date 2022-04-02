import { combineReducers } from "redux";
import adminReducer from "./adminReducer";
import httpReducer from './httpReducer'
import authReducer from './authReducer'

const rootReducer = combineReducers({
    admin: adminReducer,
    http: httpReducer,
    auth: authReducer
});

export default rootReducer;