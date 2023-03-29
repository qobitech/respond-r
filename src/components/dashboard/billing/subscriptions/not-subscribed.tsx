import React, { FC, useState, useEffect } from 'react';
import { getAPIBundleById, clearAPIBundleById, subscribeToBundle } from 'store/actions';
import {  IAppState } from 'interfaces/IAppState';
import { connect } from 'react-redux';
import {  IAdmin } from 'interfaces/IAdmin';
import {  IHttp } from 'interfaces/IHttp';
import { useParams } from 'react-router-dom';
import subscribe from 'extras/images/subscribe.svg';
import { IApplication } from 'interfaces/IApplication';
import APPThumbnail from 'utils/app-card/app-thumbnail';
import { useStrictLoader } from 'hooks/useStrictLoader';
import { ActionEnums } from 'enums/ActionEnums';
import { pageName, url } from 'enums/Route';
import { useNavigate } from 'react-router-dom';
import { IAuth } from 'interfaces/IAuth';
import './index.scss';

interface IStateProps {
    admin : IAdmin;
    http: IHttp;
    auth: IAuth;
}

interface IDispatchProps {
    getAPIBundleById: (id: number) => void;
    clearAPIBundleById: () => void;
    subscribeToBundle: (data: object) => void;
}

interface IProps extends IStateProps, IDispatchProps {};

interface IObjToSend {
    organizationId: number;
    bundleCode: string;
    clientDetailsList: Array<{applicationId: number}>
}

const NotSubscribed:FC<IProps> = (props) => {

    const { admin, getAPIBundleById, subscribeToBundle, auth } = props;
    const { applications, apiBundleById, loading = false } = admin || {};
    const { code = '', description = '' } = apiBundleById || {};
    const { loggedInDetails } = auth || {};
    const { user } = loggedInDetails || {};
    const { organizationId } = user || {};
    const { id = '1' } = useParams<{ id: string }>();
    const [ selectedApps, setSelectedApps ] = useState<Array<IApplication>>([]);
    const navigate = useNavigate();
    const [ objToSend, setObjToSend ] = useState<IObjToSend>({
        organizationId: 1, bundleCode: '', clientDetailsList: []
    });

    const appConv = (apps: Array<IApplication>) =>
    apps!?.map(a => ({
        applicationId: a!?.id
    }));

    useEffect(() => {
        // clearAPIBundleById();
        if(parseInt(id) !== apiBundleById!?.id ) 
            getAPIBundleById(parseInt(id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        setObjToSend({
            organizationId: organizationId,
            bundleCode: code,
            clientDetailsList: appConv(selectedApps)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedApps, code, organizationId]);

    let isLoad = useStrictLoader( admin.action, ActionEnums.GET_API_BUNDLE_BY_ID ) && loading;
    let Subscribing = useStrictLoader( admin.action, ActionEnums.SUBSCRIBE_TO_BUNDLE ) && loading;

    const handleSubscription = () => {
        subscribeToBundle(objToSend)
    }

    return(
        <div className='not-subscribed'>
            <div className="heading">
                <img src={subscribe} alt="subscribe" /> 
                <h2>Let's set you up!</h2>
                <p>This will be the bundle your organization would be subscribed to</p>
                <p>You can always switch bundles later if you wish</p>
            </div>

            <div className="subscribe-to">
                {
                    isLoad ? <p>Loading...</p>:

                    <>
                        <div className="bundle-info">
                            <h3>Basic Bundle Information</h3>
                            <p>Code: <b>{code}</b></p>
                            <p>Description: <b>{description}</b></p>
                        </div>

                        <div className="add-applications">
                            <h3>Add your applications</h3>
                            <APPThumbnail applications={applications} selectedApps={selectedApps} 
                                setSelectedApps={setSelectedApps} onClick={() => void(0)}                                   
                            />
                            <i>Don't worry, you can always add your applications later</i>
                        </div>
                        
                        <div className="subscribe-btn">
                            <button onClick={handleSubscription}>{
                                Subscribing ?
                                    <h2>Loading...</h2>
                                    : 
                                    'Subscribe'
                            }</button>
                        </div>
                    </>
                }
            </div>

            <div className="select-another">
                <p>Or select another bundle</p>
                <p className="another-bundle" onClick={() => navigate(url.API_BUNDLES, {state: {pageName: pageName.API_BUNDLES}})}>
                    Select another bundle
                    <i className='fa fa-angle-right'></i>
                </p>
            </div>
        </div>
    )
};

const mapStateToProps = (state: IAppState): IStateProps => ({
    admin: state.admin,
    http : state.http,
    auth: state.auth
});

const mapDispatchToProps: IDispatchProps = {
    getAPIBundleById,
    clearAPIBundleById,
    subscribeToBundle
}

export default connect(mapStateToProps, mapDispatchToProps) ( NotSubscribed );