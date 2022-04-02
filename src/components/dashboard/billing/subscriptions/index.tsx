import React, { FC, useEffect, useState } from 'react';
import DashboardWrapper from 'components/dashboard/dashboardwrapper';
import { getOrganizationInfo } from 'store/actions';
import {  IAppState } from 'interfaces/IAppState';
import { connect } from 'react-redux';
import {  IAdmin } from 'interfaces/IAdmin';
import {  IHttp } from 'interfaces/IHttp';
import { useStrictLoader } from 'hooks/useStrictLoader';
import { ActionEnums } from 'enums/ActionEnums';
import NotSubscribed from './not-subscribed';
import Subscribed from './subscribed';
import './index.scss';
import { IAuth } from 'interfaces/IAuth';
import { useHistory } from 'react-router-dom';
import { pageName, url } from 'enums/Route';

interface IStateProps {
    admin : IAdmin;
    http: IHttp;
    auth: IAuth;
}

interface IDispatchProps {
    getOrganizationInfo : ( PageNumber: number, PageSize: number, query?: string ) => void;
}

interface IProps extends IStateProps, IDispatchProps {};

const Subscriptions:FC<IProps> = (props) => {

    const { admin, getOrganizationInfo, auth } = props;
    const { loading = false, organizationInfo } = admin || {};
    const { organizationSubscription } = organizationInfo![0] || {};
    const { bundleCode = '' } = organizationSubscription || {};
    const { loggedInDetails } = auth || {};
    const { user } = loggedInDetails || {};
    const { organizationId } = user || {};
    const history = useHistory<{pageName: string, bundleCode: string}>();
    const historyState = history!?.location!?.state;
    let bundleCodeH = historyState!?.bundleCode;
    const [ isMigrating, setIsMigrating ] = useState(false)

    useEffect(() => {
        if(!organizationInfo){
            getOrganizationInfo(1,1, `OrgId=${organizationId}`);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if(bundleCodeH && bundleCode !== bundleCodeH ){
            setIsMigrating(true)
        }
    }, [bundleCode, bundleCodeH])

    const clearMigration = () => {
        setIsMigrating(false);
        history.replace(url.SUBSCRIPTION, {pageName: pageName.SUBSCRIPTIONS, bundleCode: ''})
    }

    let isLoad = useStrictLoader( admin.action, ActionEnums.GET_API_BUNDLE_BY_ID ) && loading;

    return(
        <DashboardWrapper loading={isLoad}>
            <div className='subscriptions'>
                {
                    !organizationSubscription ?
                        <NotSubscribed />
                        :
                        <>
                            {
                                isMigrating ?
                                    <>
                                        <h2>Migrating...</h2>
                                        <span onClick={clearMigration}>Cancel Migration</span>
                                    </>
                                    :
                                    <Subscribed organizationInfo={organizationInfo![0]} />
                            }
                        </>
                }
            </div>
        </DashboardWrapper>
    )
};

const mapStateToProps = (state: IAppState): IStateProps => ({
    admin: state.admin,
    http : state.http,
    auth: state.auth
});

const mapDispatchToProps: IDispatchProps = {
    getOrganizationInfo
}

export default connect(mapStateToProps, mapDispatchToProps) ( Subscriptions );