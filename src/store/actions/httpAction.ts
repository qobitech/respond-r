import { AxiosError, AxiosResponse } from 'axios';
import { SET_HTTP_ACTION, SET_HTTP_STATUS, SET_HTTP_METHOD } from './types';

export const getHttpError = ( err : AxiosError, dispatch : Function, action : string, method : string ) => {
	if( err.message.includes('timeout') ){
		dispatch({type: SET_HTTP_ACTION, payload : action })
		dispatch({type: SET_HTTP_STATUS, payload : 404040 })
		dispatch({type: SET_HTTP_METHOD, payload : method })
	}else{
		if( err.request ){
			dispatch({type: SET_HTTP_ACTION, payload : action })
			dispatch({type: SET_HTTP_STATUS, payload : err.request.status })
			dispatch({type: SET_HTTP_METHOD, payload : method })
		}
		if( err.response ){
			dispatch({type: SET_HTTP_ACTION, payload : action })
			dispatch({type: SET_HTTP_STATUS, payload : err.response.status === 0 ? 10101 : err.response.status })
			dispatch({type: SET_HTTP_METHOD, payload : method })
		}
	}
};

export const getHttpSuccess = ( dispatch : Function, action : string, res : AxiosResponse, method : string ) => {
	dispatch({type: SET_HTTP_ACTION, payload : action })
	// dispatch({type: SET_HTTP_STATUS, payload : checkRes( res ) ? res.status : 500 })
	dispatch({type: SET_HTTP_STATUS, payload : res.status })
	dispatch({type: SET_HTTP_METHOD, payload : method })
};

export const clearHttp = ( ) => ( dispatch : Function ) =>{
	dispatch({type: SET_HTTP_ACTION, payload : '' })
	dispatch({type: SET_HTTP_STATUS, payload : 566 })
	dispatch({type: SET_HTTP_METHOD, payload : '' })
};