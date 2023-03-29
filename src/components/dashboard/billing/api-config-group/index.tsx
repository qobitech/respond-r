import React, { FC, useEffect, useState } from 'react';
import DashboardWrapper from 'components/dashboard/dashboardwrapper';
import { deleteAPIConfig, getAPIConfigGroups } from 'store/actions'
import {  IAppState } from 'interfaces/IAppState'
import { connect } from 'react-redux'
import {  IAdmin } from 'interfaces/IAdmin'
import {  IHttp } from 'interfaces/IHttp'
import { useParams, useNavigate } from 'react-router-dom';
import { useStrictLoader } from 'hooks/useStrictLoader';
import { ActionEnums } from 'enums/ActionEnums';
import { IAPIConfigGroup } from 'interfaces/IBilling';
import CreateConfigGroup from './create-api-config-group';
import { useSearch } from 'hooks/useQuery';
import { useModalWithArg } from 'hooks/useModal';
import ConfigGroupFilter from './config-group-filter';
import Table from 'utils/table';
import ConfigMD from './more-details';
import { pageName, url } from 'enums/Route';
import AreYouSure from 'utils/delete-warning';
import './index.scss';

interface IStateProps {
    admin : IAdmin;
    http: IHttp;
}

interface IDispatchProps {
    getAPIConfigGroups : (PageNumber?: number, PageSize?: number, query?: string) => void;
    deleteAPIConfig : (id: number) => void;
}

interface IProps extends IStateProps, IDispatchProps {}

const ApiConfigGroups:FC<IProps> = (props) => {

    const { getAPIConfigGroups, admin, deleteAPIConfig, http } = props;
    const { apiConfigGroups  = [], loading = false } = admin;
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [ isMoreOption, setIsMoreOption ] = useState( false );
    const [ aCObject, setACObject ] = useState({} as IAPIConfigGroup);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(50);
    const [pageNumber, setPageNumber] = useState(1);
    const pageSize = 20;

    useEffect(()=>{
        if(!id)
        getAPIConfigGroups(pageNumber, pageSize, '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[id]);

    useEffect(() => {
        if(id) {
            setIsMoreOption(true)
            setACObject(apiConfigGroups!?.filter(u => u!?.id === parseInt(id))[0])
        }else {
            setIsMoreOption(false)
            setACObject({} as IAPIConfigGroup)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[id]);

    const [ COnfigGroupList, isSearch, isSearchEmpty, setSearchMode, searchMode, cancelQuery ] = useSearch( { loading, request : apiConfigGroups, requestBySearch : apiConfigGroups } );

    let isLoad = useStrictLoader( admin.action, ActionEnums.GET_API_CONFIG_GROUPS );

    const [ setValueFunc, ModalComponent ] = useModalWithArg( [ <CreateConfigGroup />, 
        <CreateConfigGroup update prevConfigGroup={aCObject!} />,
        <AreYouSure message='Are you sure you want to delete this API Configuration Group?' http={http} admin={admin} 
            actionEnum={ActionEnums.DELETE_API_CONFIG_GROUP} returnFunc={() => setValueFunc('deleteConfigGroup', false)} 
            deleteFunc={() => deleteAPIConfig(aCObject!?.id)} url={{url: url.API_CONFIG_GROUPS, pageName: pageName.API_CONFIG_GROUPS}}
        /> 
    ], 
    { createConfigGroup: false, updateConfigGroup: false, deleteConfigGroup: false } );

    const rows = COnfigGroupList!?.map((i, index) => {
        return { 
            id: i!?.id, b: i!?.groupCode, c: i!?.groupDescription
        }
    });

    const headCells = [
        { id: 'id', label: 'ID' },
        { id: 'groupCode', label: 'Group Code' },
        { id: 'group Description', label: 'Group Description' },
    ];

    const filterCTAContent = [
        {title: 'Create Configuration Group', action: () => {setValueFunc!('createConfigGroup', true)}, font: '', isLoad: false }
    ];

    const setMoreOptions = ( id: string ) => {
        navigate(url.API_CONFIG_GROUPS + `/${id}`, {state: {pageName: pageName.API_CONFIG_GROUPS}});
    };

    return(
        <DashboardWrapper loading={loading && isLoad}>
            <div className="api-config-group-page">
                {!isMoreOption ?
                    <>
                        <ConfigGroupFilter isSearch={isSearch} searchMode={searchMode} setSearchMode={setSearchMode} 
                            users={COnfigGroupList} pageNumber={pageNumber} setPageNumber={setPageNumber} rowsPerPage={rowsPerPage} 
                            setRowsPerPage={setRowsPerPage} page={page} setPage={setPage}cancelQuery={ cancelQuery } 
                            isSearchEmpty={ isSearchEmpty } isMoreOption={isMoreOption} setIsMoreOption={setIsMoreOption}
                            filterCTAContent={filterCTAContent}
                        />
                        <Table rows={rows} headCells={headCells} rowsPerPage={50} page={page} onUClick={() => void(0)} 
                            header={'Configuration Group Table'} setMoreOptions={setMoreOptions} />
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
    getAPIConfigGroups,
    deleteAPIConfig
}

export default connect(mapStateToProps, mapDispatchToProps) ( ApiConfigGroups );