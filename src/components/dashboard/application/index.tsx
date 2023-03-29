import React, { useEffect, useState } from 'react';
import DashboardWrapper from '../dashboardwrapper';
import AppCard from 'utils/app-card';
import { IAppState } from 'interfaces/IAppState';
import { connect } from 'react-redux'
import { IHttp } from 'interfaces/IHttp';
import { IAdmin } from 'interfaces/IAdmin';
import { getAllApplications, addAppsToSub } from 'store/actions';
import { useStrictLoader } from 'hooks/useStrictLoader';
import { ActionEnums } from 'enums/ActionEnums';
import { useModalWithArg } from 'hooks/useModal';
import AppFilter from './app-filter';
import { useSearch } from 'hooks/useQuery';
import { useParams } from 'react-router-dom';
import { IApplication } from 'interfaces/IApplication';
import AppMD from './more-details';
import { NoSearchResults } from 'utils/refresh';
import { useNavigate } from 'react-router-dom';
import { pageName, url } from 'enums/Route';
import './index.scss';

interface IStateProps {
    admin : IAdmin;
    http: IHttp;
}

interface IDispatchProps {
    getAllApplications : (PageNumber?: number, PageSize?: number, query?: string) => void;
    addAppsToSub: (data: Array<{ applicationId: number, organizationSubscriptionId: number }>) => void;
}

interface IProps extends IStateProps, IDispatchProps {};
const Applications = (props: IProps) => {

    const { admin, getAllApplications, addAppsToSub } = props;
    const { applications = [], loading = false, organizationInfo } = admin;
    const { organizationSubscription } = organizationInfo![0] || {};
    const { id: orgSubId = 0 } = organizationSubscription || {};
    const { id } = useParams<{ id: string }>();
    const [ isMoreOption, setIsMoreOption ] = useState( false );
    const [ appObject, setAppObject ] = useState({} as IApplication);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(50);
    const [pageNumber, setPageNumber] = useState(1);
    const pageSize = 20;
    const navigate = useNavigate();

    useEffect(() => {
        if(!id)
        getAllApplications(pageNumber, pageSize, '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        if(id) {
            setIsMoreOption(true)
            setAppObject(applications!?.filter(u => u!?.id === parseInt(id))[0])
        }else {
            setIsMoreOption(false)
            setAppObject({} as IApplication)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[id]);

    const [ appList, isSearch, isSearchEmpty, setSearchMode, searchMode, cancelQuery ] = useSearch( { loading, request : applications, requestBySearch : applications } );

    let isPageLoad = useStrictLoader( admin.action, ActionEnums.GET_ALL_APPLICATIONS );

    const [ setValueFunc, ModalComponent ] = useModalWithArg( [ <></> ], { deleteApp: false } );

    const filterCTAContent = [
        {title: 'Create Application', action: () => {navigate(url.CREATE_APP, {state: {pageName: pageName.CREATE_APP}})}, font: '', isLoad: false }
    ];

    return(
        <DashboardWrapper loading={loading && isPageLoad}>
            <div className="applications">
                {/* <Prompt reference={filterRef} trigger={true} content={<p>Boom</p>} /> */}
                {
                    !isMoreOption ?

                    <>
                        <div>
                            <AppFilter isSearch={isSearch} searchMode={searchMode} setSearchMode={setSearchMode} users={appList} 
                                pageNumber={pageNumber} setPageNumber={setPageNumber} rowsPerPage={rowsPerPage} 
                                setRowsPerPage={setRowsPerPage} page={page} setPage={setPage}cancelQuery={ cancelQuery } 
                                isSearchEmpty={ isSearchEmpty } isMoreOption={isMoreOption} setIsMoreOption={setIsMoreOption}
                                filterCTAContent={filterCTAContent}
                            />
                        </div>

                        {appList!?.length > 0 ?
                            <div className="app-preview">
                                {appList!?.map((a, index) => {
                                    const { id = 0, applicationName = '', createdAt = '' } = a || {};
                                    return(
                                        <div key={index} >
                                            <AppCard id={id} title={applicationName} description={applicationName} 
                                                date={new Date(createdAt).toDateString()} />
                                        </div>
                                    )
                                })}
                            </div>

                            :

                            <NoSearchResults />
                        }

                    </>

                    :

                    <AppMD data={appObject} setIsMoreOption={setIsMoreOption} setValueFunc={setValueFunc} 
                        addAppsToSub={addAppsToSub} orgSubId={orgSubId} loading={loading} />
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
    getAllApplications,
    addAppsToSub
}

export default connect(mapStateToProps, mapDispatchToProps) ( Applications );