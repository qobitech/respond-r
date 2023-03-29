import React, { FC, useState } from 'react'
import N_A from '../../extras/images/N_A.jpg';
import './card.scss';

interface ICardProps {
    cardObject: {[ key: string ]: any};
    cardImage: string;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    cardHeader?: string;
    logo?: string;
    headerHover?: string;
    onHeaderClick?: () => void;
}

const GCard:FC<ICardProps> = ( props ) => {
    const { cardObject, cardImage, onClick, cardHeader, logo, headerHover, onHeaderClick } = props;
    const [ hHover, setHHover ] = useState('');

    return(
        <div className="card-container" >

            <div className="card-header" onMouseOver={() => setHHover('show')} onMouseLeave={() => setHHover('')}
                onClick={onHeaderClick}>
                {hHover.length>0 && headerHover!?.length>0 &&
                    <div className='header-hover' >
                        <p>{headerHover}</p>
                    </div>
                }
                <p className="card-label">
                    {cardHeader}
                </p>
                {/* <i className="fa fa-ellipsis-v" /> */}
            </div>

            <div className="image" onClick={ onClick } style={{ cursor : "pointer" }}>
                <img src={ cardImage || N_A } alt="" />
            </div>
            <div className="card-body">
                {
                    Object.keys(cardObject).map((item, index) => {
                        return(
                            <div key={index}>
                                {
                                    index === 0 && logo!?.length > 0 &&
                                    <div className='logo'>
                                        <img src={logo} alt="logo"/>
                                    </div>
                                }
                                <div style={{margin: '5px 10px'}}>
                                    <p className="card-label">{item}</p>
                                    <p className="card-text">{cardObject[ item ]}</p>
                                </div>

                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default GCard;