import React, { FC } from 'react';
import { connect } from "react-redux";
import { useStrictLoader } from 'hooks/useStrictLoader'
import { IAdmin } from 'interfaces/IAdmin';
import { IAppState } from 'interfaces/IAppState';
import Filter from 'utils/filter/Filter';
import { getAllOrganizations } from 'store/actions';
import { ActionEnums } from 'enums/ActionEnums';
import { pageName } from 'enums/Route';

interface IStateProps {
    admin: IAdmin;
};

interface IDispatchProps {
    getAllOrganizations: (PageNumber?: number, PageSize?: number, query?: string) => void;
};

interface IProps extends IStateProps, IDispatchProps {
    isSearch: boolean;
    searchMode: boolean;
    setSearchMode: React.Dispatch<React.SetStateAction<boolean>>;
    orgs: Array<{[key : string] : any }>;
    pageNumber: number;
    setPageNumber: React.Dispatch<React.SetStateAction<number>>;
    rowsPerPage: number;
    setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
    page: number;
    setPage : React.Dispatch<React.SetStateAction<number>>;
    cancelQuery:()=> void;
    isSearchEmpty: boolean;
    isMoreOption: boolean;
    setIsMoreOption: React.Dispatch<React.SetStateAction<boolean>>;
    showOnlyPagination?: boolean;
    filterCTAContent?: Array<{ title: string, action: () => void, className?: string, font?: string, isLoad: boolean }>;
};

const OrgFilter: FC<IProps> = (props) => {
    const { admin, orgs, isSearch, pageNumber, getAllOrganizations, setPageNumber, rowsPerPage, setRowsPerPage, searchMode, setSearchMode, page, setPage, cancelQuery, isSearchEmpty, isMoreOption, setIsMoreOption, showOnlyPagination, filterCTAContent } = props;
    const { totalCount = 0, loading = false } = admin || [];
    let isLoad = useStrictLoader( admin.action, ActionEnums.GET_ALL_ORGANIZATIONS );

    const filterObject = [ {organizationName: ''}, {email: ''}, {phoneNumber: ''}, {state: ''} ];

    return(
        <div style={{}}>
            <Filter isSearch={isSearch} isSearchEmpty={isSearchEmpty} searchMode={searchMode}
                setSearchMode={setSearchMode} gArray={orgs} pageNumber={pageNumber} 
                setPageNumber={setPageNumber} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage}
                page={page} setPage={setPage} cancelQuery={cancelQuery} loading={loading} 
                totalCount={totalCount} getAll={getAllOrganizations}
                getBySearch={getAllOrganizations} clearBySearch={() => void(0)} pageName={pageName.ORGANIZATION}
                filterInit={filterObject} isLoad={isLoad} filterCTAContent={filterCTAContent}
                isMoreOption={isMoreOption} setIsMoreOption={setIsMoreOption} showOnlyPagination={showOnlyPagination}
            />
        </div>
    )
}

const mapStateToProps = (state: IAppState): IStateProps => ({
    admin: state.admin,
});

const mapDispatchToProps: IDispatchProps = {
    getAllOrganizations
};

export default connect(mapStateToProps, mapDispatchToProps)(OrgFilter);