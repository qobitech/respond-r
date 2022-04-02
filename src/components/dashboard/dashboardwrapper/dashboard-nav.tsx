import React, { FC } from 'react';
import DashboardNav from 'components/dashboard/navigations';
import { IAuth } from 'interfaces/IAuth';
import { IAppState } from 'interfaces/IAppState';
import { connect } from 'react-redux';

interface IStateProps {
    auth: IAuth;
}

interface IDispatchProps {}

interface IProps extends IStateProps, IDispatchProps {};

const DashNav:FC<IProps> = (props) => {

    const { auth } = props;
    const { authenticated = false } = auth || {};

    return(
        <>
            {
                authenticated ?
                <DashboardNav />
                :
                <></>
            }
        </>
    )
} 

const mapStateToProps = (state: IAppState): IStateProps => ({
    auth: state.auth
});

const mapDispatchToProps: IDispatchProps = {};

export default connect(mapStateToProps, mapDispatchToProps) ( DashNav );