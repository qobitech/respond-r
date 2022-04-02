import React, { FC, useState, useEffect } from 'react';
import './index.scss';
import { connect } from 'react-redux'
import {  IAppState } from 'interfaces/IAppState'
import {  IAuth } from 'interfaces/IAuth'
import {  IHttp } from 'interfaces/IHttp'
import { createUser, getAllRoles } from 'store/actions'
import { useButtonRequest } from 'hooks/useButtonRequest';
import { ActionEnums } from 'enums/ActionEnums'
import ErrorTxt from 'utils/form-validation'
import { useStrictLoader } from 'hooks/useStrictLoader';
import { validatePassword, validatePhoneNumber } from 'utils/helpers';
import AutoInput from 'utils/auto-complete';
import { States } from 'components/register/states';
import { IAdmin, IUser } from 'interfaces/IAdmin';
import PhoneInput from 'utils/phone-input';
import { pageName, url } from 'enums/Route';
import InputTag from 'utils/input-tag';
import { IRole } from 'interfaces/IRole';
import { SuperAdmin } from 'utils/roles';

interface IStateProps {
    auth : IAuth;
    admin: IAdmin;
    http: IHttp;
}

interface IDispatchProps {
    createUser : ( data : object, update?: boolean ) => void;
    getAllRoles : () => void;
};

interface IUpdate {
    prevUser?: IUser;
    update?: boolean;
};

interface IProps extends IStateProps, IDispatchProps, IUpdate {
    organizationId?: number;
};

const CreateUpdUser : FC<IProps> = ( props ) => {

    const  { auth, admin, http, createUser, update, prevUser, getAllRoles } = props;
    const { roles } = admin || {};
    const { loading, action, loggedInDetails } = auth || {};

    const stateOptions = States!?.map(s => s!?.name); 

    const initObj =
    { firstName : '', middleName : '', lastName: '', email: '', phoneNumber: '', state: '',
        employeeId: '', password: '', confirmPassword: '', organizationId: 1, userName: '',
        organizationName: loggedInDetails!?.user!?.organizationName, roles: []
    };

    const updObj = 
    { id: '', firstName : '', middleName : '', lastName: '', email: '', phoneNumber: '', state: '',
        employeeId: '', organizationId: 1, organizationName: loggedInDetails!?.user!?.organizationName, roles: []
    };

    const [ formDetails, setFormDetails ] = useState<{[key : string] : any}>( initObj );
    const [ formError, setFormError ] = useState<{ [key : string] : string }>( );
    const [ otherErrors, setOtherErrors ] = useState<{ [key : string] : string }>();
    const [ otherValidations, setOtherValidations ] = useState(false);

    const handleOnChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        setFormError( {} );
        const { name = '', value = '' } = e.target
        switch(name){
            case 'phoneNumber': setFormDetails(p => ({ ...p, [ name ] : value.replace(/-/g, '') })); break;
            default : setFormDetails(p => ({ ...p, [ name ] : value })); break;
        } 
    };

    const handleLIClick = (e: any, name: string) => {
        const { innerText } = e.currentTarget;
        switch( name ) {
            case 'state' :  setFormDetails( prev => ( {...prev, state : innerText } ) ); break;
            case 'role' :  setFormDetails( prev => ( {...prev, role : innerText } ) ); break;
        };
    };

    interface ITag {
        id: number;
        value: string;
    }

    const apiScopeConv = (scopes: Array<IRole>) =>
        scopes!?.map((s) => ({
            id: parseInt(s!?.id),
            value: s!?.normalizedName
        } as ITag));

    const [ selectedTags, setSelectedTags ] = useState<Array<ITag>>([]);
    const selectedValues = selectedTags!?.map(s => s!?.value);
    const allowedScopes = apiScopeConv(roles);
    const options = allowedScopes!?.map(aS => aS!?.value);
    const realOptions = options!?.filter(o => !SuperAdmin && o.toLowerCase() !== 'admin').filter(o => !selectedValues!?.includes(o))

    const handleITClick = (e: any ) => {
        const { innerText } = e.currentTarget;
        const newTag = allowedScopes!?.filter(a => a!?.value === innerText)[0]
        setSelectedTags( prev => [...prev, newTag ] ); 
    };
    const onButtonClick = () => {
        validatePhoneNumber( 'phoneNumber', formDetails!?.phoneNumber, setOtherErrors, setOtherValidations )
        validatePassword(formDetails, setOtherErrors, setOtherValidations );
    };

    let isStatusLoad = useStrictLoader( action, ActionEnums.CREATE_USER, ActionEnums.UPDATE_USER ) && loading;
    let isRoleLoad = useStrictLoader( action, ActionEnums.GET_ALL_ROLES ) && loading;

    const [BTN] = 
    useButtonRequest({ http, loading : isStatusLoad , cTitle: 'Create User', uTitle: 'Update User', update : update, 
    formAction: createUser, adminAction: action, formState: formDetails, setFormState: setFormDetails,
    createInitObj: initObj, updateInitObj: updObj, actionEnums: {create: ActionEnums.CREATE_USER, update: ActionEnums.UPDATE_USER}, otherValidations, setFormError: setFormError, onButtonClick, url: {url: url.USERS, pageName: pageName.USERS}
    });

    useEffect(() => {
        setFormDetails(prev => ({ ...prev,
            roles: selectedTags!?.map(s => s!?.value)
        }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedTags]);

    useEffect(() => {
        setFormDetails(p => ({ ...p,
            userName: formDetails.email
        }))
    }, [formDetails.email])

    useEffect(() => {
        if(update){
            setFormDetails({
                id: prevUser!?.id,
                firstName: prevUser!?.firstName,
                middleName: prevUser!?.middleName,
                lastName: prevUser!?.lastName,
                email: prevUser!?.email,
                phoneNumber: prevUser!?.phoneNumber,
                state: prevUser!?.state,
                employeeId: prevUser!?.employeeId,
                organizationName: prevUser!?.organizationName,
                organizationId: prevUser!?.organizationId,
                roles: selectedTags!?.map(s => s!?.value)
            })
        }
    },[update, prevUser, selectedTags])

    return(
        <div className="create-user">
            <div className='create-main'>
                <h3>{update? 'Update User' : 'Create User'}</h3>
                <div className="input-area">
                    <p className="label">firstName</p>
                    <input type="text" name='firstName' onChange={handleOnChange} value={formDetails!?.firstName || ''}
                        className={formError!?.firstName!?.length > 0 ? 'error' : ''} />
                    <ErrorTxt formError={ formError } value={'firstName'} />
                </div>

                <div className="input-area">
                    <p className="label">middleName</p>
                    <input type="text" name='middleName' onChange={handleOnChange} value={formDetails!?.middleName || ''}
                        className={formError!?.middleName!?.length > 0 ? 'error' : ''} />
                    <ErrorTxt formError={ formError } value={'middleName'} />
                </div>

                <div className="input-area">
                    <p className="label">lastName</p>
                    <input type="text" name='lastName' onChange={handleOnChange} value={formDetails!?.lastName || ''}
                        className={formError!?.lastName!?.length > 0 ? 'error' : ''} />
                    <ErrorTxt formError={ formError } value={'lastName'} />
                </div>

                <div className="input-area">
                    <p className="label">email</p>
                    <input type="text" name='email' onChange={handleOnChange} value={formDetails!?.email || ''}
                        className={formError!?.email!?.length > 0 ? 'error' : ''} />
                    <ErrorTxt formError={ formError } value={'email'} />
                </div>

                <div className="input-area">
                    <p className="label">Phone Number</p>
                    <PhoneInput className={formError!?.phoneNumber!?.length > 0 ? 'error' : ''} 
                        defaultValue={update && prevUser!?.phoneNumber} placeholder='e.g. +234123456789' 
                        onChange={handleOnChange} name='phoneNumber' update={update}
                        onBlur={()=>validatePhoneNumber( 'phoneNumber', formDetails!?.phoneNumber, setOtherErrors, setOtherValidations )}
                    />
                    <ErrorTxt formError={ otherErrors } value={'phoneNumber'}  />
                </div>

                <div className="input-area">
                    <p className="label">State</p>
                    <AutoInput options={stateOptions} name='state' onChange={handleOnChange} 
                        onLIClick={(e) => handleLIClick(e, 'state')} defaultValue={update && prevUser!?.state} />
                    <ErrorTxt formError={ formError } value={'state'} />
                </div>

                <div className="input-area">
                    <p className="label">employeeId</p>
                    <input type="text" name='employeeId' onChange={handleOnChange} value={formDetails!?.employeeId || ''}
                        className={formError!?.employeeId!?.length > 0 ? 'error' : ''} />
                    <ErrorTxt formError={ formError } value={'employeeId'} />
                </div>

                <div className="input-area">
                    <p className="label">Roles</p>
                    <InputTag options={realOptions} selectedTags={selectedTags} onLIClick={handleITClick} name='roles' 
                        onChange={() => void(0)} allowedScopes={allowedScopes} setSelectedTags={setSelectedTags} 
                        refreshData={() => getAllRoles()} isLoad={isRoleLoad} update={update} updateDefaultValues={prevUser!?.roles}
                    />
                    <ErrorTxt formError={ formError } value={'roles'} />
                </div>

                {!update && <div className="input-area">
                    <p className="label">Password</p>
                    <input type="password" onChange={handleOnChange} value={formDetails!?.password || ''} name='password'
                        className={formError!?.password!?.length > 0 ? 'error' : ''} 
                    />
                    <ErrorTxt formError={ otherErrors } value={'password'} />
                </div>}

                {!update && <div className="input-area">
                    <p className="label">Confirm password</p>
                    <input type="password" onChange={handleOnChange} value={formDetails!?.confirmPassword || ''} 
                        name='confirmPassword' className={formError!?.confirmPassword!?.length > 0 ? 'error' : ''} 
                        onBlur={()=>validatePassword(formDetails, setOtherErrors, setOtherValidations )} 
                    />
                    {formDetails!?.password!?.length > 0 && formDetails!?.password === formDetails.confirmPassword ?
                        <span style={{color: '#64FDE1', fontSize: '10px' }}>
                            <i className='fa fa-thumbs-up' style={{marginRight: '10px'}}></i>Passwords match
                        </span>
                        :
                        <ErrorTxt formError={ otherErrors } value={'confirmPassword'} />
                    }
                </div>}

                {BTN}
            </div>
        </div>
    )
};

const mapStateToProps = (state: IAppState): IStateProps => ({
    auth: state.auth,
    admin: state.admin,
    http : state.http
});

const mapDispatchToProps: IDispatchProps = {
    createUser,
    getAllRoles
}

export default connect(mapStateToProps, mapDispatchToProps) ( CreateUpdUser );