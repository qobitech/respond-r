import React, { FC, useEffect, useState } from 'react';
import DashboardWrapper from 'components/dashboard/dashboardwrapper';
import { deleteAPIConfig, getClientSubscriptions } from 'store/actions'
import {  IAppState } from 'interfaces/IAppState'
import { connect } from 'react-redux'
import {  IAdmin } from 'interfaces/IAdmin'
import {  IHttp } from 'interfaces/IHttp'
import { useParams, useHistory } from 'react-router-dom';
import { useStrictLoader } from 'hooks/useStrictLoader';
import { ActionEnums } from 'enums/ActionEnums';
import { IClientSubscription } from 'interfaces/IBilling';
import { useSearch } from 'hooks/useQuery';
import { useModalWithArg } from 'hooks/useModal';
import ClientSubsFilter from './client-subscriptions-filter';
import Table from 'utils/table';
import ClientSubsMD from './more-details';
import { pageName, url } from 'enums/Route';
import AreYouSure from 'utils/delete-warning';
import './index.scss';
import TagPill from 'utils/tag';

interface IStateProps {
    admin : IAdmin;
    http: IHttp;
}

interface IDispatchProps {
    getClientSubscriptions : (PageNumber?: number, PageSize?: number, query?: string) => void;
    deleteAPIConfig : (id: number) => void;
}

interface IProps extends IStateProps, IDispatchProps {}

const ClientSubscriptions:FC<IProps> = (props) => {

    const { getClientSubscriptions, admin, deleteAPIConfig, http } = props;
    const { clientSubscriptions  = [], loading = false } = admin;
    const { id } = useParams<{ id: string }>();
    const history = useHistory();
    const [ isMoreOption, setIsMoreOption ] = useState( false );
    const [ csObject, setCSObject ] = useState({} as IClientSubscription);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(50);
    const [pageNumber, setPageNumber] = useState(1);
    const pageSize = 20;

    useEffect(()=>{
        if(!id)
        getClientSubscriptions(pageNumber, pageSize, '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[id]);

    useEffect(() => {
        if(id) {
            setIsMoreOption(true)
            setCSObject(clientSubscriptions!?.filter(u => u!?.id === parseInt(id))[0])
        }else {
            setIsMoreOption(false)
            setCSObject({} as IClientSubscription)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[id]);

    const [ ClientSubList, isSearch, isSearchEmpty, setSearchMode, searchMode, cancelQuery ] = useSearch( { loading, request : clientSubscriptions, requestBySearch : clientSubscriptions } );

    let isLoad = useStrictLoader( admin.action, ActionEnums.GET_CLIENT_SUBSCRIPTIONS );

    const [ setValueFunc, ModalComponent ] = useModalWithArg( [
        <AreYouSure message='Are you sure you want to delete this API Configuration Group?' http={http} admin={admin} 
            actionEnum={ActionEnums.DELETE_API_CONFIG_GROUP} returnFunc={() => setValueFunc('deleteConfigGroup', false)} 
            deleteFunc={() => deleteAPIConfig(csObject!?.id)} url={{url: url.API_CONFIG_GROUPS, pageName: pageName.API_CONFIG_GROUPS}}
        /> 
    ], 
    { deleteConfigGroup: false } );

    const rows = ClientSubList!?.map((i, index) => {
        return { 
            id: i!?.id, b: i!?.organization!?.organizationName, c: i!?.bundleCode, d: i!?.organization!?.email,
            e: <TagPill color={i!?.subscriptionStatus === 'Active' ? '#64FDE1': '#FF5592'}  content={i!?.subscriptionStatus} />  
        }
    });

    const headCells = [
        { id: 'id', label: 'ID' },
        { id: 'orgName', label: 'Organization' },
        { id: 'bundleCode', label: 'Bundle Code' },
        { id: 'orgEmail', label: 'Email' },
        { id: 'subStatus', label: 'Status' },
    ];

    const setMoreOptions = ( id: string ) => {
        history.push(url.CLIENT_SUBSCRIPTIONS + `/${id}`, {pageName: pageName.CLIENT_SUBSCRIPTIONS});
    };

    return(
        <DashboardWrapper loading={loading && isLoad}>
            <div className="api-config-group-page">
                {!isMoreOption ?
                    <>
                        <ClientSubsFilter isSearch={isSearch} searchMode={searchMode} setSearchMode={setSearchMode} 
                            users={ClientSubList} pageNumber={pageNumber} setPageNumber={setPageNumber} rowsPerPage={rowsPerPage} 
                            setRowsPerPage={setRowsPerPage} page={page} setPage={setPage}cancelQuery={ cancelQuery } 
                            isSearchEmpty={ isSearchEmpty } isMoreOption={isMoreOption} setIsMoreOption={setIsMoreOption}
                        />
                        <Table rows={rows} headCells={headCells} rowsPerPage={50} page={page} onUClick={() => void(0)} 
                            header={'Client Subscription Table'} setMoreOptions={setMoreOptions} />
                    </>
                    :
                    <ClientSubsMD data={csObject} setIsMoreOption={setIsMoreOption} setValueFunc={setValueFunc} />
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
    getClientSubscriptions,
    deleteAPIConfig
}

export default connect(mapStateToProps, mapDispatchToProps) ( ClientSubscriptions );