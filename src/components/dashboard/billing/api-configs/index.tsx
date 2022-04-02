import React, { FC, useEffect, useState } from 'react';
import DashboardWrapper from 'components/dashboard/dashboardwrapper';
import { deleteAPIConfig, getAPIConfigs } from 'store/actions'
import {  IAppState } from 'interfaces/IAppState'
import { connect } from 'react-redux'
import {  IAdmin } from 'interfaces/IAdmin'
import {  IHttp } from 'interfaces/IHttp'
import { useParams, useHistory } from 'react-router-dom';
import { useStrictLoader } from 'hooks/useStrictLoader';
import { ActionEnums } from 'enums/ActionEnums';
import { IAPIConfig } from 'interfaces/IBilling';
import CreateAPIConfig from './create-api-config';
import { useSearch } from 'hooks/useQuery';
import { useModalWithArg } from 'hooks/useModal';
import ApiConfigFilter from './api-config-filter';
import { handleAmount } from 'utils/thousand-sep';
import Table from 'utils/table';
import ConfigMD from './more-details';
import './index.scss';
import { pageName, url } from 'enums/Route';
import CopyToClipboard from 'utils/copyToClipboard';
import AreYouSure from 'utils/delete-warning';

interface IStateProps {
    admin : IAdmin;
    http: IHttp;
}

interface IDispatchProps {
    getAPIConfigs : (PageNumber?: number, PageSize?: number, query?: string) => void;
    deleteAPIConfig : (id: number) => void;
}

interface IProps extends IStateProps, IDispatchProps {}

const ApiConfigs:FC<IProps> = (props) => {

    const { getAPIConfigs, admin, deleteAPIConfig, http } = props;
    const { apiConfigs  = [], loading = false } = admin;
    const { id } = useParams<{ id: string }>();
    const history = useHistory();
    const [ isMoreOption, setIsMoreOption ] = useState( false );
    const [ aCObject, setACObject ] = useState({} as IAPIConfig);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(50);
    const [pageNumber, setPageNumber] = useState(1);
    const pageSize = 20;

    useEffect(()=>{
        if(!id)
        getAPIConfigs(pageNumber, pageSize, '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[id]);

    useEffect(() => {
        if(id) {
            setIsMoreOption(true)
            setACObject(apiConfigs!?.filter(u => u!?.id === parseInt(id))[0])
        }else {
            setIsMoreOption(false)
            setACObject({} as IAPIConfig)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[id]);

    const [ APIConfigList, isSearch, isSearchEmpty, setSearchMode, searchMode, cancelQuery ] = useSearch( { loading, request : apiConfigs, requestBySearch : apiConfigs } );

    let isLoad = useStrictLoader( admin.action, ActionEnums.GET_API_CONFIGS );

    const [ setValueFunc, ModalComponent ] = useModalWithArg( [ <CreateAPIConfig />, 
        <CreateAPIConfig update prevConfig={aCObject!} />,
        <AreYouSure message='Are you sure you want to delete this API Configuration?' http={http} admin={admin} 
            actionEnum={ActionEnums.DELETE_API_CONFIG} returnFunc={() => setValueFunc('deleteApiConfig', false)} 
            deleteFunc={() => deleteAPIConfig(aCObject!?.id)} url={{url: url.API_CONFIGS, pageName: pageName.API_CONFIGS}}
        /> 
    ], 
    { createApiConfig: false, updateApiConfig: false, deleteApiConfig: false } );

    const rows = APIConfigList!?.map((i, index) => {
        return { 
            id: i!?.id, b: i!?.groupCode,
            c: <b>{i!?.billingCategoryCode}</b>,
            d: i!?.apiName, 
            e: <CopyToClipboard toCopy={i!?.apiRoute} />, 
            h: i!?.description,
            i: i!?.perCallRate, j: handleAmount(i!?.applyDiscountAfter), k: i!?.discount, 
            l: new Date(i!?.createdAt).toDateString()
        }
    });

    const headCells = [
        { id: 'id', label: 'ID' },
        { id: 'groupCode', label: 'Group Code'},
        { id: 'billingCategoryCode', label: 'Category' },
        { id: 'apiName', label: 'API Name' },
        { id: 'apiRoute', label: 'API Route' },
        { id: 'description', label: 'Description' },
        { id: 'perCallRate', label: 'Call Rate' },
        { id: 'applyDiscountAfter', label: 'Discount After' },
        { id: 'discount', label: 'Discount' },
        { id: 'createdAt', label: 'Date Created' },
    ];

    const filterCTAContent = [
        {title: 'Create API Configuration', action: () => {setValueFunc!('createApiConfig', true)}, font: '', isLoad: false }
    ];

    const setMoreOptions = ( id: string ) => {
        history.push(url.API_CONFIGS + `/${id}`, {pageName: pageName.API_CONFIGS});
    };

    return(
        <DashboardWrapper loading={loading && isLoad}>
            <div className="api-config-page">
                {!isMoreOption ?
                    <>
                        <ApiConfigFilter isSearch={isSearch} searchMode={searchMode} setSearchMode={setSearchMode} 
                            users={APIConfigList} pageNumber={pageNumber} setPageNumber={setPageNumber} rowsPerPage={rowsPerPage} 
                            setRowsPerPage={setRowsPerPage} page={page} setPage={setPage}cancelQuery={ cancelQuery } 
                            isSearchEmpty={ isSearchEmpty } isMoreOption={isMoreOption} setIsMoreOption={setIsMoreOption}
                            filterCTAContent={filterCTAContent}
                        />
                        <Table rows={rows} headCells={headCells} rowsPerPage={50} page={page} onUClick={() => void(0)} 
                            header={'API Configuration Table'} setMoreOptions={setMoreOptions} />
                    </>
                    :
                    <ConfigMD data={aCObject} setIsMoreOption={setIsMoreOption} setValueFunc={setValueFunc} />
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
    getAPIConfigs,
    deleteAPIConfig
}

export default connect(mapStateToProps, mapDispatchToProps) ( ApiConfigs );