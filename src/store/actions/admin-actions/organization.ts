import { ActionEnums } from 'enums/ActionEnums';
import { deleteRequest, getRequest } from 'store/services';
import { etraffica_baseurl } from 'utils/constants';
import { SET_ALL_ORGANIZATIONS,SET_ORGANIZATION_INFO } from '../types';

const getOrganizationInfo = ( PageNumber?: number, PageSize?: number, query?: string ) => 
	getRequest({
		url: `${etraffica_baseurl}/Organization/GetAll`,
		actionEnum: ActionEnums.GET_ORGANIZATION_INFO, disPatch: [{type: SET_ORGANIZATION_INFO, payload: 'organizations' }],
		PageNumber, PageSize, query
	});

const getAllOrganizations = (PageNumber?: number, PageSize?: number, query?: string) => 	
	getRequest({
		url: `${etraffica_baseurl}/Organization/GetAll`,
		actionEnum: ActionEnums.GET_ALL_ORGANIZATIONS, disPatch: [{type: SET_ALL_ORGANIZATIONS, payload: 'organizations' }], PageNumber, PageSize, query
	});

const deleteOrganization = ( id : number ) => 
	deleteRequest({
		url: `${etraffica_baseurl}/Organization/Delete`,
		actionEnum: ActionEnums.DELETE_ORGANIZATION, id
	});

export { getOrganizationInfo, getAllOrganizations, deleteOrganization, };