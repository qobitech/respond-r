import  React from 'react'
import { IAppState } from "../../interfaces/IAppState";
import { IAdmin } from "../../interfaces/IAdmin";
import { connect } from 'react-redux';
import loader from '../../extras/images/loader/loader.svg';
import './index.scss';

interface IStateProps {
    admin: IAdmin;
};

interface IPagination extends IStateProps {
    array: number,
    pageName: string,
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    rowsPerPage: number;
    setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
    pageNumber: number;
    setPageNumber: React.Dispatch<React.SetStateAction<number>>;
    eFunction: (pageNumber?: number, pageSize?: number, type?: string) => void;
    indexA: number;
    setIndexA: React.Dispatch<React.SetStateAction<number>>;
    indexB: number;
    isSearchEmpty: boolean;
    setIndexB: React.Dispatch<React.SetStateAction<number>>;
    query?: string;
    searchFunction?: (query : string, pageNumber: number, pageSize: number, type?: string) => void;
    tCount?: number;
    loading?: boolean;
    category?: boolean;
    categoryType?: string;
}

const Pagination = ( props: IPagination ) => {
    const { array, page, setPage, rowsPerPage, pageNumber, setPageNumber, eFunction, category, categoryType, pageName,
            indexA, setIndexA, indexB, setIndexB, admin, searchFunction, query, tCount, loading, isSearchEmpty
    } = props;

    const pageSize = 20;

    const handleLeftArrowClick = () => {
        indexA-rowsPerPage >= 1  && setIndexA(indexA - rowsPerPage);
        indexA-rowsPerPage >= 1 && setIndexB(indexB - rowsPerPage);
        page > 0 && setPage(page-1);
        pageNumber > 0 && setPageNumber(pageNumber - 1);
        page > 0 && ((typeof query === "string" && query!.length === 0) ?
            (category? eFunction(pageNumber - 1,pageSize, categoryType) : eFunction(pageNumber - 1,pageSize)): 
            (category? searchFunction!(query!, pageNumber - 1,pageSize, categoryType) : searchFunction!(query!, pageNumber - 1,pageSize))
        )
    };

    const handleRightArrowClick = () => {
        setPage(page + 1);
        setIndexA(indexA + rowsPerPage);
        setIndexB(indexB + rowsPerPage);
        setPageNumber(pageNumber + 1);
        (typeof query === "string" && query!.length === 0) ?
        (category? eFunction(pageNumber + 1,pageSize, categoryType) : eFunction(pageNumber + 1,pageSize)): 
        (category? searchFunction!(query!, pageNumber + 1,pageSize, categoryType) : searchFunction!(query!, pageNumber + 1,pageSize))
    };
    
    return(
        <div className="pagination-container" >
            {
                !isSearchEmpty  && // && (array! > 0 )
                <div className="pagination-content" >

                    <div className="pagination-content-section left" >

                        <div className="pagination-row-title" >
                            <p className="pagination-text">{pageName}</p>
                        </div>

                    </div>
                    
                    <div className="pagination-content-section right" >

                        <div className="pagination-overview" >
                            <p className="pagination-text" >
                                { loading ? 
                                    <img src={loader} alt='loading...' height='10px'/> : 
                                    <>
                                        { indexA }&nbsp;-&nbsp;{ indexB || 0 }&nbsp;&nbsp;of&nbsp;&nbsp; {tCount} 
                                    </>
                                }
                            </p>
                        </div>
                        {
                            // array! === 50?
                            <div className="pagination-navigation" >
                                <div className={admin.loading ? 'pagination-nav left-img disable' :'pagination-nav left-img'} onClick={() =>{!admin.loading && handleLeftArrowClick()}}>
                                    <i className='fa fa-angle-right'></i>
                                </div>

                                {array! < 50 ? '' :
                                <div className={admin.loading ? 'pagination-nav right-img disable' :'pagination-nav right-img'} onClick={() =>{!admin.loading && handleRightArrowClick()}}>
                                    <i className='fa fa-angle-right'></i>
                                </div>}
                            </div>
                        }

                    </div>
                </div>
            }
        </div>
    )
};

const mapStateToProps = (state: IAppState): IStateProps => ({
    admin: state.admin,
});

export default connect(mapStateToProps)(Pagination);