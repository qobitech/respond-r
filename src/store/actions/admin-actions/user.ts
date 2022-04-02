import { ActionEnums } from 'enums/ActionEnums';
import { deleteRequest, getRequest, postRequest } from 'store/services';
import { etraffica_baseurl } from 'utils/constants';
import { SET_ALL_USERS } from '../types';

const createUser = ( data : object, update?: boolean ) => 
	postRequest({
		url: update ? `${etraffica_baseurl}/Admin/UserManagement/UpdateUserDetails` : `${etraffica_baseurl}/Admin/UserManagement/CreateUser`,
		actionEnum: update ? ActionEnums.UPDATE_USER : ActionEnums.CREATE_USER,
		data, update
	});

const getAllUsers = (PageNumber?: number, PageSize?: number, query?: string) => 
	getRequest({
		url: `${etraffica_baseurl}/Admin/UserManagement/GetAllUsers`,
		actionEnum: ActionEnums.GET_ALL_USERS,  disPatch: [{type: SET_ALL_USERS, payload: 'users' }], PageNumber, PageSize, query
	});

const deleteUser = ( id : string ) => 
	deleteRequest({
		url: `${etraffica_baseurl}/Admin/UserManagement/DeleteUser`,
		actionEnum: ActionEnums.DELETE_USER, id: parseInt(id)
	});

export { createUser, getAllUsers, deleteUser };