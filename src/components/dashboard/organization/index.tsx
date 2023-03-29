import React, { useState, useEffect } from 'react';
import DashboardWrapper from '../dashboardwrapper';
import { IAppState } from 'interfaces/IAppState';
import { connect } from 'react-redux'
import { IHttp } from 'interfaces/IHttp';
import { IAdmin } from 'interfaces/IAdmin';
import { getAllOrganizations } from 'store/actions';
import { useStrictLoader } from 'hooks/useStrictLoader';
import { ActionEnums } from 'enums/ActionEnums';
import { IAuth } from 'interfaces/IAuth';
import { useSearch } from 'hooks/useQuery';
import { useNavigate, useParams } from 'react-router-dom';
import { pageName, url } from 'enums/Route';
import OrgFilter from './org-filter';
import Table from 'utils/table';
import OrgMD from './more-details';
import { useModalWithArg } from 'hooks/useModal';
import UpdateOrg from './update-org';
import { IOrganization } from 'interfaces/IOrganization';
import './index.scss';

interface IStateProps {
    admin : IAdmin;
    http: IHttp;
    auth: IAuth;
}

interface IDispatchProps {
    getAllOrganizations: (PageNumber: number, PageSize: number, query?: string) => void;
}

interface IProps extends IStateProps, IDispatchProps {};
const Overview = (props: IProps) => {

    const { admin, getAllOrganizations } = props;
    const { loading = false, organizations = [] } = admin;
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [ isMoreOption, setIsMoreOption ] = useState( false );
    const [ orgObject, setOrgObject ] = useState({} as IOrganization);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [pageNumber, setPageNumber] = useState(1);
    const pageSize = 20;
    
    useEffect(()=>{
        if(!id)
        getAllOrganizations(pageNumber, pageSize, '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[id]);

    useEffect(() => {
        if(id) {
            setIsMoreOption(true)
            setOrgObject(organizations!?.filter(u => u!?.id === parseInt(id))[0])
        }else {
            setIsMoreOption(false)
            setOrgObject({} as IOrganization)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[id]);

    const [ setValueFunc, ModalComponent ] = useModalWithArg( [ <UpdateOrg /> ], { updateOrg: false } );

    const [ orgList, isSearch, isSearchEmpty, setSearchMode, searchMode, cancelQuery ] = useSearch( { loading, request : organizations, requestBySearch : organizations } );

    const rows = orgList!?.map((i) => {
        return { id: i!?.id, b: i!?.organizationName, c: i!?.address, d: i!?.email, e: new Date(i!?.createdAt).toDateString()}
    });

    const headCells = [
        { id: 'id', label: 'ID' },
        { id: 'name', label: 'Organization' },
        { id: 'address', label: 'Address' },
        { id: 'email', label: 'Email' },
        { id: 'createdAt', label: 'Date Created' },
    ];

    const setMoreOptions = ( id: string ) => {
        navigate(url.ORGANIZATION + `/${id}`, {state: {pageName: pageName.ORGANIZATION}});
    };

    let isPageLoad = useStrictLoader( admin.action, ActionEnums.GET_ALL_ORGANIZATIONS );

    // const [ setValueFunc, ModalComponent ] = useModalWithArg( [ <UpdateOrg /> ], { createApp: false } );

    return(
        <DashboardWrapper loading={loading && isPageLoad}>
            <div className="organization">

                <div className="org-info">
                    <div style={{padding: '1em'}}>
                        {
                            !isMoreOption ?
                            
                            <>
                                <OrgFilter isSearch={isSearch} searchMode={searchMode} setSearchMode={setSearchMode} orgs={orgList} 
                                    pageNumber={pageNumber} setPageNumber={setPageNumber} rowsPerPage={rowsPerPage} 
                                    setRowsPerPage={setRowsPerPage} page={page} setPage={setPage}cancelQuery={ cancelQuery } 
                                    isSearchEmpty={ isSearchEmpty } isMoreOption={isMoreOption} setIsMoreOption={setIsMoreOption}
                                />
                                <Table rows={rows} headCells={headCells} rowsPerPage={50} page={page} onUClick={() => void(0)} 
                                    setMoreOptions={setMoreOptions} />
                            </>

                            :

                            <OrgMD data={orgObject} setIsMoreOption={setIsMoreOption} setValueFunc={setValueFunc} />
                        }
                    </div>

                </div>
                {ModalComponent}
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
    getAllOrganizations
}

export default connect(mapStateToProps, mapDispatchToProps) ( Overview );