import { useMoreDetailsSection } from 'hooks/useMoreDetails';
import React, { FC, useCallback } from 'react';
import { MoreInformation } from 'utils/more-details';
import { useHistory } from 'react-router';
import Loader from 'extras/images/loader/loader.svg';
import { pageName, url } from 'enums/Route';
import { IApplication } from 'interfaces/IApplication';
import CopyToClipboard from 'utils/copyToClipboard';
import { SuperAdmin, OrgAdmin } from 'utils/roles';
import { useStrictLoader } from 'hooks/useStrictLoader';
import { ActionEnums } from 'enums/ActionEnums';
import { Button } from 'utils/button/re-btn';
import './index.scss';

interface IProps {
    data: IApplication;
    addAppsToSub: (data: Array<{ applicationId: number, organizationSubscriptionId: number }>) => void;
    orgSubId: number;
    setIsMoreOption?: React.Dispatch<React.SetStateAction<boolean>>;
    loading?: boolean;
    showBTL?: boolean;
    setValueFunc?: (a: string, b: boolean ) => void;
};

const AppMD:FC<IProps> =( props ) => {
    
    const { setIsMoreOption, setValueFunc, loading, data, addAppsToSub, orgSubId } = props;
    const history = useHistory();
    const { applicationName = '', description = '', environment = '', createdAt = '', clientId = '', clientSecret = '', id } = data || {};

    const mainInfo = {
        applicationName, description, environment, 'created at': new Date(createdAt).toDateString()
    };

    const apiKeys = {
        'clientId': <CopyToClipboard toCopy = {clientId} />,
        'clientSecret': <CopyToClipboard toCopy = {clientSecret} isSecret />
    }

    const handleAddAppsToSub = () => {
        addAppsToSub([{
            applicationId: id,
            organizationSubscriptionId: orgSubId
        }])
    };

    let isLoad = useStrictLoader('Add application to subscription', ActionEnums.ADD_APP_TO_SUB );

    const MainCTA = useCallback(() => {
        return(
            <div className='cta-section'>
                {/* <CTA content={waiverContent} /> */}
                <Button onClick={() => handleAddAppsToSub() } title='Add app to subscription' isLoad={isLoad && loading} />
                <Button onClick={() => setValueFunc!('deleteApp', true)} title='Delete' del />
            </div>
        )
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const [ MoreDetailsComp ] = useMoreDetailsSection( MoreInformation, 
        { MainCTA : <MainCTA/>, onBClick : ()=> {setIsMoreOption!( false ); history.push(url.APPLICATIONS, 
            {pageName: pageName.APPLICATIONS})},showBTL : true },

        { sectionHeader : 'Other Information', type : 'no-image', moreDetails : mainInfo },
        
        { sectionHeader : 'API Keys', type : 'no-image', moreDetails : SuperAdmin || OrgAdmin ? 
            apiKeys : {'noAccess': 'You don\'t have the access to view'} }
    )

    return(
        <div>
            {
                loading ?
                <div style={{ textAlign:'center' }}>
                    <img src={Loader} alt="loading...."/>
                </div>
                :
                <>
                    {MoreDetailsComp}
                </>
            }
        </div>
    )
};

export default React.memo(AppMD);