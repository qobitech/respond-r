import React, { FC } from 'react';
import { connect } from "react-redux";
// import { ActionEnums } from 'enums/ActionEnums'
import { useStrictLoader } from 'hooks/useStrictLoader'
import { IAdmin } from 'interfaces/IAdmin';
import { IAppState } from 'interfaces/IAppState';
import Filter from 'utils/filter/Filter';
import { getAllUsers } from 'store/actions';
import { ActionEnums } from 'enums/ActionEnums';
import { pageName } from 'enums/Route';

interface IStateProps {
    admin: IAdmin;
};

interface IDispatchProps {
    getAllUsers : (PageNumber?: number, PageSize?: number, query?: string) => void;
}

interface IProps extends IStateProps, IDispatchProps {
    isSearch: boolean;
    searchMode: boolean;
    setSearchMode: React.Dispatch<React.SetStateAction<boolean>>;
    users: Array<{[key : string] : any }>;
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

const VehicleFilter: FC<IProps> = (props) => {
    const { admin, users, isSearch, pageNumber, setPageNumber, rowsPerPage, setRowsPerPage, searchMode, setSearchMode, page, setPage, cancelQuery, isSearchEmpty, isMoreOption, setIsMoreOption, showOnlyPagination, filterCTAContent, getAllUsers } = props;
    const { totalCount = 0, loading = false } = admin || [];
    let isLoad = useStrictLoader( admin.action, ActionEnums.GET_ALL_USERS );

    const filterObject = [ {firstName: ''}, {lastName: ''}, {employeeId: ''}, {organizationName: ''}, {state: ''}, {userType: ''} ];

    return(
        <div style={{}}>
            <Filter isSearch={isSearch} isSearchEmpty={isSearchEmpty} searchMode={searchMode}
                setSearchMode={setSearchMode} gArray={users} pageNumber={pageNumber} 
                setPageNumber={setPageNumber} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage}
                page={page} setPage={setPage} cancelQuery={cancelQuery} loading={loading} 
                totalCount={totalCount} getAll={getAllUsers}
                getBySearch={getAllUsers} clearBySearch={() => void(0)} pageName={pageName.USERS}
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
    getAllUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(VehicleFilter);