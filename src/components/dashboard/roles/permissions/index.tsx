import React, { FC, useEffect, useState } from 'react';
import DashboardWrapper from 'components/dashboard/dashboardwrapper';
import { useModalWithArg } from 'hooks/useModal';
import { getPermissions } from 'store/actions'
import {  IAppState } from 'interfaces/IAppState'
import { connect } from 'react-redux'
import {  IAdmin } from 'interfaces/IAdmin'
import PermissionFilter from './permission-filter';
import { useSearch } from 'hooks/useQuery';
import { useStrictLoader } from 'hooks/useStrictLoader';
import { ActionEnums } from 'enums/ActionEnums';
import Table from 'utils/table';
import './index.scss';

interface IStateProps {
    admin : IAdmin;
};

interface IDispatchProps {
    getPermissions : (PageNumber?: number, PageSize?: number, query?: string) => void;
}

interface IProps extends IStateProps, IDispatchProps {}

const Permissions:FC<IProps> = (props) => {

    const { getPermissions, admin } = props;
    const { permissions  = [], loading = false } = admin;
    const [ isMoreOption, setIsMoreOption ] = useState( false );
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(50);
    const [pageNumber, setPageNumber] = useState(1);
    const pageSize = 20;

    useEffect(()=>{
        getPermissions(pageNumber, pageSize, '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const [ permissionList, isSearch, isSearchEmpty, setSearchMode, searchMode, cancelQuery ] = useSearch( { loading, request : permissions, requestBySearch : permissions } );

    const rows = permissionList!?.map((i, index) => {
        return { 
            id: i!?.id, b: i!?.permission, c: i!?.permissionGroup, d: i!?.description,
        }
    });

    const headCells = [
        { id: 'id', label: 'ID' },
        { id: 'permissions', label: 'Name' },
        { id: 'group', label: 'Group' },
        { id: 'description', label: 'Description' },
    ];

    const [ setValueFunc, ModalComponent ] = useModalWithArg( [<></> ], { createPermission: false} );

    let isLoad = useStrictLoader( admin.action, ActionEnums.GET_PERMISSIONS );

    const filterCTAContent = [
        {title: 'Add Permission', action: () => {setValueFunc!('createPermission', true)}, font: '', isLoad: false }
    ]

    return(
        <DashboardWrapper loading={loading && isLoad}>
            <div className="permissions">
                <PermissionFilter isSearch={isSearch} searchMode={searchMode} setSearchMode={setSearchMode} permissions={permissionList} 
                    pageNumber={pageNumber} setPageNumber={setPageNumber} rowsPerPage={rowsPerPage} 
                    setRowsPerPage={setRowsPerPage} page={page} setPage={setPage}cancelQuery={ cancelQuery } 
                    isSearchEmpty={ isSearchEmpty } isMoreOption={isMoreOption} setIsMoreOption={setIsMoreOption}
                    filterCTAContent={filterCTAContent}
                />
                <Table rows={rows} headCells={headCells} rowsPerPage={50} page={page} onUClick={() => void(0)} header={'Permissions Table'} />
                {ModalComponent}
            </div>   
        </DashboardWrapper>
    )
};

const mapStateToProps = (state: IAppState): IStateProps => ({
    admin: state.admin
});

const mapDispatchToProps: IDispatchProps = {
    getPermissions
}

export default connect(mapStateToProps, mapDispatchToProps) ( Permissions );