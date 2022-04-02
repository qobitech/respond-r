import React, { FC } from 'react';
import { connect } from "react-redux";
import { IAppState } from "../../interfaces/IAppState";
import { IAuth } from "interfaces/IAuth";
import { Route, Redirect } from 'react-router-dom';
import { url } from 'enums/Route';

interface IStateProps {
	auth: IAuth;
}

interface IProps extends IStateProps {
    Component: React.ElementType<any>;
    exact: boolean | undefined;
    path?: string | string[] | undefined
}

const PublicRoute:FC<IProps> = (props) => {
  const { auth, Component, ...rest } = props;
  return(
      <Route {...rest }
        render={props =>
          !auth.authenticated ? 
            <Component {...props} />
            : 
            <Redirect to={{ pathname: url.OVERVIEW }} />  
        }
      />
  );
}

const mapStateToProps = (state: IAppState): IStateProps => ({
	auth: state.auth,
});

export default connect(mapStateToProps)(PublicRoute);