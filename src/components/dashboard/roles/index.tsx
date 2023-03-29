import React, { useEffect, useState } from 'react';
import DashboardWrapper from 'components/dashboard/dashboardwrapper';
import { useModalWithArg } from 'hooks/useModal';
import { getAllRoles, deleteRole } from 'store/actions'
import {  IAppState } from 'interfaces/IAppState'
import { connect } from 'react-redux'
import {  IAdmin } from 'interfaces/IAdmin'
import RoleFilter from './role-filter';
import { useSearch } from 'hooks/useQuery';
import { useStrictLoader } from 'hooks/useStrictLoader';
import { ActionEnums } from 'enums/ActionEnums';
import Table from 'utils/table';
import CreateUpdRole from './create_upd-role';
import { IRole } from 'interfaces/IRole';
import { OrgAdmin, SuperAdmin } from 'utils/roles';
import AreYouSure from 'utils/delete-warning';
import { IHttp } from 'interfaces/IHttp';
import { pageName, url } from 'enums/Route';
import './index.scss';

interface IStateProps {
    admin : IAdmin;
    http: IHttp;
};

interface IDispatchProps {
    getAllRoles : (PageNumber?: number, PageSize?: number, query?: string) => void;
    deleteRole: ( id: string ) => void;
}

interface IProps extends IStateProps, IDispatchProps {}

const Roles = (props: IProps) => {

    const { getAllRoles, admin, http, deleteRole } = props;
    const { roles = [], loading = false, tableIndex = '' } = admin;
    const [ isMoreOption, setIsMoreOption ] = useState( false );
    const [page, setPage] = useState(0);
    const [ roleObject, setRoleObject ] = useState({} as IRole);
    const [rowsPerPage, setRowsPerPage] = useState(50);
    const [pageNumber, setPageNumber] = useState(1);
    const pageSize = 20;

    useEffect(()=>{
        getAllRoles(pageNumber, pageSize, '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const [ roleList, isSearch, isSearchEmpty, setSearchMode, searchMode, cancelQuery ] = useSearch( { loading, request : roles, requestBySearch : roles } );

    const rows = roleList!?.map((i, index) => {
        return { 
            id: i!?.id, b: i!?.name, c: i!?.roleCategory, d: i!?.roleDescription, g: 'update', f: 'delete'
        }
    });

    const headCells = [
        { id: 'id', label: 'ID' },
        { id: 'Roles', label: 'Name' },
        { id: 'category', label: 'Category' },
        { id: 'description', label: 'Description' },
        { id: 'update', label: 'Update'},
        { id: 'delete', label: 'Delete'},
    ];

    const [ setValueFunc, ModalComponent ] = useModalWithArg( [<CreateUpdRole />, <CreateUpdRole update prevRole={roleObject} />, 
        <AreYouSure message='Are you sure you want to delete this Role?' http={http} admin={admin} 
            actionEnum={ActionEnums.DELETE_ROLE} returnFunc={() => setValueFunc('deleteRole', false)} 
            deleteFunc={() => deleteRole(roleObject!?.id)} url={{url: url.ROLES, pageName: pageName.ROLES}}
        />],
        { createRole: false, updateRole: false, deleteRole: false } );

    let isLoad = useStrictLoader( admin.action, ActionEnums.GET_ALL_ROLES );

    const filterCTAContent = [
        {title: 'Create Role', action: () => {setValueFunc!('createRole', true)}, font: '', isLoad: false, show: OrgAdmin || SuperAdmin }
    ];

    useEffect(() => {
        setRoleObject(roleList!?.filter(r => r!?.id === tableIndex)[0] as IRole)
    }, [tableIndex, roleList]);

    return(
        <DashboardWrapper loading={loading && isLoad}>
            <div className="roles">
                <RoleFilter isSearch={isSearch} searchMode={searchMode} setSearchMode={setSearchMode} roles={roleList} 
                    pageNumber={pageNumber} setPageNumber={setPageNumber} rowsPerPage={rowsPerPage} 
                    setRowsPerPage={setRowsPerPage} page={page} setPage={setPage}cancelQuery={ cancelQuery } 
                    isSearchEmpty={ isSearchEmpty } isMoreOption={isMoreOption} setIsMoreOption={setIsMoreOption}
                    filterCTAContent={filterCTAContent}
                />
                <Table rows={rows} headCells={headCells} rowsPerPage={50} page={page} header={'Roles Table'} 
                    onUClick={() => setValueFunc!('updateRole', true)} showUpdate={SuperAdmin || OrgAdmin} 
                    onDClick={() => setValueFunc!('deleteRole', true)} />
                {ModalComponent}
            </div>   
        </DashboardWrapper>
    )
};

const mapStateToProps = (state: IAppState): IStateProps => ({
    admin: state.admin,
    http: state.http
});

const mapDispatchToProps: IDispatchProps = {
    getAllRoles,
    deleteRole
}

export default connect(mapStateToProps, mapDispatchToProps) ( Roles );