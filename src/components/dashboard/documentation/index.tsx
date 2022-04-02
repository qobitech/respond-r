import React, { FC, useEffect } from 'react'
import { connect } from 'react-redux';
import { IHttp } from 'interfaces/IHttp';
import { IAppState } from 'interfaces/IAppState';
import { IAuth } from 'interfaces/IAuth';
import DashboardWrapper from 'components/dashboard/dashboardwrapper';
import './index.scss';

interface IStateProps {
	http: IHttp;
    auth: IAuth;
}

interface IDispatchProps {
}

interface IProps extends IStateProps, IDispatchProps { }

const APIDocumentation:FC<IProps> = ( props ) => {

    const { auth } = props;
    const { loading = false } = auth;

    const refresh = () => {
        console.log('profile')
    }

    useEffect(() => {
        refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return(
        <DashboardWrapper loading={loading}>
            <div className="api-documentation">
                <h2>API Documentation</h2>
            </div>
        </DashboardWrapper>
    )
};

const mapStateToProps = (state: IAppState): IStateProps => ({
	auth: state.auth,
	http: state.http
});

const mapDispatchToProps: IDispatchProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(APIDocumentation);