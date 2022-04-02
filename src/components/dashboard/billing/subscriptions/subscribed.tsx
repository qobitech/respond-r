import React, { FC, useEffect, useState } from 'react';
import { addAppsToSub, getAllApplications } from 'store/actions';
import {  IAppState } from 'interfaces/IAppState';
import { connect } from 'react-redux';
import {  IAdmin } from 'interfaces/IAdmin';
import {  IHttp } from 'interfaces/IHttp';
import { pageName, url } from 'enums/Route';
import { useHistory } from 'react-router-dom';
import { useStrictLoader } from 'hooks/useStrictLoader';
import { ActionEnums } from 'enums/ActionEnums';
import { IOrganization } from 'interfaces/IOrganization';
import { IApplication } from 'interfaces/IApplication';
import APPThumbnail from 'utils/app-card/app-thumbnail';
import { checkIfNull, dateCleaner, separator } from 'utils/helpers';
import subscribed from 'extras/images/subscribed.svg';
import './index.scss';

interface IStateProps {
    admin : IAdmin;
    http: IHttp;
};

interface IDispatchProps {
    addAppsToSub: (data: Array<IObjToSend>) => void;
    getAllApplications : (PageNumber?: number, PageSize?: number, query?: string) => void;
};

interface IProps extends IStateProps, IDispatchProps {
    organizationInfo: IOrganization;
};

interface IObjToSend {
    applicationId: number;
    organizationSubscriptionId: number;
};

const Subscribed:FC<IProps> = (props) => {

    const { admin, organizationInfo, addAppsToSub, getAllApplications } = props;
    const { loading = false, applications } = admin || {};
    const { organizationSubscription } = organizationInfo || {};
    const { id: orgSubId = 0 } = organizationSubscription || {};
    const [ selectedApps, setSelectedApps ] = useState<Array<IApplication>>([]);
    const [ objToSend, setObjToSend ] = useState<Array<IObjToSend>>([]);
    const history = useHistory();

    interface IAddAppToSub {
        applicationId: number;
        organizationSubscriptionId: number;
    };

    const orgInfo = {
        bundleCode: organizationSubscription.bundleCode,
        status: organizationSubscription.subscriptionStatus,
        createdAt: dateCleaner(organizationSubscription.createdAt),
        companyEmail: organizationInfo.email,
    }as {[key: string]: any};

    const appConv = (apps: Array<IApplication>) =>
    apps!?.map(a => ({
        applicationId: a!?.id,
        organizationSubscriptionId: orgSubId
    })as IAddAppToSub);

    useEffect(() => {
        setObjToSend(appConv(selectedApps))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedApps]);

    useEffect(() => {
        getAllApplications(1, 20, '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleAddAppsToSub = () => {
        addAppsToSub(objToSend)
    };

    let AddingApps = useStrictLoader( admin.action, ActionEnums.ADD_APP_TO_SUB ) && loading;

    return(
        <div className='subscribed'>
            <h2>{organizationInfo.organizationName}</h2>

           <div className="org-info">
                {
                    Boolean(orgInfo) && Object.keys(orgInfo)!?.map((info, index) => {
                        return(
                            checkIfNull(orgInfo[info]) &&
                            <div className="content" key={index}>
                                <p className="label">{separator(info)}</p>
                                <p className="text">{orgInfo[info]}</p>
                            </div>
                        )
                    })
                }
            </div>

            <div className="image-area">
                <img src={subscribed} alt="subscribe" /> 
            </div>

           <div className="add-applications">
                <h3>Add your applications</h3>
                <APPThumbnail applications={applications} selectedApps={selectedApps} 
                    setSelectedApps={setSelectedApps} onClick={() => void(0)}                                   
                />
                <i className='dont-worry'>Don't worry, you can always add your applications later</i>
                <div className="add-apps-btn">
                    <button onClick={handleAddAppsToSub}>{
                        AddingApps ?
                            <h2>Loading...</h2>
                            : 
                            'Add applications'
                    }</button>
                </div>
            </div>

            <div className="select-another">
                <p className="another-bundle" onClick={() => history.push(url.API_BUNDLES, {pageName: pageName.API_BUNDLES})}>
                    Subscribe to another bundle
                    <i className='fa fa-angle-right'></i>
                </p>
            </div>
        </div>
    )
};

const mapStateToProps = (state: IAppState): IStateProps => ({
    admin: state.admin,
    http : state.http
});

const mapDispatchToProps: IDispatchProps = {
    addAppsToSub,
    getAllApplications
}

export default connect(mapStateToProps, mapDispatchToProps) ( Subscribed );