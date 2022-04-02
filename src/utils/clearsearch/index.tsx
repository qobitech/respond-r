import React, {FC } from 'react'
import './index.scss'


interface IClearSearchResult {
    onClick : ( e : React.MouseEvent<HTMLDivElement> ) => void;
} 

const ClearSearch : FC<IClearSearchResult> = ( props ) => {

    const { onClick } = props

    return(
        <div className="clear-search-container" >
            <div className="clear-search-content" >
                <div onClick={ onClick } className="btn" >
                    Clear Search Result
                    <i className="far fa-window-close"></i>
                </div>
            </div>
        </div>
    )
}

export default ClearSearch;