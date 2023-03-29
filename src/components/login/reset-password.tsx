import React, { useState, useEffect } from 'react';
import Navbar from 'components/landing/navbar';
import Footer from 'components/landing/footer';
import { url } from 'enums/Route';
import { connect } from 'react-redux'
import {  IAppState } from 'interfaces/IAppState'
import {  IAuth } from 'interfaces/IAuth'
import {  IHttp } from 'interfaces/IHttp'
import { passwordReset, verifyPasswordResetToken } from 'store/actions'
import { useButtonRequest } from 'hooks/useButtonRequest';
import { ActionEnums } from 'enums/ActionEnums'
import ErrorTxt from 'utils/form-validation'
import { useStrictLoader } from 'hooks/useStrictLoader';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from 'extras/images/loader/loader.svg';
import './index.scss';

interface IStateProps {
    auth : IAuth;
    http: IHttp;
}

interface IDispatchProps {
    passwordReset : ( formDetails : object ) => void;
    verifyPasswordResetToken : ( formDetails : object ) => void;
}

interface IProps extends IStateProps, IDispatchProps {}

const ResetPassword = (props: IProps) => {

    const { auth, http, passwordReset, verifyPasswordResetToken } = props;
    const { loading = false, action = '', verifyPasswordReset } = auth || {};
    const { isSuccessful = false } = verifyPasswordReset || {};
    const { email, token } = useParams<{ email: string, token: string }>();
    const initObj = { email, token, password : '', confirmPassword: '' }
    const [ formDetails, setFormDetails ] = useState<{[key : string] : any}>( initObj );
    const [ formError, setFormError ] = useState<{ [key : string] : string }>( );
    const navigate = useNavigate();

    let isVPLoad = useStrictLoader( action, ActionEnums.PASSWORD_RESET_TOKEN_VERIFICATION ) && loading;

    useEffect(()=>{
        verifyPasswordResetToken( { email, token } );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[email, token]);

    const handleOnChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        setFormError( {} );
        const { name = '', value = '' } = e.target
        switch(name){
            default : setFormDetails(p => ({ ...p, [ name ] : value })); break;
        } 
    };

    let isStatusLoad = useStrictLoader( action, ActionEnums.PASSWORD_RESET) && loading; 

    const [BTN] = 
    useButtonRequest({ http, loading : isStatusLoad , cTitle: 'Reset',update : false,
    formAction: passwordReset, adminAction: action, formState: formDetails, setFormState: setFormDetails, 
    createInitObj: initObj, actionEnums: {create: ActionEnums.PASSWORD_RESET}, otherValidations : true, 
    setFormError: setFormError
    });

    return(
        <div className="login-page">

            <Navbar />

            <div className='login-main'>

                <div className="main-card">

                    {
                        isVPLoad ?

                            <div style={{ textAlign:'center' }}>
                                <img src={Loader} alt="loading...."/>
                            </div>

                            :
                            isSuccessful ? 
                                <>
                                    <h2>Reset password?</h2>

                                    <div className="input-area">
                                        <p className="label">Enter password</p>
                                        <input type="password" name='password' onChange={handleOnChange} value={formDetails!?.password} />
                                        <ErrorTxt formError={ formError } value={'password'} />
                                    </div>

                                    <div className="input-area">
                                        <p className="label">Confirm password</p>
                                        <input type="password" name='confirmPassword' onChange={handleOnChange} value={formDetails!?.confirmPassword} />
                                        <ErrorTxt formError={ formError } value={'confirmPassword'} />
                                    </div>

                                    {BTN}

                                    <div className='back-to-login'>
                                        <a href={url.LOGIN}>Back to Login</a>
                                    </div>
                                </>

                                :

                                <div className='expired-token'>
                                    <h2>Oh my  :(</h2>
                                    <p>The token has expired.</p>
                                    <button onClick={() => navigate(url.FORGOT_PASSWORD)}>
                                        Request new token
                                    </button>
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
    passwordReset,
    verifyPasswordResetToken
}

export default connect(mapStateToProps, mapDispatchToProps) ( ResetPassword );