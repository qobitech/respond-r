import { useMoreDetailsSection } from 'hooks/useMoreDetails';
import React, { FC, useCallback } from 'react';
import { MoreInformation } from 'utils/more-details';
import { useHistory } from 'react-router';
// import CTA from 'utils/cta';
import Loader from 'extras/images/loader/loader.svg';
import { pageName, url } from 'enums/Route';
import { IUser } from 'interfaces/IAdmin';
import './index.scss';

interface IProps {
    data: IUser;
    setIsMoreOption?: React.Dispatch<React.SetStateAction<boolean>>;
    loading?: boolean;
    showBTL?: boolean;
    setValueFunc?: (a: string, b: boolean ) => void;
}

const UserMD:FC<IProps> =( props ) => {
    
    const { setIsMoreOption, setValueFunc, loading, data } = props;
    const history = useHistory();
    const { id = '', firstName = '', middleName = '', lastName = '', email = '', organizationName = ''  } = data || {};

    const mainInfo = {
        id, firstName, middleName, lastName, email, organizationName
    };
    
    // const isWaiverLoad = useStrictLoader( 'Get waiver requests', ActionEnums.GET_WAIVER_REQUESTS );

    // const waiverContent = [
    //     {title: 'Request Waiver', action: () => {setValueFunc!('createWaiver', true)}, font: 'fa fa-exclamation-triangle', isLoad: false }
    // ]

    const MainCTA = useCallback(() => {
        return(
            <div className='cta-section'>
                {/* <CTA content={waiverContent} /> */}
                <button onClick={() => setValueFunc!('updateUser', true)}>Update</button>
                <button className='delete' onClick={() => setValueFunc!('deleteUser', true)}>Delete</button>
            </div>
        )
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const [ MoreDetailsComp ] = useMoreDetailsSection( MoreInformation, 
        { MainCTA : <MainCTA/>, onBClick : ()=> {setIsMoreOption!( false ); history.push(url.USERS, {pageName: pageName.USERS})},showBTL : true },
        { sectionHeader : 'Other Information', type : 'no-image', moreDetails : mainInfo },
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

export default React.memo(UserMD);