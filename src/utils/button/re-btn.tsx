import React from 'react'
import loader from '../../extras/images/loader/loaderwhite.svg'
import './index.scss'

interface IProps {
    title: string | JSX.Element;
    onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
    isLoad?: boolean;
    del?: boolean;
}

export const Button = ( props : IProps ) => {
    
    const { isLoad, title, onClick, del } = props || {}

    return(
        <div className="btn-reusable">
            <button onClick={onClick} className={del ? 'delete' : ''}>
                { isLoad ? <img src={loader} alt="loading" className="icon"/> : title }
            </button> 
        </div>
    )
}