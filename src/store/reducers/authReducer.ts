import {
	AXIOS_REQUEST, AXIOS_REQUEST_SUCCESS, AXIOS_REQUEST_FAILURE, SET_TOTAL_COUNT, SET_TOTAL_SEARCH_COUNT,
    SET_ORGANIZATION_AUTH, SET_PASSWORD_RESET, SET_REFRESH_TOKEN, SET_GENERATED_TOKEN, SET_LOGGED_IN_DETAILS, SET_ADMIN_AUTHENTICATED, SET_ADMIN_UNAUTHENTICATED, SET_VERIFY_PASSWORD_RESET, SET_VERIFY_EMAIL
} from "../actions/types";

const initialState = {
	authenticated: false,
	loading: false,
	action: '',
	errors: '',
	data: [],
    orgAuth : {},
    refreshToken : {},
    generatedToken : {},
    passwordReset : {},
    verifyPasswordReset : {},
	verifyEmail : {},
    loggedInDetails : {},
	totalCount: 0,
	totalSearchCount: 0
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
		case SET_ADMIN_AUTHENTICATED:
			return {
				...state,
				authenticated: true,
			};
		case SET_ADMIN_UNAUTHENTICATED:
			return {
				...state,
				authenticated: false
			};
		case SET_TOTAL_COUNT:
			return {
				...state,
				totalCount : action.payload
			};
        case SET_ORGANIZATION_AUTH:
            return {
                ...state,
                orgAuth : action.payload
            };
        case SET_PASSWORD_RESET:
            return {
                ...state,
                passwordReset : action.payload
            };
        case SET_VERIFY_PASSWORD_RESET:
            return {
                ...state,
                verifyPasswordReset : action.payload
            };
        case SET_VERIFY_EMAIL:
            return {
                ...state,
                verifyEmail : action.payload
            };
        case SET_GENERATED_TOKEN:
            return {
                ...state,
                generatedToken : action.payload
            };
        case SET_REFRESH_TOKEN:
            return {
                ...state,
                refreshToken : action.payload
            };
        case SET_LOGGED_IN_DETAILS:
            return {
                ...state,
                loggedInDetails : action.payload
            };
		case SET_TOTAL_SEARCH_COUNT:
			return {
				...state,
				totalSearchCount : action.payload
			};
		default:
			return state;
	};
};

export default adminReducer;