import React, { useEffect, FC, useState } from 'react';
import { connect } from 'react-redux';
import { clearHttp, clearNotification } from '../../store/actions';
import { IHttp } from '../../interfaces/IHttp';
import { HttpStatusEnum } from '../../enums/HttpEnums';
import './index.scss';

interface INotificationDispatchProps {
    clearNotification : () => void;
    clearHttp : () => void;
};

interface INotificationState {
    http : IHttp
};

interface INotificationObjectProps {
    action : string;
    status : string;
    resolve : string;  
};

interface INotificationProps extends INotificationDispatchProps, INotificationState {}

const Notification:FC<INotificationProps> = ( props ) => {

    const { http , clearHttp, clearNotification } = props;
    const { isNotificationTrigger = false, httpStatus } = http || {};
    const [ nStatus, setNStatus ] = useState<boolean>();

    const checkMethod = ( http : IHttp ) => {
        return http.httpAction
    };
    // httpMethod === HttpMethod.GET ? "Request" :

    const httpMsg = ( ): INotificationObjectProps =>{
        switch( http.httpStatus ){
            case HttpStatusEnum.BAD_GATEWAY : return { action : checkMethod( http ), status : "failed", resolve : "Bad gateway"};
            case HttpStatusEnum.BAD_REQUEST : return { action : checkMethod( http ), status : "failed", resolve : "Bad Request"};
            case HttpStatusEnum.FORBIDDEN : return { action : checkMethod( http ), status : "failed", resolve : "Forbidden" } ;
            case HttpStatusEnum.REQUEST_ERROR : return { action : checkMethod( http ), status : "failed", resolve : "Request Error" } ;
            case HttpStatusEnum.MANY_REQUESTS : return { action : checkMethod( http ), status : "failed", resolve : "Too many requests"};
            case HttpStatusEnum.NETWORK_ERROR : return { action : checkMethod( http ), status : "failed", resolve : "Error, Please check your internet connection"};
            case HttpStatusEnum.NOT_ALLOWED : return { action : checkMethod( http ),status : "failed", resolve : "Not allowed"};
            case HttpStatusEnum.OK : return { action : checkMethod( http ), status : "successful", resolve : 'Successful' };
            case HttpStatusEnum.SERVER_ERROR : return { action : checkMethod( http ), status : "failed", resolve : "Server Error" };
            case HttpStatusEnum.SERVICE_UNAVAILABLE : return{ action : checkMethod( http ), status : "failed", resolve : "Service unavailable" };
            case HttpStatusEnum.SERVER_REQUEST_ERROR : return{ action : checkMethod( http ), status : "failed", resolve : "Service temporarily unavailable" };
            case HttpStatusEnum.TIME_OUT : return{ action : checkMethod( http ), status : "failed", resolve : "Timeout" };
            case HttpStatusEnum.UNAUTHORIZED : return { action : checkMethod( http ), status : "failed", resolve : "Unauthorized" };
            default : return { action : "", status : "", resolve : "" };
        }
    };

    useEffect(()=>{
        let triggerVariable:any;
        if( httpStatus === HttpStatusEnum.OK && isNotificationTrigger ){
            setNStatus( true ) 
        }else{
            setNStatus( false )
        }
        //close notification status modal after timeout 
        triggerVariable = setTimeout( ( ) => { 
            clearNotification(); 
            clearHttp();
        } , 1500 )

        return(()=>{
            clearTimeout( triggerVariable )
        })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[ http.httpStatus]);

    return(
        <div className={ (isNotificationTrigger) ? "notification-container open" : "notification-container close" } 
            onClick={()=> { clearNotification(); clearHttp(); } }>
            <div className={ nStatus ? "notification-bg true" : (isNotificationTrigger ? "notification-bg false": '') } >              
                <div className="notification-header" >
                    <p>
                        { httpMsg().action + " " + httpMsg().resolve }
                    </p>
                </div>
            </div>             
        </div>
    )
};

const mapStateToProps = ( state : INotificationState ) => ({
    http : state.http
});

const mapDispatchToProps : INotificationDispatchProps = {
    clearNotification,
    clearHttp
};

export default connect( mapStateToProps, mapDispatchToProps ) ( Notification );

//<div className="notification-body" style={{ display : httpMsg().resolve.length > 0 ? "block" : "none" }}>
    //<div className="notification-content" >                    
        //<p >
            //{ httpMsg().resolve }
        //</p>
    //</div>               
//</div>