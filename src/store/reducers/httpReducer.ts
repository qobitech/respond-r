import {
    AXIOS_REQUEST, AXIOS_REQUEST_SUCCESS, AXIOS_REQUEST_FAILURE,
    CLEAR_HTTP, CLEAR_NOTIFICATION, SET_HTTP_ACTION, SET_HTTP_STATUS,
	SET_HTTP_METHOD
} from "../actions/types";

const initialState = {
	isNotificationStatus : false,
	isNotificationTrigger : false,
	httpStatus : 6660,
	httpAction : "",
	httpMethod : ""
};

const httpReducer = function (state = initialState, action: any) {
	switch (action.type) {
        case AXIOS_REQUEST:
			return {
				...state,
				httpStatus : 566,
				loading: true,
				action: action.payload
			};
		case AXIOS_REQUEST_SUCCESS:
			return {
				...state,
				loading: false,
				data: action.payload,
				errors: '',
                isNotificationTrigger : true,
				isNotificationStatus : true,
			};
		case AXIOS_REQUEST_FAILURE:
			return {
				...state,
				loading: false,
				data: [],
				errors: action.payload,
                isNotificationStatus : false,
				isNotificationTrigger : true
			};
		case SET_HTTP_ACTION:
			return {
				...state,			
				httpAction : action.payload
			};
		case SET_HTTP_STATUS:
			return {
				...state,			
				httpStatus : action.payload,
			};	
		case SET_HTTP_METHOD:
			return {
				...state,			
				httpMethod : action.payload,
			};	
		case CLEAR_HTTP:
			return {
				...state,			
				httpAction : ""
			};
		case CLEAR_NOTIFICATION:
			return {
				...state,
				isNotificationStatus : false,
				isNotificationTrigger : false,
			};
		default:
			return state;
	};
};

export default httpReducer;