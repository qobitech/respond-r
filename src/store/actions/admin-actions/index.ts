import axios from 'axios';
import { getAllApplications, createApplication } from './application';
import { createUser, getAllUsers, deleteUser } from './user';
import { getOrganizationInfo, getAllOrganizations, deleteOrganization } from './organization';
import { getAPIBundles, getAPIBundleById, clearAPIBundleById, createAPIBundle, deleteAPIBundle, getAPIConfigs, 
	createAPIConfig, deleteAPIConfig, getAPIConfigGroups, createAPIConfigGroup, getClientSubscriptions, subscribeToBundle,
	addAppsToSub
} from './billing';
import { getAPIScopes, createAPIScope } from './api-scope';
import { getAllRoles, createRole, deleteRole, getPermissions } from './role';
import { CLEAR_NOTIFICATION, SET_TABLE_INDEX } from '../types';

export const isDefined = ( pageNumber : number | undefined, pageSize : number | undefined  ) => {
	return pageNumber !== undefined && pageSize !== undefined  
};

const token = localStorage.getItem('CentralDatabaseToken');
axios.defaults.headers.common["Authorization"] = token;

const setTableIndex = (index: string) => ( dispatch : Function ) => {
	dispatch({ type: SET_TABLE_INDEX, payload: index })
}

const clearNotification = (  ) => ( dispatch : Function ) =>{
	dispatch({ type: CLEAR_NOTIFICATION })
};

export { 
	clearNotification, setTableIndex, createUser, getAllUsers, deleteUser, getAllApplications, createApplication, 
	getOrganizationInfo, getAllOrganizations, deleteOrganization, getAPIScopes, createAPIScope, getAllRoles, createRole, 
	deleteRole, getPermissions, getAPIBundles, getAPIBundleById, clearAPIBundleById, deleteAPIBundle, createAPIBundle, 
	getAPIConfigs, createAPIConfig, deleteAPIConfig, getAPIConfigGroups, createAPIConfigGroup, getClientSubscriptions, 
	subscribeToBundle, addAppsToSub 
};