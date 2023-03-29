import React, { ReactElement } from 'react';
import { connect } from "react-redux";
import { Navigate } from 'react-router-dom';
import { IAppState } from "../../interfaces/IAppState";
import { IAuth } from "interfaces/IAuth";
import { url } from 'enums/Route';

interface IStateProps {
	auth: IAuth;
}

interface IProps extends IStateProps {
  children: ReactElement;
  path?: string | string[] | undefined
}

const AuthRoute = (props: IProps) => {
  const { auth } = props;

  if (!auth.authenticated) {
    return <Navigate to={{ pathname: url.LANDING_PAGE }} replace />;
  }

  return props.children;
}

const mapStateToProps = (state: IAppState): IStateProps => ({
	auth: state.auth,
});

export default connect(mapStateToProps)(AuthRoute);