import React, { FC } from 'react';
import './index.scss';

interface IAPIConfigCard {
    code: string;
    description: string;
    apiName: string;
    apiRoute: string;
    perCallRate: number;
    applyDiscountAfter: number;
    discount: number;
}

const APIConfigCard:FC<IAPIConfigCard> = (props) => {

    const { code = '', apiName = '', apiRoute = '', description = '', perCallRate = 0, applyDiscountAfter = 0, discount = 0 } = props;

    return(
        <div className="api-config-card">
            
            <div className='abc-body'>
                <h2>{code} <i className='fa fa-arrow-up'></i></h2>
                <p>{apiName}</p>
                <p>{apiRoute} <i className='fa fa-clone'></i></p>
                <div className="abc-description">
                    <p className="desc">{description}</p>
                </div>
                <div className="discount-numbers">
                    <p>Call Rate: {perCallRate}</p>
                    <p>Apply Discount After: {applyDiscountAfter}</p>
                    <p>Discount: {discount}</p>
                </div>
            </div>
        </div>
    )
};

export default APIConfigCard;

/*<div className="api-config-preview">
{
    apiConfigs!?.map((ap, index) => {
        const { apiName = '', description = '', billingCategoryCode = '', apiRoute = '', perCallRate = 0, applyDiscountAfter = 0, discount = 0  } = ap || {};
        return(
            <APIConfigCard code={billingCategoryCode} description={description} apiName={apiName}
            apiRoute={apiRoute} perCallRate={perCallRate} applyDiscountAfter={applyDiscountAfter} discount={discount} key={index} />
        )
    })
}
</div> */