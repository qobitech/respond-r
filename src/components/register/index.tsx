import React, { FC, useState, useEffect } from 'react';
import Navbar from 'components/landing/navbar';
import Footer from 'components/landing/footer';
import AutoInput from 'utils/auto-complete';
import { States } from './states';
import { connect } from 'react-redux'
import {  IAppState } from 'interfaces/IAppState'
import {  IAuth } from 'interfaces/IAuth'
import {  IHttp } from 'interfaces/IHttp'
import { registerOrganization,clearOrgAuth } from 'store/actions'
import { useButtonRequest } from 'hooks/useButtonRequest';
import { ActionEnums } from 'enums/ActionEnums'
import ErrorTxt from 'utils/form-validation'
import { useStrictLoader } from 'hooks/useStrictLoader';
import { validatePassword, validatePhoneNumber } from 'utils/helpers';
import { url } from 'enums/Route';
import { useHistory } from 'react-router-dom';
import './index.scss';
import PhoneInput from 'utils/phone-input';

interface IStateProps {
    auth : IAuth;
    http: IHttp;
}

interface IDispatchProps {
    registerOrganization : ( adminDetails : object ) => void;
    clearOrgAuth: () => void;
}

interface IProps extends IStateProps, IDispatchProps {}

const Register : FC<IProps> = ( props ) => {
 
    const { registerOrganization, http, auth, clearOrgAuth } = props
    const { loading = false, action = '', orgAuth } = auth || {};
    const { isSuccessful = false, responseMessage = '' } = orgAuth || {};
    const stateOptions = States!?.map(s => s!?.name) 
    let isStatusLoad = useStrictLoader( action, ActionEnums.ORGANIZATION_REGISTRATION ) && loading;
    const initObj = { email : '', userName : '', address : '', organizationName : '', state : '',
                      employeeId : '', phoneNumber : '', password : '', confirmPassword : '', role : 'OrganizationAdmin' }

    const [ formDetails, setFormDetails ] = useState<{[key : string] : any}>( initObj );
    const [ formError, setFormError ] = useState<{ [key : string] : string }>( )
    const [ otherErrors, setOtherErrors ] = useState<{ [key : string] : string }>();
    const [ otherValidations, setOtherValidations ] = useState(false);
    const history = useHistory();

    const handleOnChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        const { name = '', value = '' } = e.target;
        setFormError(p => ({ ...p, [name]: '' }));
        setOtherErrors(p => ({ ...p, [name]: '' }));
        switch(name){
            case 'phoneNumber' : setFormDetails(p => ({ ...p, [ name ] : value.replace(/-/g, '')  })); break;
            default : setFormDetails(p => ({ ...p, [ name ] : value })); break;
        } 
    };

    const handleLIClick = (e: any ) => {
        const { innerText } = e.currentTarget;
        setFormDetails( prev => ( {...prev, state : innerText } ) ); 
    };

    const onButtonClick = () => {
        validatePhoneNumber( 'phoneNumber', formDetails!?.phoneNumber, setOtherErrors, setOtherValidations )
        validatePassword(formDetails, setOtherErrors, setOtherValidations );
    };

    useEffect(() => {
        setFormDetails(p => ({
            ...p,
            userName: formDetails.email
        }))
    }, [formDetails.email])

    const [BTN] = 
    useButtonRequest({ http, loading : isStatusLoad , cTitle: 'Register',update : false,
    formAction: registerOrganization, adminAction: action, formState: formDetails, setFormState: setFormDetails, 
    createInitObj: initObj, actionEnums: {create: ActionEnums.ORGANIZATION_REGISTRATION}, otherValidations, 
    setFormError: setFormError, onButtonClick
    });

    return(
        <div className="register-page">
            <Navbar />
            <div className='register-main'>

                <div className="main-card">
                    {responseMessage!?.length === 0 ?
                        <>
                            <h3>Register your organization</h3>
                            {!loading && <p className='response-message'>{responseMessage}</p>}

                            <div className="input-area">
                                <p className="label">Email</p>
                                <input type="text" name='email' onChange={handleOnChange} value={ formDetails!?.email }
                                    className={formError!?.email!?.length > 0 ? 'error' : ''} />
                                <ErrorTxt formError={ formError } value={'email'} />
                            </div>

                            <div className="input-area">
                                <p className="label">Address</p>
                                <textarea name='address' rows={4} onChange={handleOnChange} value={ formDetails!?.address }
                                    className={formError!?.address!?.length > 0 ? 'error' : ''}/>
                                <ErrorTxt formError={ formError } value={'address'} />
                            </div>

                            <div className="input-area">
                                <p className="label">Organization Name</p>
                                <input type="text" name='organizationName' onChange={handleOnChange} value={ formDetails!?.organizationName } className={formError!?.organizationName!?.length > 0 ? 'error' : ''} />
                                <ErrorTxt formError={ formError } value={'organizationName'} />
                            </div>

                            <div className="input-area">
                                <p className="label">State</p>
                                <AutoInput options={stateOptions} name='state' onChange={handleOnChange} onLIClick={handleLIClick} 
                                    className={formError!?.state!?.length > 0 ? 'error' : ''}/>
                                <ErrorTxt formError={ formError } value={'state'} />
                            </div>

                            <div className="input-area">
                                <p className="label">Employee Id</p>
                                <input type="text" name='employeeId' onChange={handleOnChange} value={ formDetails!?.employeeId }
                                    className={formError!?.employeeId!?.length > 0 ? 'error' : ''}/>
                                <ErrorTxt formError={ formError } value={'employeeId'} />
                            </div>

                            <div className="input-area">
                                <p className="label">Phone Number</p>
                                <PhoneInput className={formError!?.phoneNumber!?.length > 0 ? 'error' : ''} 
                                    onChange={handleOnChange} name='phoneNumber'  placeholder='e.g. +234123456789' />
                                <ErrorTxt formError={ otherErrors } value={'phoneNumber'} />
                            </div>

                            <div className="input-area">
                                <p className="label">Password</p>
                                <input type="password" autoComplete='new-password' name='password' onChange={handleOnChange} value={formDetails!?.password} className={formError!?.password!?.length > 0 ? 'error' : ''}/>
                                <ErrorTxt formError={ otherErrors } value={'password'} />
                            </div>

                            <div className="input-area">
                                <p className="label">Confirm Password</p>
                                <input type="password" autoComplete='new-password' name='confirmPassword' onChange={handleOnChange} value={formDetails!?.confirmPassword} className={formError!?.confirmPassword!?.length > 0 ? 'error' : ''}
                                onBlur={()=>validatePassword(formDetails, setOtherErrors, setOtherValidations )} 
                                />
                                <ErrorTxt formError={ otherErrors } value={'confirmPassword'} />
                                {formDetails!?.password!?.length > 0 && formDetails!?.password === formDetails.confirmPassword &&
                                    <span style={{color: '#64FDE1', fontSize: '10px' }}>
                                        <i className='fa fa-thumbs-up' style={{marginRight: '10px'}}></i>Passwords match
                                    </span>
                                }
                            </div>

                            {BTN}
                        </>
                        :
                        isSuccessful ?                                
                            <div className='verify-success'>
                                <i className='fa fa-thumbs-up'></i>
                                <p>{responseMessage}</p>
                                <span>Check your email to confirm registration.</span>
                                <button onClick={() => {clearOrgAuth(); history.push(url.LOGIN)}}>Proceed to login</button>
                            </div>
                            :
                            <div className='verify-failure'>
                                <i className='fa fa-exclamation-triangle'></i>
                                <p>{responseMessage}</p>
                                <button onClick={() => {clearOrgAuth()}}>Try Again</button>
                            </div>
                    }
               
                </div>

            </div>
            <Footer />
        </div>
    )
};

const mapStateToProps = (state: IAppState): IStateProps => ({
    auth: state.auth,
    http : state.http
});

const mapDispatchToProps: IDispatchProps = {
    registerOrganization,
    clearOrgAuth
}

export default connect(mapStateToProps, mapDispatchToProps) ( Register );