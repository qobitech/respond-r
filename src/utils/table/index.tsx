import  React from 'react';
import { connect } from "react-redux";
import { setTableIndex } from 'store/actions';
import { NoSearchResults } from 'utils/refresh';
import './index.scss';

interface EnhancedTableProps {
    rowCount: number;
}

export interface Data {
    id: string;
    [key: string]: string  | number | false | JSX.Element | undefined ;
    f?: string | number| false | JSX.Element;
    g?: string | number| false | JSX.Element;
};

interface HeadCell {
    id: string | number;
    label: string;
}

interface IDispatchProps {
    setTableIndex: (tabIndex: string) => void;
}

interface IProps extends IDispatchProps {
    onUClick?: React.MouseEventHandler<HTMLTableDataCellElement>;
    onDClick?: React.MouseEventHandler<HTMLTableDataCellElement>;
    hidePagination?: boolean;
    headCells: Array<HeadCell>;
    rows: Data[];
    header?: string;
    setMoreOptions?:( index: string )=> void;
    page: number;
    rowsPerPage: number;
    is50?: boolean;
    showUpdate?: boolean;
};

const InstanceTable = (props: IProps) => {
    const { headCells, rows, onUClick, onDClick, setTableIndex, setMoreOptions, page, rowsPerPage, header = '', showUpdate = true } = props;

    const EnhancedTableHead = (props: EnhancedTableProps) => {

        return (
            <thead>
                <tr>
                {headCells.filter(i => i!?.id !== 'id')
                    .map((headCell) => {
                        const { id='', label=''} = headCell || {}
                        return(
                            id === 'update' ?
                            showUpdate &&
                                <th key={id} >
                                    <b>{label}</b>
                                </th>
                            :
                            <th key={id} >
                                <b>{label}</b>
                            </th>
                        )
                    })}
                </tr>
            </thead>
        );
    };

    const multiFunction = ( index: string ) => {
        setMoreOptions !== undefined && setMoreOptions( index );
    };

    return (
        <>
            <h3 style={{marginTop: 0}}>{header}</h3>
            <div className='table-wrapper'>
                <table className='requests-table'>
                    <EnhancedTableHead rowCount={rows?.length} />
                    <tbody >
                        {rows!?.map((row, index) => {
                            return (
                                <tr key={page*rowsPerPage + index} className='body-tr'>	
                                    {
                                        Object.keys(row)!?.filter(r => (r !== 'g') && (r !== 'id') && (r !== 'f')  )!?.map((r2, index) => {
                                            const value = row[r2]
                                            return(
                                                <td onClick={(e)=> typeof value === "string" && multiFunction( row.id) } 
                                                    key={index} >
                                                 {value}
                                                </td>
                                            )
                                        })
                                    }
                                    {row.g && showUpdate &&
                                        <td onClick={(e) => { onUClick!(e); setTableIndex(row.id) }}
                                            key={`${index} update`} >
                                            {typeof onUClick === "function" &&
                                                <p><i className='fa fa-edit' style={{color: '#3f51b5'}}></i></p>
                                            }
                                        </td>
                                    }		
                                    {row.f &&
                                        <td onClick={(e) => { onDClick!(e); setTableIndex(row.id) }}
                                            key={`${index} delete`} >
                                            {typeof onDClick === "function" &&
                                                <p><i className='fa fa-trash' style={{color: '#FF5592'}}></i></p>
                                            }
                                        </td>
                                    }		
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            {(rows!?.length === 0 || rows === undefined || rows === null) && <NoSearchResults />}
        </>
    );
}

const mapDispatchToProps: IDispatchProps = {
    setTableIndex,
}

export default connect(null, mapDispatchToProps)(InstanceTable);