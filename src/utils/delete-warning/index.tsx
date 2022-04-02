import React, { FC, useEffect } from 'react';
import { useStrictLoader } from 'hooks/useStrictLoader';
import { IAdmin } from 'interfaces/IAdmin';
import { IHttp } from 'interfaces/IHttp';
import { useHistory } from 'react-router-dom';
import Loader from '../../extras/images/loader/loader.svg';
import './index.scss';

interface IRUSure {
    message: string;
    admin: IAdmin;
    http: IHttp;
    actionEnum: string;
    url: {url: string, pageName: string};
    deleteFunc ?: () => void;
    returnFunc ?: () => void;
};

const AreYouSure: FC<IRUSure> = (props) => {

    const { message = '', deleteFunc, returnFunc, admin, http, actionEnum, url } = props;
    const history = useHistory();
    
    useEffect(()=>{
        if( actionEnum === admin!?.action && http!?.httpStatus === 200 ){
            history.push(url!?.url, {pageName: url!?.pageName})
            history.go(0)
        }
    // eslint-disable-next-line
    },[http.httpStatus]);

    let isLoad = useStrictLoader( admin.action, actionEnum )&& admin!?.loading ;

    return(
        <div className='delete-warning'>
            {
                isLoad ? 
                    <div style={{ textAlign:'center' }}>
                            <img src={Loader} alt="loading...."/>
                    </div>
                    :
                    <>
                    <h3>{message}</h3>
                    <div style={{display: 'flex'}}>
                        <button className='delete' onClick={deleteFunc} style={{marginRight: '10px'}} >
                            Yes
                        </button>
                        <button onClick={returnFunc} >
                            No
                        </button>
                    </div>
            </>
            }
        </div>
    )
};

export default AreYouSure;
