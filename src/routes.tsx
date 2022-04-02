import React, { FC } from 'react';
import {Switch } from 'react-router-dom';
import { connect } from "react-redux";
import { IAppState } from "interfaces/IAppState";
import { IAuth } from "interfaces/IAuth";
import { Route } from 'react-router-dom';
import { route } from 'utils/route';
import AuthRoute from 'utils/protectedRoute/auth'
import PublicRoute from 'utils/protectedRoute/public'
import { logOut, getRefreshToken } from "store/actions";
import SessionTimeout from 'utils/auto-logout';
// import checkRole from './utils/checkRole';

interface IStateProps {
	auth: IAuth;
}

interface IDispatchProps {
    logOut: () => void;
    getRefreshToken: ( data: object ) => void;
};

interface IProps extends IStateProps, IDispatchProps {}

const Routes:FC<IProps> = (props) => {
    const { auth, logOut, getRefreshToken } = props;
    const Wow = SessionTimeout(auth, logOut, getRefreshToken);

    return(
        <>
            <Switch>
                {route!?.map( (item) => {
                    return(
                    item.path!?.length > 0 ?

                        item!?.requiresAuth ?
                            <AuthRoute exact path={ item.path } key={ item.id } Component={item!?.PageRender!} /> 
                            :
                            <PublicRoute exact path={ item.path } key={ item.id } Component={item!?.PageRender!} /> 

                    :
                    <Route key={ item.id } component={item.PageRender} />  
                    ) 
                })}
            </Switch>
            <div key={100}>
                {Wow}
            </div>
        </>
    );
};

const mapStateToProps = (state: IAppState): IStateProps => ({
	auth: state.auth,
});

const mapDispatchToProps: IDispatchProps = {
    logOut,
    getRefreshToken
};

export default connect(mapStateToProps, mapDispatchToProps)(Routes);