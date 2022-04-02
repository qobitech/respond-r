import axios, { AxiosResponse } from 'axios';
import { AXIOS_REQUEST, AXIOS_REQUEST_FAILURE, AXIOS_REQUEST_SUCCESS, SET_TOTAL_COUNT } from 'store/actions/types';
import { getHttpError, getHttpSuccess } from 'store/actions/httpAction';
import { HttpMethod } from 'enums/HttpEnums';

const token = localStorage.getItem('CentralDatabaseToken');
axios.defaults.headers.common["Authorization"] = token;

const headers = {
	'Access-Control-Allow-Origin': '*',
	// 'X-Requested-With': 'XMLHttpRequest',
	// 'Access-Control-Allow-Methods': 'POST'
};

type Dispatch = { type: string, payload?: string };

interface IGenProps {
    url: string;
    actionEnum: string;
};

interface IGetProps extends IGenProps {
    disPatch: Array<Dispatch>;
    extraFunc?: (res: AxiosResponse<any>) => void;
    PageNumber?: number;
    PageSize?: number;
    query?: string;
    id?: number;
};

export const getRequest = (props: IGetProps) => ( dispatch: Function ) => {
    const { url = '', actionEnum = '', PageNumber = 0, PageSize = 0, query = '', id = 0, disPatch, extraFunc } = props;
    dispatch({ type: AXIOS_REQUEST, payload : actionEnum })
    return(axios({url: id ? `${url}/${id}` : `${url}?PageNumber=${PageNumber}&PageSize=${PageSize}&${query}`, method:'get', validateStatus : () => true, headers })
    .then((res) => {
        dispatch({ type: AXIOS_REQUEST_SUCCESS })
        for( let i = 0; i < disPatch!?.length; i++ ){
            dispatch( { type: disPatch![i]?.type, payload : disPatch![i]?.payload! ? res.data[disPatch![i]?.payload!] : res.data })
        }
        dispatch({ type: SET_TOTAL_COUNT, payload: res.data.totalCount })
        typeof extraFunc === 'function' && extraFunc(res)
        getHttpSuccess( dispatch, actionEnum, res, HttpMethod.GET )
    })
    .catch((err) => {
        dispatch({ type : AXIOS_REQUEST_FAILURE, payload : err.message });
        getHttpError( err, dispatch, actionEnum, HttpMethod.GET )
    })
    )
};

interface IPostProps extends IGenProps {
    data: {[key: string]: any}
    update?: boolean;
    disPatch?: Array<Dispatch>;
    extraFunc?: (res: AxiosResponse<any>) => void;
}

export const postRequest = (props: IPostProps) => ( dispatch: Function ) => {
    const { url = '', actionEnum = '', data, update = false, disPatch, extraFunc } = props;
    dispatch({ type: AXIOS_REQUEST, payload : actionEnum })
    axios({url: update ? `${url}/${data.id}` : `${url}`, method: update? 'patch' : 'post', data, validateStatus : () => true, headers })
    .then((res) => {
        if(res.status === 200){
            dispatch({ type: AXIOS_REQUEST_SUCCESS })
            for( let i = 0; i < disPatch!?.length; i++ ){
                dispatch( { type: disPatch![i]?.type, payload : disPatch![i]?.payload! ? res.data[disPatch![i]?.payload!] : res.data })
            }
            typeof extraFunc === 'function' && extraFunc(res)
        }else{
            dispatch({ type: AXIOS_REQUEST_FAILURE });
        }
        getHttpSuccess( dispatch, actionEnum, res, update ? HttpMethod.PATCH : HttpMethod.POST )
    })
    .catch((err) => {
        dispatch({ type : AXIOS_REQUEST_FAILURE, payload : err.message });
        getHttpError( err, dispatch, actionEnum, update ? HttpMethod.PATCH : HttpMethod.POST )
    })
};

interface IDelProps extends IGenProps {
    id: number;
};

export const deleteRequest = (props: IDelProps) => ( dispatch: Function ) => {
    const { url = '', actionEnum = '', id = 0 } = props;
    dispatch({ type: AXIOS_REQUEST, payload : actionEnum })
    axios({url: `${url}/${id}`, method:'get', validateStatus : () => true, headers })
    .then((res) => {
        dispatch({ type: AXIOS_REQUEST_SUCCESS })
        getHttpSuccess( dispatch, actionEnum, res, HttpMethod.GET )
    })
    .catch((err) => {
        dispatch({ type : AXIOS_REQUEST_FAILURE, payload : err.message });
        getHttpError( err, dispatch, actionEnum, HttpMethod.GET )
    })
};