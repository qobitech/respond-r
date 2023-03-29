import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { connect } from "react-redux";
import { IAppState } from "interfaces/IAppState";
import { IAuth } from "interfaces/IAuth";
import { routes } from 'utils/route';
import AuthRoute from 'utils/protectedRoute/auth'
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

const RouteList:FC<IProps> = (props) => {
    const { auth, logOut, getRefreshToken } = props;
    const Wow = SessionTimeout(auth, logOut, getRefreshToken);

    return(
        <>
            <Routes>
                {routes!?.map( (item) => {
                    const { paths, PageRenders } = item;
                    
                    return(
                        <Route path={paths[0]}>
                            {PageRenders.map((PageRender, index) => (
                                PageRender ? 
                                    <Route 
                                        path={paths[index]} 
                                        index={index===0} 
                                        element={
                                            item.requiresAuth ?
                                                <AuthRoute>
                                                    <PageRender />
                                                </AuthRoute>
                                                : <PageRender />
                                        } 
                                    /> 
                                : null
                            ))}
                        </Route>
                    )
                })}
            </Routes>
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

export default connect(mapStateToProps, mapDispatchToProps)(RouteList);