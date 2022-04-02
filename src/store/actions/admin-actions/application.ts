import { ActionEnums } from 'enums/ActionEnums';
import { getRequest, postRequest } from 'store/services';
import { etraffica_baseurl } from 'utils/constants';
import { SET_ALL_APPLICATIONS } from '../types';

const getAllApplications = (PageNumber?: number, PageSize?: number, query?: string) =>
	getRequest({
		url: `${etraffica_baseurl}/Applications/GetAll`,
		actionEnum: ActionEnums.GET_ALL_APPLICATIONS,
		disPatch: [{type: SET_ALL_APPLICATIONS, payload: 'applications' }], PageNumber, PageSize, query,
	});

const createApplication = ( data : object, update?: boolean ) => 
	postRequest({
		url: update ? `${etraffica_baseurl}/Applications/Create` : `${etraffica_baseurl}/Applications/Create`,
		actionEnum: update ? ActionEnums.UPDATE_APPLICATION : ActionEnums.CREATE_APPLICATION,
		data, update
	});

export { getAllApplications, createApplication };