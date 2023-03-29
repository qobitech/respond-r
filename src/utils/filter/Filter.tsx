import React, { useState, useEffect } from 'react';
import ClearSearch from '../clearsearch'
import Refresh from '../refresh';
import Pagination from '../pagination';
import GFilter, { filterAR, setFilterQuery } from '../filter';
import CTA from '../cta';
import './index.scss';

interface IProps {
    isSearch: boolean;
    isSearchEmpty: boolean;
    searchMode: boolean;
    setSearchMode: React.Dispatch<React.SetStateAction<boolean>>;
    gArray: Array<{ [ key : string ] : any }>;
    pageName: string;
    pageNumber: number;
    setPageNumber: React.Dispatch<React.SetStateAction<number>>;
    rowsPerPage: number;
    setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
    page: number;
    setPage : React.Dispatch<React.SetStateAction<number>>;
    cancelQuery: ()=> void;
    loading: boolean; 
    totalCount: number;
    getAll: (PageNumber?: number, PageSize?: number, type?: string) => void
    getBySearch: (PageNumber?: number, PageSize?: number, query?: string, type?: string) => void
    clearBySearch: () => void;
    isLoad: boolean;
    filterInit: filterAR;
    category?: boolean;
    isMoreOption?: boolean;
    setIsMoreOption?: React.Dispatch<React.SetStateAction<boolean>>;
    categoryType?: string;
    showOnlyPagination?: boolean
    filterCTAContent?: Array<{ title: string, action: () => void, isLoad: boolean, show?: boolean, className?: string, font?: string }>;
};

const Filter = ( props: IProps ) => {

    const { getAll, getBySearch, gArray, isSearch, pageNumber, setPageNumber, rowsPerPage, category, 
            categoryType, setRowsPerPage, isSearchEmpty, setSearchMode, page, setPage, cancelQuery, 
            loading, totalCount, isLoad, filterInit, isMoreOption, setIsMoreOption, showOnlyPagination, filterCTAContent, pageName } = props;

    const [criteria, setCriteria] = useState('');
    const pageSize = 20;
    const [ indexA, setIndexA ] = useState(1);
    const [query, setQuery] = useState('');
    const [ showFilter, setShowFilter ] = useState(false);
    const [ filterParameters, setFilterParameters ] = useState( filterInit );

    const tCount = totalCount;

    const clearSearchResult = ( ) => {
        // clearBySearch();
        setIsMoreOption!( false );
        setSearchMode( false );
        cancelQuery();
        setQuery('');
        setFilterParameters( filterInit );
        category ? getAll(1, pageSize, categoryType) : getAll(1, pageSize, '')
    };

    const callEndpointByBtnSearch = ( ) => {
        cancelQuery()
        setSearchMode( true );
        switch( criteria ){
            case 'filter' : category ? getBySearch( pageNumber, pageSize, setFilterQuery( filterParameters ), categoryType ) : getBySearch( pageNumber, pageSize, setFilterQuery( filterParameters ));
                setQuery(setFilterQuery( filterParameters )); break;
            default : break;
        }
    };

    const callEndpointByPaginationSearch = ( query : string, pageNumber : number, pageSize : number ) => {
        category ? getBySearch( pageNumber, pageSize, setFilterQuery( filterParameters ), categoryType ) : 
        getBySearch( pageNumber, pageSize, setFilterQuery( filterParameters ) );
    };

    useEffect(() => {
        setIndexB((page * pageSize) + gArray!?.length )
    }, [gArray, page ]);

    useEffect(() => {
        setIndexA((page * pageSize) + 1)
    },[page])

    const [ indexB, setIndexB ] = useState(gArray!?.length);

    return(
        <div>
            <>
                {!showOnlyPagination && 
                <>
                    <div className='filter-section'>
                        {!isMoreOption &&
                            <div>
                                <button onClick={() => { setShowFilter(!showFilter); setCriteria( 'filter' ); } }>
                                    <i className="fa fa-filter"></i>
                                    Filter
                                </button>
                            </div>
                        }
                        {!showOnlyPagination &&
                            <div style={{marginLeft: '20px'}}>
                                {!isSearch ?
                                    <Refresh onClick={() => category ? getAll(pageNumber, pageSize, categoryType) : getAll(pageNumber, pageSize, '')} position='flex-start' loading={ loading && isLoad }/>
                                :
                                    <ClearSearch onClick={ (e) => { clearSearchResult( ); } } />
                                }
                            </div>
                        }
                    </div>
                    <div>
                        <div>
                            <GFilter filterParameters={filterParameters} setFilterParameters={setFilterParameters} 
                                callEndpointByBtnSearch={ callEndpointByBtnSearch } showFilter={showFilter} setShowFilter={setShowFilter} 
                                closeFunction={()=>{ if( isSearchEmpty ) clearSearchResult( ); }} setPage={setPage} setIndexA={setIndexA} 
                                setPageNumber={setPageNumber} />
                        </div>
                    </div>
                </>}
                
                {!isMoreOption && 
                <>  
                    {filterCTAContent!?.length > 0 &&
                        <div className='filter-cta'>
                            <CTA content={filterCTAContent!} />
                        </div> 
                    }

                    <Pagination array={gArray!?.length} page={page} setPage={setPage} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} pageNumber={pageNumber} setPageNumber={setPageNumber} eFunction={getAll!} indexA={indexA} setIndexA={setIndexA} indexB={indexB} setIndexB={setIndexB} query={query} searchFunction={callEndpointByPaginationSearch} tCount={tCount} loading={loading} category={category} categoryType={categoryType} isSearchEmpty={isSearchEmpty} pageName={pageName}
                    />
                </>
                }
            </>
        </div>
    )
};

export default Filter;

// {!cantCreate ?
//     create &&
//     <div className='header'>
//         <button onClick={onCClick}>
//             {header}
//         </button>
//     </div>
//     :
//     <div className='header'>
//         <h2 style={{margin:0}}>{header}</h2>
//     </div> 
// }