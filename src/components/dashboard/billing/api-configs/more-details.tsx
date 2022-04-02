import { useMoreDetailsSection } from 'hooks/useMoreDetails';
import React, { FC, useCallback } from 'react';
import { MoreInformation } from 'utils/more-details';
import { useHistory } from 'react-router';
// import CTA from 'utils/cta';
import Loader from 'extras/images/loader/loader.svg';
import { pageName, url } from 'enums/Route';
import { IAPIConfig } from 'interfaces/IBilling';
import './index.scss';
import { handleAmount } from 'utils/thousand-sep';

interface IProps {
    data: IAPIConfig;
    setIsMoreOption?: React.Dispatch<React.SetStateAction<boolean>>;
    loading?: boolean;
    showBTL?: boolean;
    setValueFunc?: (a: string, b: boolean ) => void;
}

const ConfigMD:FC<IProps> =( props ) => {
    
    const { setIsMoreOption, setValueFunc, loading, data } = props;
    const history = useHistory();
    const { groupCode = '', billingCategoryCode = '', apiName = '', apiRoute = '', description = '', perCallRate = 0, applyDiscountAfter = 0, discount = 0 } = data || {};

    const mainInfo = {
        billingCategoryCode, groupCode, apiName, apiRoute, description, perCallRate, applyDiscountAfter: handleAmount(applyDiscountAfter), discount
    };
    
    // const isWaiverLoad = useStrictLoader( 'Get waiver requests', ActionEnums.GET_WAIVER_REQUESTS );

    // const waiverContent = [
    //     {title: 'Request Waiver', action: () => {setValueFunc!('createWaiver', true)}, font: 'fa fa-exclamation-triangle', isLoad: false }
    // ]

    const MainCTA = useCallback(() => {
        return(
            <div className='cta-section'>
                {/* <CTA content={waiverContent} /> */}
                <button onClick={() => setValueFunc!('updateApiConfig', true)}>Update</button>
                <button className='delete' onClick={() => setValueFunc!('deleteApiConfig', true)}>Delete</button>
            </div>
        )
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const [ MoreDetailsComp ] = useMoreDetailsSection( MoreInformation, 
        { MainCTA : <MainCTA/>, onBClick : ()=> {setIsMoreOption!( false ); history.push(url.API_CONFIGS, {pageName: pageName.API_CONFIGS})},showBTL : true },
        { sectionHeader : 'Main Information', type : 'no-image', moreDetails : mainInfo },
    )

    return(
        <div>
            {
                loading ?
                <div style={{ textAlign:'center' }}>
                    <img src={Loader} alt="loading...."/>
                </div>
                :
                MoreDetailsComp
            }
            {/* {ModalComponent} */}
        </div>
    )
};

export default React.memo(ConfigMD);