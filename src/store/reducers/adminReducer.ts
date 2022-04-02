import {
	AXIOS_REQUEST, AXIOS_REQUEST_SUCCESS, AXIOS_REQUEST_FAILURE, SET_TOTAL_COUNT, SET_TOTAL_SEARCH_COUNT, SET_ALL_USERS, SET_ALL_APPLICATIONS, SET_ORGANIZATION_INFO, SET_ALL_ORGANIZATIONS, SET_API_SCOPES, SET_ALL_ROLES, SET_API_BUNDLES, SET_API_CONFIGS, SET_API_BUNDLE_BY_ID, SET_API_CONFIG_GROUPS, SET_CLIENT_SUBSCRIPTIONS, SET_PERMISSIONS, SET_TABLE_INDEX
} from "../actions/types";

const initialState = {
	authenticated: false,
	loading: false,
	action: '',
	errors: '',
	data: [],
	totalCount: 0,
	tableIndex: '',
	totalSearchCount: 0,
	users: [],
	applications: [],
	organizationInfo: [],
	organizations: [],
	apiScopes: [],
	apiBundles: [],
	apiBundleById: {},
	apiConfigs: [],
	apiConfigGroups: [],
	clientSubscriptions: [],
	roles: [],
	permissions: [],
};

const adminReducer = function (state = initialState, action: any) {
	switch (action.type) {
		case AXIOS_REQUEST:
			return {
				...state,
				loading: true,
				action: action.payload
			};
		case AXIOS_REQUEST_SUCCESS:
			return {
				...state,
				loading: false,
				data: action.payload,
				errors: ''
			};
		case AXIOS_REQUEST_FAILURE:
			return {
				...state,
				loading: false,
				data: [],
				errors: action.payload
			};
		case SET_TABLE_INDEX:
			return {
				...state,
				tableIndex: action.payload
			};
		case SET_TOTAL_COUNT:
			return {
				...state,
				totalCount : action.payload
			};
		case SET_TOTAL_SEARCH_COUNT:
			return {
				...state,
				totalSearchCount : action.payload
			};
		case SET_ALL_USERS:
			return {
				...state,
				users : action.payload
			};
		case SET_ALL_APPLICATIONS:
			return {
				...state,
				applications : action.payload
			};
		case SET_ORGANIZATION_INFO:
			return {
				...state,
				organizationInfo : action.payload
			};
		case SET_ALL_ORGANIZATIONS:
			return {
				...state,
				organizations : action.payload
			};
		case SET_API_SCOPES:
			return {
				...state,
				apiScopes : action.payload
			};
		case SET_API_BUNDLES:
			return {
				...state,
				apiBundles : action.payload
			};
		case SET_API_BUNDLE_BY_ID:
			return {
				...state,
				apiBundleById : action.payload
			};
		case SET_API_CONFIGS:
			return {
				...state,
				apiConfigs : action.payload
			};
		case SET_API_CONFIG_GROUPS:
			return {
				...state,
				apiConfigGroups : action.payload
			};
		case SET_CLIENT_SUBSCRIPTIONS:
			return {
				...state,
				clientSubscriptions : action.payload
			};
		case SET_ALL_ROLES:
			return {
				...state,
				roles : action.payload
			};
		case SET_PERMISSIONS:
			return {
				...state,
				permissions : action.payload
			};
		default:
			return state;
	};
};

export default adminReducer;