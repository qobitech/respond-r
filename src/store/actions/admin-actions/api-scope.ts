import { ActionEnums } from 'enums/ActionEnums';
import { getRequest, postRequest } from 'store/services';
import { etraffica_baseurl, identity_server } from 'utils/constants';
import { SET_API_SCOPES } from '../types';

const getAPIScopes = () => 
	getRequest({
		url: `${identity_server}/GeApiScopes`,
		actionEnum: ActionEnums.GET_API_SCOPES, disPatch: [{type: SET_API_SCOPES, payload: 'scopes' }]
	});

const createAPIScope = ( data : object, update?: boolean ) => 
	postRequest({
		url: update ? `${etraffica_baseurl}/Roles/CreateApiScope` : `${etraffica_baseurl}/Admin/UserManagement/CreateUser`,
		actionEnum: update ? ActionEnums.UPDATE_API_SCOPE : ActionEnums.CREATE_API_SCOPE,
		data, update
	});

export { getAPIScopes, createAPIScope };