import { useMoreDetailsSection } from 'hooks/useMoreDetails';
import React, { FC, useCallback } from 'react';
import { MoreInformation } from 'utils/more-details';
import { useNavigate } from 'react-router';
import Loader from 'extras/images/loader/loader.svg';
import { pageName, url } from 'enums/Route';
import { IOrganization } from 'interfaces/IOrganization';
import AppCard from 'utils/app-card';
import './index.scss';

interface IProps {
    data: IOrganization;
    setIsMoreOption?: React.Dispatch<React.SetStateAction<boolean>>;
    loading?: boolean;
    showBTL?: boolean;
    setValueFunc?: (a: string, b: boolean ) => void;
}

const OrgMD:FC<IProps> =( props ) => {
    
    const { setIsMoreOption, setValueFunc, loading, data } = props;
    const navigate = useNavigate();
    const { organizationName = '', address = '', phoneNumber = '', email = '', createdAt = '', state = '', applications, organizationSubscription  } = data || {};
    const { bundleCode = '', subscriptionStatus = '', createdAt: orgCreatedAt = '' } = organizationSubscription || {}

    const mainInfo = {
        organizationName, email, phoneNumber, address, state, createdAt: new Date(createdAt).toDateString()
    };

    const subInfo = {
        bundleCode, subscriptionStatus, orgCreatedAt
    }
    
    // const isWaiverLoad = useStrictLoader( 'Get waiver requests', ActionEnums.GET_WAIVER_REQUESTS );

    // const waiverContent = [
    //     {title: 'Request Waiver', action: () => {setValueFunc!('createWaiver', true)}, font: 'fa fa-exclamation-triangle', isLoad: false }
    // ]

    const MainCTA = useCallback(() => {
        return(
            <div className='cta-section'>
                {/* <CTA content={waiverContent} /> */}
                <button onClick={() => setValueFunc!('updateOrg', true)}>Update</button>
                {/* <button className='delete' onClick={() => setValueFunc!('deleteOrg', true)}>Delete</button> */}
            </div>
        )
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const [ MoreDetailsComp ] = useMoreDetailsSection( MoreInformation, 
        { MainCTA : <MainCTA/>, onBClick : ()=> {setIsMoreOption!( false ); navigate(url.ORGANIZATION, {state: {pageName: pageName.ORGANIZATION}})},showBTL : true },
        { sectionHeader : 'Main Information', type : 'no-image', moreDetails : mainInfo },
        { sectionHeader : 'Subscription Information', type : 'no-image', moreDetails : subInfo },
    )

    return(
        <div>
            {
                loading ?
                <div style={{ textAlign:'center' }}>
                    <img src={Loader} alt="loading...."/>
                </div>
                :
                <div>
                    {MoreDetailsComp}
                    <div className='other-org-sections'>
                        <div className="section-heading">
                            <p>Applications</p>
                            <span>No of applications: {applications!?.length}</span>
                        </div>
                        <div className='applications'>
                            {
                                applications!?.map(app => {
                                    const { id = 0, applicationName = '', createdAt = '', description = '' } = app || {};
                                    return(
                                        <div key={id} >
                                            <AppCard id={id} title={applicationName} description={description} date={new Date(createdAt).toDateString()} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                
            }
            {/* {ModalComponent} */}
        </div>
    )
};

export default React.memo(OrgMD);