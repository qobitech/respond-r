import React, { useRef, useLayoutEffect } from 'react';
import AutoInput from 'utils/auto-complete';
import { separator } from '../helpers';
import './index.scss';

type Ie = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>; 

interface IFormProps {
    label : string;
    name : string;
    placeholder?: string;
    value?: string | number;
    onChange : ( e: Ie ) => void;
    isAI?: boolean;
    isDate?: boolean;
    handleLIClick?: (e: any, name: string) => void;
    options?: Array<string>;
    refreshFunc?: Function;
    loading?: boolean;
};

const FilterForm = (props: IFormProps) => {

    const { label, name, placeholder, value, onChange, options, handleLIClick, refreshFunc, loading, isAI } = props;

    const inputRef = useRef<HTMLInputElement>(null)

    useLayoutEffect(()=>{
        if( null !== inputRef.current ){
            const inputSize = `${inputRef.current!?.getAttribute('placeholder')!?.length}`
            inputRef.current.setAttribute('size', parseInt(inputSize) > 15 ? inputSize : '30' )
        }
    },[])

    return(
        <div className='filter-form'>
            {
                isAI?

                <div className="input-area">
                     <p className="label">{label}</p>
                    <AutoInput options={ options! } onLIClick={(e) => handleLIClick!(e, name)}
                        onChange={onChange!} fullWidth name={ name } refreshData={() => refreshFunc!() }
                        onXClick={() => void(0)} isLoad={loading} key={options![0]} />
                </div>
                :
                <div className="input-area">
                    <p className="label">{label}</p>
                    <input type="text" name={ name } onChange={ onChange } value={ value }
                        placeholder={ placeholder } autoComplete='oops' />
                </div>
            }
        </div> 
    )
}

export type filterAR = {[ key : string] : any, isAI?: boolean, isDate?: boolean, options?: Array<string>, State?: Array<{[key: string]: any}>, refreshFunc?: Function, loading?:boolean }[]

interface IProps {
    filterParameters: filterAR;
    setFilterParameters: React.Dispatch<React.SetStateAction<filterAR>>;
    callEndpointByBtnSearch : (  e : React.MouseEvent<HTMLButtonElement> ) => void;
    showFilter: boolean;
    setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
    closeFunction?: ( ) => void;
    setPage?: React.Dispatch<React.SetStateAction<number>>;
    setIndexA?: React.Dispatch<React.SetStateAction<number>>;
    setPageNumber?: React.Dispatch<React.SetStateAction<number>>;
};

const MainFilter = <T extends IProps>(props : T ) => {

    const { filterParameters = [], setFilterParameters, callEndpointByBtnSearch, showFilter, setShowFilter, setPage, setIndexA, setPageNumber  } = props;

    const handleFilterParams = (e: Ie, index: number) => {
        const { name, value } = e.target;
        e.stopPropagation();
        let great = [...filterParameters]
        let boom = great[index]
        boom[name] = value
        great[index] = boom
        setFilterParameters(great);
    };

    const handleLIClick = (e: any, name: string, index: number) => {
        const { innerText } = e.currentTarget;
        let great = [...filterParameters]
        let boom = great[index]
        boom[name] = boom!?.State!?.filter(c => c!?.name === innerText)[0]!?.id
        great[index] = boom
        setFilterParameters(great);
    };

    // const cF = (  ) => {
    //     return typeof closeFunction === 'function' ? closeFunction() : void(0);
    // };

    const handleFilterClick = () => {
        setPage!(0);
        setIndexA!(1);
        setPageNumber!(1)
    };

    return(
        <>
        {showFilter &&
        <div className='main-filter'>
            <div onClick={() => setShowFilter(false)} className='close-window'>
                <i className='fa fa-window-close' style={{paddingLeft:'5px'}}></i>
            </div>
            <div className="filter-form-section">
                {Array.isArray(filterParameters) && filterParameters!?.map((name, index) => {
                    var nameList = Object.keys(name)
                    return(
                        <div key={index}>
                            <FilterForm label={separator( nameList![0] )} name={nameList![0]} 
                                onChange={(e) => handleFilterParams(e, index)} 
                                value={Object.values(name)[0]}
                                placeholder={ separator( nameList![0] ) } handleLIClick={(e) => handleLIClick(e, nameList![0], index )} options={name!?.options} isAI={name!?.isAI} isDate={name!?.isDate}
                                refreshFunc={name!?.refreshFunc} loading={name!?.loading}
                                /> 
                        </div>
                    )
                }) }
            </div>
            <div className='filter-btn'>
                <button onClick={ (e) => {callEndpointByBtnSearch(e); handleFilterClick()}} >
                    Filter
                </button>
                {/* <div onClick={() => { setShowFilter(false); cF(); } } className='close' >
                    <p>Close</p>
                </div> */}
            </div>
        </div>}
        </>
    )
};

export default MainFilter;

export const setFilterQuery = ( filterParameters : filterAR ) => {
    let filterVariable : string = '';
    filterParameters.forEach(( item, index )=>{
        const value = Object.values(item)[0]
        const key = Object.keys(item)[0]
        if(value !== "" )
        filterVariable += `${key}=${value}&`;          
    })
    return filterVariable
};