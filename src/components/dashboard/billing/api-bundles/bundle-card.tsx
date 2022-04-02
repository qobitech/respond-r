import React, { FC } from 'react';
import { SuperAdmin } from 'utils/roles';
import { handleAmount } from 'utils/thousand-sep';
import './index.scss';

interface IAPIBundleCard {
    code: string;
    description: string;
    noOfStars: number;
    recommended?: boolean;
    onDelClick?: React.MouseEventHandler<HTMLElement>;
    onUClick?: React.MouseEventHandler<HTMLElement>;
    onSelect?: React.MouseEventHandler<HTMLElement>;
    subscribed?: boolean;
    subscribedTo?: boolean;
}

const APIBundleCard:FC<IAPIBundleCard> = (props) => {

    const { code = '', description = '', noOfStars = 0, recommended = false, onDelClick, onUClick, onSelect, subscribed = false,
        subscribedTo = false } = props;

    return(
        <div className={`api-bundle-card ${subscribedTo ? 'subscribed' : ''}`}>

            {recommended && 
                <div className="recommended-body">
                    <p>Recommended<i className='fa fa-check-circle'></i></p>
                </div>
            }
            
            <div className='abc-body'>
                <h2>{code}</h2>
                <div className="stars">
                    {
                        [...Array(noOfStars)]!?.map((nS, index) => {
                            return(
                                <div key={index}>
                                    <i className="fa fa-star"></i>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="abc-description">
                    <p className="desc">{description}</p>
                    <h1>{handleAmount(5000)}</h1>
                </div>
                <div className="select">
                    <button onClick={typeof onSelect === 'function' ? onSelect : void(0)} disabled={subscribedTo}>
                        {subscribedTo ? 'Subscribed!' : subscribed ? 'Migrate To' : 'Select'}
                    </button>
                </div>
                
                <p>This bundle auto-renews</p>

                <div className="features">
                    <h3>Features</h3>
                    <p className='feature'>Feature 1</p>
                    <p className='feature'>Feature 2</p>
                    <p className='feature'>Feature 3</p>
                </div>
            </div>
            {SuperAdmin &&
                <div className="actions">
                    <i className='fa fa-edit edit' onClick={typeof onUClick === 'function' ? onUClick : void(0)}></i>
                    <i className='fa fa-trash delete' onClick={typeof onDelClick === 'function' ? onDelClick : void(0)}></i>
                </div>
            }
        </div>
    )
};

export default APIBundleCard;