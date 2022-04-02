import React from 'react'
import loader from '../../extras/images/loader/loaderwhite.svg'
import './index.scss'

interface IProps {
    isLoad : boolean;
    title : string | JSX.Element;
    onClick : React.MouseEventHandler<HTMLButtonElement> | undefined;
    isSuccess : boolean;
}

export const ButtonRequest = ( props : IProps ) => {
    
    const { isLoad, title, onClick, isSuccess } = props

    return(
        <div className="btn-request">
            <button onClick={onClick}>
                { isLoad ? <img src={loader} alt="loading" className="icon"/> : title }
                { isSuccess ? (<i className="fas fa-check ir" /> ) : "" }
            </button> 
        </div>
    )
}