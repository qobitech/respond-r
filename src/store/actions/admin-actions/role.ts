import { ActionEnums } from 'enums/ActionEnums';
import { deleteRequest, getRequest, postRequest } from 'store/services';
import { etraffica_baseurl } from 'utils/constants';
import { SET_ALL_ROLES, SET_PERMISSIONS } from '../types';

const getAllRoles = () => 
	getRequest({
		url: `${etraffica_baseurl}/Roles/GetAll`,
		actionEnum: ActionEnums.GET_ALL_ROLES, disPatch: [{type: SET_ALL_ROLES, payload: 'roles' }]
	});

const createRole = ( data : object, update?: boolean ) => 
	postRequest({
		url: update ? `${etraffica_baseurl}/roles/Update` : `${etraffica_baseurl}/Roles/Create`,
		actionEnum: update ? ActionEnums.UPDATE_ROLE : ActionEnums.CREATE_ROLE,
		data, update
});

const deleteRole = ( id : string ) => 
	deleteRequest({
		url: `${etraffica_baseurl}/Roles/Delete`,
		actionEnum: ActionEnums.DELETE_ROLE, id: parseInt(id)
	});

const getPermissions = () => 
	getRequest({
		url: `${etraffica_baseurl}/Permissions/GetAll`,
		actionEnum: ActionEnums.GET_PERMISSIONS, disPatch: [{type: SET_PERMISSIONS, payload: 'permissions' }]
	});

export { getAllRoles, createRole, deleteRole, getPermissions };