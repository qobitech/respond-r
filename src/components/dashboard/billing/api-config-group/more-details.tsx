import { useMoreDetailsSection } from 'hooks/useMoreDetails';
import React, { useCallback } from 'react';
import { MoreInformation } from 'utils/more-details';
import { useNavigate } from 'react-router';
// import CTA from 'utils/cta';
import Loader from 'extras/images/loader/loader.svg';
import { pageName, url } from 'enums/Route';
import { IAPIConfigGroup } from 'interfaces/IBilling';
import './index.scss';

interface IProps {
    data: IAPIConfigGroup;
    setIsMoreOption?: React.Dispatch<React.SetStateAction<boolean>>;
    loading?: boolean;
    showBTL?: boolean;
    setValueFunc?: (a: string, b: boolean ) => void;
}

const ConfigMD= (props: IProps) => {
    
    const { setIsMoreOption, setValueFunc, loading, data } = props;
    const navigate = useNavigate();
    const { groupCode = '', groupDescription = '' } = data || {};

    const mainInfo = {
        groupCode, groupDescription
    };
    
    // const isWaiverLoad = useStrictLoader( 'Get waiver requests', ActionEnums.GET_WAIVER_REQUESTS );

    // const waiverContent = [
    //     {title: 'Request Waiver', action: () => {setValueFunc!('createWaiver', true)}, font: 'fa fa-exclamation-triangle', isLoad: false }
    // ]

    const MainCTA = useCallback(() => {
        return(
            <div className='cta-section'>
                {/* <CTA content={waiverContent} /> */}
                <button onClick={() => setValueFunc!('updateConfigGroup', true)}>Update</button>
                <button className='delete' onClick={() => setValueFunc!('deleteConfigGroup', true)}>Delete</button>
            </div>
        )
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const [ MoreDetailsComp ] = useMoreDetailsSection( MoreInformation, 
        { MainCTA : <MainCTA/>, onBClick : ()=> {setIsMoreOption!( false ); navigate(url.API_CONFIG_GROUPS, {state: {pageName: pageName.API_CONFIG_GROUPS}})},showBTL : true },
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