import React, { FC, ReactNode } from 'react';
import './index.scss';

interface IVSProps {
    children: ReactNode;
    onBClick?: React.MouseEventHandler<HTMLElement>;
    name?: string; 
    logo?: string;
    hideUpdate?: boolean;
    MainCTA?: JSX.Element;
    showBTL?: boolean;
}

export const MoreInformation:FC<IVSProps> = ( props ) => {
    const { onBClick, MainCTA, showBTL } = props;
    return(
        <div className='more-info'>
            <div className='top-section'>
                {showBTL !== false &&
                <div className='back'>
                    <p onClick={onBClick} style={{ cursor:"pointer", width:"max-content", margin:0 }} className='back-to'>
                        <i className='fa fa-arrow-left'></i>&nbsp;
                        Back to main page
                    </p>
                </div>}

                <div className='main-cta'>
                    {MainCTA}
                </div>
            </div>
        
            <div className='more-details'>
                { props.children }
            </div>
        </div>
    )
};