import React, { useEffect, useState } from 'react';
import DashboardWrapper from '../dashboardwrapper';
import Table from 'utils/table';
import './index.scss';
import { useModalWithArg } from 'hooks/useModal';
import { getAllUsers } from 'store/actions'
import {  IAppState } from 'interfaces/IAppState'
import CreateUpdUser from './create_upd-user';
import { connect } from 'react-redux'
import {  IAdmin } from 'interfaces/IAdmin'
import {  IHttp } from 'interfaces/IHttp'
import { pageName, url } from 'enums/Route';
import { useParams, useNavigate } from 'react-router-dom';
import { IUser } from 'interfaces/IAdmin';
import UserMD from './more-details';
import UserFilter from './user-filter';
import { useSearch } from 'hooks/useQuery';
import AreYouSure from 'utils/delete-warning';
import { useStrictLoader } from 'hooks/useStrictLoader';
import { ActionEnums } from 'enums/ActionEnums';
import TagPill from 'utils/tag';

interface IStateProps {
    admin : IAdmin;
    http: IHttp;
}

interface IDispatchProps {
    getAllUsers : (PageNumber?: number, PageSize?: number, query?: string) => void;
}

interface IProps extends IStateProps, IDispatchProps {}

const UserManagement = (props: IProps) => {

    const { getAllUsers, admin, http } = props;
    const { users  = [], loading = false } = admin;
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [ isMoreOption, setIsMoreOption ] = useState( false );
    const [ userObject, setUserObject ] = useState({} as IUser);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(50);
    const [pageNumber, setPageNumber] = useState(1);
    const pageSize = 20;

    useEffect(()=>{
        if(!id)
        getAllUsers(pageNumber, pageSize, '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[id]);

    useEffect(() => {
        if(id) {
            setIsMoreOption(true)
            setUserObject(users!?.filter(u => u!?.id === id)[0])
        }else {
            setIsMoreOption(false)
            setUserObject({} as IUser)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[id]);

    const [ userList, isSearch, isSearchEmpty, setSearchMode, searchMode, cancelQuery ] = useSearch( { loading, request : users, requestBySearch : users } );

    const rows = userList!?.map((i, index) => {
        return { 
            id: i!?.id, b: i!?.username, c: i!?.firstName, d: i!?.lastName, e: i!?.employeeId,
            h: <TagPill color={i!?.isEnabled ? '#64FDE1': '#FF5592'}  content={i!?.isEnabled ? 'Active' : 'Pending'} />   
        }
    });

    const headCells = [
        { id: 'id', label: 'ID' },
        { id: 'users', label: 'UserName' },
        { id: 'firstName', label: 'First Name' },
        { id: 'lastName', label: 'Last Name' },
        { id: 'employeeId', label: 'Employee ID' },
        { id: 'status', label: 'Status' },
    ];

    const [ setValueFunc, ModalComponent ] = useModalWithArg( 
        [ <CreateUpdUser organizationId={1} />, <CreateUpdUser update prevUser={userObject} />, 
        <AreYouSure message='Are you sure you want to delete this user?' http={http} admin={admin} 
            actionEnum={ActionEnums.DELETE_API_CONFIG} returnFunc={() => setValueFunc('deleteUser', false)} 
            deleteFunc={() => void(0)} url={{url: url.USERS, pageName: pageName.USERS}}
        /> 
    ], 
    { createUser: false, updateUser: false, deleteUser: false } );

    const setMoreOptions = ( id: string ) => {
        navigate(url.USERS + `/${id}`, {state: {pageName: pageName.USERS}});
    };

    let isLoad = useStrictLoader( admin.action, ActionEnums.GET_ALL_USERS );

    const filterCTAContent = [
        {title: 'Create User', action: () => {setValueFunc!('createUser', true)}, font: '', isLoad: false }
    ]

    return(
        <DashboardWrapper loading={loading && isLoad}>
            <div className="user-management">
                {
                    !isMoreOption ?
                    
                    <>
                        <UserFilter isSearch={isSearch} searchMode={searchMode} setSearchMode={setSearchMode} users={userList} 
                            pageNumber={pageNumber} setPageNumber={setPageNumber} rowsPerPage={rowsPerPage} 
                            setRowsPerPage={setRowsPerPage} page={page} setPage={setPage}cancelQuery={ cancelQuery } 
                            isSearchEmpty={ isSearchEmpty } isMoreOption={isMoreOption} setIsMoreOption={setIsMoreOption}
                            filterCTAContent={filterCTAContent}
                        />
                        <Table rows={rows} headCells={headCells} rowsPerPage={50} page={page} onUClick={() => void(0)} header={'User Table'} setMoreOptions={setMoreOptions} />
                    </>

                    :

                    <UserMD data={userObject} setIsMoreOption={setIsMoreOption} setValueFunc={setValueFunc} />
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
    getAllUsers
}

export default connect(mapStateToProps, mapDispatchToProps) ( UserManagement );