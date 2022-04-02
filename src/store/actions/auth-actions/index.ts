import axios, { AxiosResponse } from 'axios';
import { url } from 'enums/Route';
import { getRequest, postRequest } from 'store/services';
import { ActionEnums } from '../../../enums/ActionEnums';
import { etraffica_baseurl } from '../../../utils/constants';
import { SET_ORGANIZATION_AUTH, SET_PASSWORD_RESET, SET_REFRESH_TOKEN, SET_GENERATED_TOKEN, SET_LOGGED_IN_DETAILS, SET_ADMIN_UNAUTHENTICATED, SET_ADMIN_AUTHENTICATED, SET_VERIFY_PASSWORD_RESET, SET_VERIFY_EMAIL } from '../types';

const setAuthorizationHeader = (token: string) => {
	const CentralDatabaseToken = `Bearer ${token}`;
	localStorage.setItem("CentralDatabaseToken", CentralDatabaseToken);
	axios.defaults.headers.common["Authorization"] = CentralDatabaseToken;
};

export const registerOrganization = (adminDetails: object) => 
	postRequest({
		url: `${etraffica_baseurl}/UserManagement/OrganizationRegistration`,
		actionEnum: ActionEnums.ORGANIZATION_REGISTRATION,
		data: adminDetails, disPatch:[{ type : SET_ORGANIZATION_AUTH, payload : '' }]
	});

export const clearOrgAuth = () => (dispatch:Function) => {
	dispatch({ type: SET_ORGANIZATION_AUTH, payload: {} })
};

export const verifyEmail = (data : object) => 
	postRequest({
		url: `${etraffica_baseurl}/UserManagement/VerifyToken`,
		actionEnum: ActionEnums.EMAIL_VERIFICATION,
		data, disPatch:[{ type : SET_VERIFY_EMAIL, payload : '' }],
	});

export const userLogin = ( data : object ) => 
	postRequest({
		url: `${etraffica_baseurl}/UserLogin`,
		actionEnum: ActionEnums.LOGIN,
		data, disPatch:[
			{ type : SET_ADMIN_AUTHENTICATED },
			{ type : SET_LOGGED_IN_DETAILS, payload : '' },
			{ type : SET_REFRESH_TOKEN, payload : 'token' },
		],
		extraFunc: (res: AxiosResponse<any>) => {setAuthorizationHeader(res.data!?.token!?.accessToken); window.location.reload()}
	});

export const passwordReset = ( data : object ) => 
	postRequest({
		url: `${etraffica_baseurl}/UserManagement/PasswordReset/UpdatePassword`,
		actionEnum: ActionEnums.PASSWORD_RESET,
		data
	});

export const requestPasswordToken = ( email : {[key: string]: any} ) => 
	getRequest({
		url: `${etraffica_baseurl}/PasswordReset/TokenLink/${email!?.email}`,
		actionEnum: ActionEnums.PASSWORD_TOKEN_REQUEST,
		disPatch:[{ type : SET_PASSWORD_RESET, payload : '' }],
		extraFunc: (res: AxiosResponse<any>) => (res.status === 200 && window.location.href === url.RESET_PASSWORD)
	});

export const clearPasswordReset = () => (dispatch:Function) => {
	dispatch({ type: SET_PASSWORD_RESET, payload: {} })
};

export const verifyPasswordResetToken = ( data : object ) => 
	postRequest({
		url: `${etraffica_baseurl}/PasswordReset/ValidateToken`,
		actionEnum: ActionEnums.PASSWORD_RESET_TOKEN_VERIFICATION,
		data, disPatch:[{ type : SET_VERIFY_PASSWORD_RESET, payload : '' }]
	});

export const updatePassword = ( data : object ) =>
	postRequest({
		url: `${etraffica_baseurl}/ChangePassword`,
		actionEnum: ActionEnums.PASSWORD_UPDATE,
		data,
	});

export const generateAccessToken = ( data : object ) => 
	postRequest({
		url: `${etraffica_baseurl}/connect/token`,
		actionEnum: ActionEnums.TOKEN_GENERATION,
		data, disPatch:[{ type : SET_GENERATED_TOKEN, payload : '' }]
	});


export const getRefreshToken = ( data : object ) => 
	postRequest({
		url: `${etraffica_baseurl}/Session/RefreshToken`,
		actionEnum: ActionEnums.TOKEN_REFRESH,
		data, disPatch:[{ type : SET_REFRESH_TOKEN, payload : '' }]
	});

export const logOut = () => (dispatch: Function) => {
	localStorage.removeItem('CentralDatabaseToken');
	dispatch({ type: SET_ADMIN_UNAUTHENTICATED });
	delete axios.defaults.headers.common["Authorization"];
	localStorage.clear();
	window.location.href = url.LOGIN;
};