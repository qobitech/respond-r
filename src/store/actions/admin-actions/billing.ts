import { ActionEnums } from 'enums/ActionEnums';
import { deleteRequest, getRequest, postRequest } from 'store/services';
import { etraffica_baseurl } from 'utils/constants';
import { SET_API_BUNDLES, SET_API_BUNDLE_BY_ID, SET_API_CONFIGS, SET_API_CONFIG_GROUPS, SET_CLIENT_SUBSCRIPTIONS } from '../types';

const getAPIBundles = (PageNumber?: number, PageSize?: number, query?: string) => 
	getRequest({
		url: `${etraffica_baseurl}/api-bundles/GetAll`,
		actionEnum: ActionEnums.GET_API_BUNDLES, disPatch: [{type: SET_API_BUNDLES, payload: 'bundles' }], PageNumber, PageSize, query
	});

const getAPIBundleById = (id: number) => 	
	getRequest({
		url: `${etraffica_baseurl}/api-bundles/Details`,
		actionEnum: ActionEnums.GET_API_BUNDLE_BY_ID, disPatch: [{type: SET_API_BUNDLE_BY_ID, payload: 'bundle' }], id
	});

const clearAPIBundleById = () => (dispatch:Function) => {
	dispatch({ type: SET_API_BUNDLE_BY_ID, payload: {} })
};

const createAPIBundle = ( data : object, update?: boolean ) => 
	postRequest({
		url: update ? `${etraffica_baseurl}/api-bundles/Update` : `${etraffica_baseurl}/api-bundles/Create`,
		actionEnum: update ? ActionEnums.UPDATE_API_BUNDLE : ActionEnums.CREATE_API_BUNDLE,
		data, update
	});

const deleteAPIBundle = (id: number) => 
	deleteRequest({
		url: `${etraffica_baseurl}/api-bundles/Delete`,
		actionEnum: ActionEnums.DELETE_API_BUNDLE, id
	});

const getAPIConfigs = (PageNumber?: number, PageSize?: number, query?: string) => 
	getRequest({
		url: `${etraffica_baseurl}/api-configurations/GetAll`,
		actionEnum: ActionEnums.GET_API_CONFIGS, disPatch: [{type: SET_API_CONFIGS, payload: 'configurations' }], PageNumber, PageSize, query
	});

const createAPIConfig = ( data : object, update?: boolean ) => 
	postRequest({
		url: update ? `${etraffica_baseurl}/api-configurations/Update` : `${etraffica_baseurl}/api-configurations/Create`,
		actionEnum: update ? ActionEnums.UPDATE_API_CONFIG : ActionEnums.CREATE_API_CONFIG,
		data, update
	});

const deleteAPIConfig = (id: number) =>
	deleteRequest({
		url: `${etraffica_baseurl}/api-configurations/Delete`,
		actionEnum: ActionEnums.DELETE_API_CONFIG, id
	});

const getAPIConfigGroups = (PageNumber?: number, PageSize?: number, query?: string) => 
	getRequest({
		url: `${etraffica_baseurl}/api-configurations/Group/GetAll`,
		actionEnum: ActionEnums.GET_API_CONFIG_GROUPS, disPatch: [{type: SET_API_CONFIG_GROUPS, payload: 'configurationGroups' }], PageNumber, PageSize, query
	});

const createAPIConfigGroup = ( data : object, update?: boolean ) => 
	postRequest({
		url: update ? `${etraffica_baseurl}/api-configurations/Group/Create/Update` : `${etraffica_baseurl}/api-configurations/Group/Create`,
		actionEnum: update ? ActionEnums.UPDATE_API_CONFIG_GROUP : ActionEnums.CREATE_API_CONFIG_GROUP,
		data, update
	});

const getClientSubscriptions = (PageNumber?: number, PageSize?: number, query?: string) => 
	getRequest({
		url: `${etraffica_baseurl}/subscriptions/GetAll`,
		actionEnum: ActionEnums.GET_CLIENT_SUBSCRIPTIONS, disPatch: [{type: SET_CLIENT_SUBSCRIPTIONS, payload: 'subscriptions' }], PageNumber, PageSize, query
	});

const subscribeToBundle = ( data : object ) => 
	postRequest({
		url: `${etraffica_baseurl}/subscriptions/Subscribe`,
		actionEnum: ActionEnums.SUBSCRIBE_TO_BUNDLE, data,
	});

const addAppsToSub = ( data: Array<{ applicationId: number, organizationSubscriptionId: number }> ) => 
	postRequest({
		url: `${etraffica_baseurl}/subscriptions/Subscribe/AddClient`,
		actionEnum: ActionEnums.ADD_APP_TO_SUB, data,
	});


export { 
	getAPIBundles, getAPIBundleById, clearAPIBundleById, createAPIBundle, deleteAPIBundle, getAPIConfigs, 
	createAPIConfig, deleteAPIConfig, getAPIConfigGroups, createAPIConfigGroup, getClientSubscriptions, 
	subscribeToBundle, addAppsToSub 
};