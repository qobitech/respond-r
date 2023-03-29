import React, { FC, useEffect } from 'react';
import DashboardWrapper from '../dashboardwrapper';
import { CardComponent, OverviewCards } from './o-card';
import AppCard from 'utils/app-card';
import { IAppState } from 'interfaces/IAppState';
import { connect } from 'react-redux'
import { IHttp } from 'interfaces/IHttp';
import { IAdmin } from 'interfaces/IAdmin';
import { getAllApplications, getOrganizationInfo } from 'store/actions';
import { useStrictLoader } from 'hooks/useStrictLoader';
import { ActionEnums } from 'enums/ActionEnums';
import { NoSearchResults } from 'utils/refresh';
import { useNavigate } from 'react-router-dom';
import { pageName, url } from 'enums/Route';
import { IAuth } from 'interfaces/IAuth';
import Tour from 'components/dashboard/user-onboarding';
import { TOUR_STEPS } from './tour';
import Prompt from 'utils/prompt';
import './index.scss';

interface IStateProps {
    admin : IAdmin;
    http: IHttp;
    auth: IAuth;
}

interface IDispatchProps {
    getAllApplications : (PageNumber?: number, PageSize?: number, query?: string) => void;
    getOrganizationInfo : ( PageNumber: number, PageSize: number, query?: string) => void;
}

interface IProps extends IStateProps, IDispatchProps {};
const Overview:FC<IProps> = (props) => {

    const { admin, getAllApplications, getOrganizationInfo, auth } = props;
    const { applications = [], loading = false, organizationInfo } = admin;
    const { organizationSubscription } = ( organizationInfo && organizationInfo![0] ) || {};
    const { loggedInDetails } = auth || {};
    const { user } = loggedInDetails || {};
    const { organizationId } = user || {};
    const navigate = useNavigate();

    useEffect(() => {
        getAllApplications(1,3,'');
        getOrganizationInfo(1, 1, `OrgId=${organizationId}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if(Object.keys(loggedInDetails)!?.length === 0){
            void(0)
        }
    }, [loggedInDetails])

    let isPageLoad = useStrictLoader( admin.action, ActionEnums.GET_ALL_APPLICATIONS, ActionEnums.GET_ORGANIZATION_INFO );

    return(
        <DashboardWrapper loading={loading && isPageLoad}>
            <div className="overview">
                <Prompt trigger={!!organizationSubscription} content={<p>
                    It appears you aren't subscribed... <br />
                    <b onClick={() => navigate(url.API_BUNDLES, {state: {pageName: pageName.API_BUNDLES}})}
                        style={{cursor: 'pointer'}}
                    >
                        Subscribe to a bundle
                    </b>
                    </p>} 
                />

                <div className="card-section">
                    <div className="cards">
                        {
                            OverviewCards!?.map((c, index) => {
                                const { title = '', icon = '', stats = '' } = c || {};
                                return(
                                    <div key={index} >
                                        <CardComponent title={title} stats={stats} icon={icon} />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className="app-section">

                    <h3 className='app-header'>Applications</h3>

                    <div className="app-cta">

                        <div className='recent'>
                            <p>Most Recent</p>
                            <i className="fa fa-angle-down"></i>
                        </div>

                        <div className="add-app" onClick={ () => navigate(url.CREATE_APP, {state: {pageName: pageName.CREATE_APP}})}>
                            <i className="fa fa-plus-circle"></i>
                        </div>

                    </div>

                    {applications!?.length > 0 ?
                        <>
                            <div className="app-preview">
                                {applications!?.slice(0, 3)!?.map((a, index) => {
                                    const { id = 0, applicationName = '', createdAt = '', description = '' } = a || {};
                                    return(
                                        <div key={index}>
                                            <AppCard id={id} title={applicationName} description={description} date={new Date(createdAt).toDateString()} />
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="view-all-apps">
                                <p onClick={() => navigate(url.APPLICATIONS, {state: {pageName: pageName.APPLICATIONS}})}>View all</p>
                                <i className="fa fa-angle-right"></i>
                            </div>
                        </>
                        :
                        <NoSearchResults />
                    }
                    
                </div>

                {/* <div className="payments-section">
                    <h3>Outstanding Payments</h3>

                    <div className="payment-accordion"></div>
                    <div className="payment-accordion"></div>
                    <div className="payment-accordion"></div>
                </div> */}

                <Tour steps={TOUR_STEPS} /> 
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
    getAllApplications,
    getOrganizationInfo
};

export default connect(mapStateToProps, mapDispatchToProps) ( Overview );