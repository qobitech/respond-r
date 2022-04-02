import store from 'store';
import { Admins } from 'enums/Admins';

export const checkRole = ( action: string, roles: Array<string> ) => {
    if(roles!?.includes(action)) {
        return true
    }else {
        return false
    }
}; 

const state = store.getState();
const auth = state.auth;
const { loggedInDetails } = auth;
const { roles } = loggedInDetails || {};

export const SuperAdmin = checkRole(Admins.ADMIN, roles);
export const OrgAdmin = checkRole(Admins.ORG_ADMIN, roles);
export const OrgUser = checkRole(Admins.ORG_USER, roles);