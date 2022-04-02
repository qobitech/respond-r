import React, { FC, useState } from 'react';
import { connect } from 'react-redux';
import {  IAppState } from 'interfaces/IAppState';
import {  IAuth } from 'interfaces/IAuth';
import {  IHttp } from 'interfaces/IHttp';
import { registerOrganization } from 'store/actions';
import { useButtonRequest } from 'hooks/useButtonRequest';
import { ActionEnums } from 'enums/ActionEnums';
import { useStrictLoader } from 'hooks/useStrictLoader';
import { States } from 'components/register/states';
import { validatePhoneNumber } from 'utils/helpers';
import { pageName, url } from 'enums/Route';
import { useInputReducer } from 'hooks/useInputReducer';
import './index.scss';

interface IStateProps {
    auth : IAuth;
    http: IHttp;
}

interface IDispatchProps {
    registerOrganization : ( data : object, update? : boolean ) => void;
}

interface IProps extends IStateProps, IDispatchProps{}

const UpdateOrg : FC<IProps> = ( props ) => {

    const { registerOrganization, http, auth } = props;
    const { loggedInDetails } = auth || {};
    const { user } = loggedInDetails || {};
    const { organizationName = '', state = '', phoneNumber = '', email = '' } = user || {};
    const { loading, action } = auth
    const stateOptions = States!?.map(s => s!?.name) 
    let isStatusLoad = useStrictLoader( action, ActionEnums.ORGANIZATION_REGISTRATION ) && loading;

    const [ inputState, setFormError, InputComponents ] = useInputReducer(
        {
            email:{label: 'Email', value: email, type: 'text'},
            address:{label: 'Address', value: '', type: 'text'},
            organizationName:{label: 'Organization Name', value: organizationName, type: 'text'},
            state:{label: 'State', value: state, type: 'autoinput', options: stateOptions},
            phoneNumber:{label: 'Phone Number', value: phoneNumber, type: 'text', placeholder:'e.g. +234123456789'},
        },
    );

    const [ otherValidations, setOtherValidations ] = useState(false);

    const onButtonClick = () => {
        validatePhoneNumber( 'phoneNumber', inputState["phoneNumber"].value, setFormError, setOtherValidations )
    };

    const [BTN] = 
    useButtonRequest({ http, loading : isStatusLoad , cTitle: 'Update Organization Information', update: false,
    formAction: registerOrganization, adminAction: action, formState: inputState, setFormState: () => void(0), 
    createInitObj: inputState, actionEnums: {create: ActionEnums.ORGANIZATION_REGISTRATION, 
    update: ActionEnums.UPDATE_ORGANIZATION}, otherValidations, 
    setFormError: setFormError, onButtonClick, url: {url: url.ORGANIZATION, pageName: pageName.ORGANIZATION}
    });

    return(
        <div className='create-org'>

            <div className="create-main">
            
                <h3>Update Organization Information</h3>

                {InputComponents}

                {BTN}
                
            </div>

        </div>
    )
}

const mapStateToProps = (state: IAppState): IStateProps => ({
    auth: state.auth,
    http : state.http
});

const mapDispatchToProps: IDispatchProps = {
    registerOrganization
}

export default connect(mapStateToProps, mapDispatchToProps) ( UpdateOrg );