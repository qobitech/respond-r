import React, { FC, useEffect, useState } from 'react';
import DashboardWrapper from 'components/dashboard/dashboardwrapper';
import { getAPIBundles, deleteAPIBundle } from 'store/actions'
import {  IAppState } from 'interfaces/IAppState'
import { connect } from 'react-redux'
import {  IAdmin } from 'interfaces/IAdmin'
import {  IHttp } from 'interfaces/IHttp'
import { useParams, useHistory } from 'react-router-dom';
import { useStrictLoader } from 'hooks/useStrictLoader';
import { ActionEnums } from 'enums/ActionEnums';
import { IAPIBundle } from 'interfaces/IBilling';
import APIBundleCard from './bundle-card';
import CreateAPIBundle from './create-api-bundle';
import { useSearch } from 'hooks/useQuery';
import { useModalWithArg } from 'hooks/useModal';
import ApiBundleFilter from './api-bundle-filter';
import AreYouSure from 'utils/delete-warning';
import { pageName, url } from 'enums/Route';
import './index.scss';
import { SuperAdmin } from 'utils/roles';

interface IStateProps {
    admin : IAdmin;
    http: IHttp;
}

interface IDispatchProps {
    getAPIBundles : (PageNumber?: number, PageSize?: number, query?: string) => void;
    deleteAPIBundle : (id: number) => void;
}

interface IProps extends IStateProps, IDispatchProps {}

const ApiBundles:FC<IProps> = (props) => {

    const { getAPIBundles, admin, deleteAPIBundle, http } = props;
    const { apiBundles = [], loading = false, organizationInfo } = admin;
    const { organizationSubscription } = organizationInfo![0] || {};
    const { id } = useParams<{ id: string }>();
    const [ isMoreOption, setIsMoreOption ] = useState( false );
    const [ abObject, setABObject ] = useState({} as IAPIBundle);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(50);
    const [pageNumber, setPageNumber] = useState(1);
    const pageSize = 20;
    const history = useHistory();

    useEffect(()=>{
        getAPIBundles(pageNumber, pageSize, '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    useEffect(() => {
        if(id) {
            setABObject(apiBundles!?.filter(u => u!?.id === parseInt(id))[0])
        }else {
            setABObject({} as IAPIBundle)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[id]);

    const [ APIBundleList, isSearch, isSearchEmpty, setSearchMode, searchMode, cancelQuery ] = useSearch( { loading, request : apiBundles, requestBySearch : apiBundles } );

    let isLoad = useStrictLoader( admin.action, ActionEnums.GET_API_BUNDLES );

    const [ setValueFunc, ModalComponent ] = useModalWithArg( [ <CreateAPIBundle />, 
        <CreateAPIBundle update prevApiBundle={abObject} />, 
        <AreYouSure message='Are you sure you want to delete this API Bundle?' http={http} admin={admin} 
            actionEnum={ActionEnums.DELETE_API_BUNDLE} returnFunc={() => setValueFunc('deleteApiBundle', false)} 
            deleteFunc={() => deleteAPIBundle(abObject!?.id)} url={{url: url.API_BUNDLES, pageName: pageName.API_BUNDLES}}
        /> 
        ], 
        { createApiBundle: false, updateApiBundle: false, deleteApiBundle: false } );

    const filterCTAContent = [
        {title: 'Create API Bundle', action: () => {setValueFunc!('createApiBundle', true)}, font: '', isLoad: false, show: SuperAdmin }
    ];

    const setBundleId = ( id: number) => {
        history.push(url.API_BUNDLES + `/${id}`, {pageName: pageName.API_BUNDLES});
    };

    const subscribeToBundle = ( id: number, bundleCode: string ) => {
        history.push(url.SUBSCRIPTION + `/${id}`, {pageName: pageName.SUBSCRIPTIONS, bundleCode});
        history.go(0)
    }

    return(
        <DashboardWrapper loading={loading && isLoad}>
            <div className="api-bundle-page">
                {!isMoreOption ?
                    <>
                        <ApiBundleFilter isSearch={isSearch} searchMode={searchMode} setSearchMode={setSearchMode} 
                            users={APIBundleList} pageNumber={pageNumber} setPageNumber={setPageNumber} rowsPerPage={rowsPerPage} 
                            setRowsPerPage={setRowsPerPage} page={page} setPage={setPage}cancelQuery={ cancelQuery } 
                            isSearchEmpty={ isSearchEmpty } isMoreOption={isMoreOption} setIsMoreOption={setIsMoreOption}
                            filterCTAContent={filterCTAContent}
                        />
                        <div className="api-bundle-preview">
                            {
                                apiBundles!?.map((ap, index) => {
                                    const { code = '', description = '', id = 0 } = ap || {};
                                    return(
                                        <APIBundleCard code={code} description={description} noOfStars={index+3} key={index} 
                                            onUClick={() => {setValueFunc('updateApiBundle', true); setBundleId(id) }}
                                            onDelClick={() => {setValueFunc('deleteApiBundle', true); setBundleId(id) }}
                                            onSelect = {() => subscribeToBundle(id, code)} recommended={id === 2}
                                            subscribed={!!organizationSubscription}
                                            subscribedTo={code.includes(organizationSubscription!?.bundleCode)}
                                        />
                                    )
                                })
                            }
                        </div>
                    </>
                    :
                    <p>Boom</p>
                }
                {ModalComponent}
            </div>   
        </DashboardWrapper>
    )
};

const mapStateToProps = (state: IAppState): IStateProps => ({
    admin: state.admin,
    http : state.http
});

const mapDispatchToProps: IDispatchProps = {
    getAPIBundles,
    deleteAPIBundle
}

export default connect(mapStateToProps, mapDispatchToProps) ( ApiBundles );