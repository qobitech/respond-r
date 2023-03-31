import React, { useState } from 'react';
import { url } from 'enums/Route';
import { connect } from 'react-redux'
import {  IAppState } from 'interfaces/IAppState'
import {  IAuth } from 'interfaces/IAuth'
import {  IHttp } from 'interfaces/IHttp'
import { requestPasswordToken, clearPasswordReset } from 'store/actions'
import { useButtonRequest } from 'hooks/useButtonRequest';
import { ActionEnums } from 'enums/ActionEnums'
import ErrorTxt from 'utils/form-validation'
import { useStrictLoader } from 'hooks/useStrictLoader';
import { useNavigate } from 'react-router';
import './index.scss';
import Page from 'components/reusable/page';

interface IStateProps {
    auth : IAuth;
    http: IHttp;
}

interface IDispatchProps {
    requestPasswordToken : ( email : object ) => void;
    clearPasswordReset : () => void;
}

interface IProps extends IStateProps, IDispatchProps {}

const ForgotPassword= ( props: IProps ) => {

    const { auth, http, requestPasswordToken, clearPasswordReset } = props
    const { loading = false, action = '', passwordReset } = auth;
    const { passwordResetLink = '' } = passwordReset;
    const navigate = useNavigate();
    const initObj = { email : '' }
    const [ formDetails, setFormDetails ] = useState<{[key : string] : any}>( initObj );
    const [ formError, setFormError ] = useState<{ [key : string] : string }>( )

    const handleOnChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        setFormError( {} );
        const { name = '', value = '' } = e.target
        switch(name){
            default : setFormDetails(p => ({ ...p, [ name ] : value })); break;
        } 
    };

    let isPRTLoad = useStrictLoader( action, ActionEnums.PASSWORD_RESET_TOKEN_VERIFICATION ) && loading;

    const [BTN] = 
    useButtonRequest({ http, loading : isPRTLoad , cTitle: 'Request Token', update : false,
    formAction: requestPasswordToken, adminAction: action, formState: formDetails, setFormState: setFormDetails, 
    createInitObj: initObj, actionEnums: {create: ActionEnums.PASSWORD_TOKEN_REQUEST}, otherValidations : true, 
    setFormError: setFormError,
    });

    return(
        <Page>
            <div className="login-page">
                <div className='login-main'>
                    <div className="main-card">
                        <h2>Forgot your password?</h2>

                        <p className='forgot-message'>Please enter the email address you'd like your password reset information sent to.</p>
                        
                        <div className="input-area">
                            <p className="label">Enter email address</p>
                            <input type="text" name='email' onChange={handleOnChange} value={formDetails!?.email} />
                            <ErrorTxt formError={ formError } value={'email'} />
                        </div>

                        {passwordResetLink!?.length > 0 ?
                            <div className='verify-success'>
                                <i className='fa fa-thumbs-up'></i>
                                <p>Password reset request successful</p>
                                <span>Proceed to your email to reset</span>
                            </div>
                            :
                            BTN
                        }

                        <div className='back-to-login'>
                            <p onClick={() => {navigate(url.LOGIN); clearPasswordReset()}}>Back to Login</p>
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    )
};

const mapStateToProps = (state: IAppState): IStateProps => ({
    auth: state.auth,
    http : state.http
});

const mapDispatchToProps: IDispatchProps = {
    requestPasswordToken,
    clearPasswordReset
}

export default connect(mapStateToProps, mapDispatchToProps) ( ForgotPassword );