import React, { useState } from 'react';
import './index.scss';
import Navbar from 'components/landing/navbar';
import Footer from 'components/landing/footer';
import { useNavigate } from 'react-router-dom';
import { url } from 'enums/Route';
import { connect } from 'react-redux'
import {  IAppState } from 'interfaces/IAppState'
import {  IAuth } from 'interfaces/IAuth'
import {  IHttp } from 'interfaces/IHttp'
import { userLogin } from 'store/actions'
import { useButtonRequest } from 'hooks/useButtonRequest';
import { ActionEnums } from 'enums/ActionEnums'
import ErrorTxt from 'utils/form-validation'
import { useStrictLoader } from 'hooks/useStrictLoader';

interface IStateProps {
    auth : IAuth;
    http: IHttp;
}

interface IDispatchProps {
    userLogin : ( formDetails : object ) => void;
}

interface IProps extends IStateProps, IDispatchProps {}

const Login = ( props: IProps ) => {

    const  { auth, http, userLogin } = props;
    const { loading = false, action = '', loggedInDetails } = auth || {};
    const { responseMessage = '' } = loggedInDetails || {};

    const initObj = { username : '', password : '', rememberMe: false }

    const [ formDetails, setFormDetails ] = useState<{[key : string] : any}>( initObj );
    const [ formError, setFormError ] = useState<{ [key : string] : string }>( )
    
    const navigate = useNavigate();

    const loginOnEnter = ( e: React.KeyboardEvent ) => {
		if (e.key ===  'Enter') {
		  	e.preventDefault();
		  	e.stopPropagation();
              userLogin(formDetails)
		}
	};

    const handleOnChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        const { name = '', value = '' } = e.target;
        setFormError(p => ({ ...p, [name]: '' }));
        switch(name){
            default : setFormDetails(p => ({ ...p, [ name ] : value })); break;
        } 
    };

    let isStatusLoad = useStrictLoader( action, ActionEnums.LOGIN ) && loading;

    const [BTN] = 
    useButtonRequest({ http, loading : isStatusLoad , cTitle: 'Login',update : false,
    formAction: userLogin, adminAction: action, formState: formDetails, setFormState: setFormDetails, 
    createInitObj: initObj, actionEnums: {create: ActionEnums.LOGIN}, otherValidations : true, 
    setFormError: setFormError
    });

    return(
        <div className="login-page">
            <Navbar />
            <div className='login-main'>
                <div className="main-card" onKeyPress={(e) => loginOnEnter(e)} >
                    <h3>Central Database Login</h3>
                    {!loading && <p className='response-message'>{responseMessage}</p>}
                    <div className="input-area">
                        <p className="label">email</p>
                        <input type="text" name='username' onChange={handleOnChange} value={formDetails!?.username}
                            className={formError!?.username!?.length > 0 ? 'error' : ''} />
                        <ErrorTxt formError={ formError } value={'username'} />
                    </div>
                    <div className="input-area">
                        <p className="label">Password</p>
                        <input type="password" onChange={handleOnChange} value={formDetails!?.password} name='password'
                            className={formError!?.password!?.length > 0 ? 'error' : ''} />
                        <ErrorTxt formError={ formError } value={'password'} />
                        <div className="form-actions">
                            {/* <div className='keep'>
                                <input type="checkbox" />
                                <p className='keep'>Keep me logged in</p>
                            </div> */}
                            <p className='forgot' onClick={() => navigate(url.FORGOT_PASSWORD)}>Forgot Password?</p>
                        </div>
                    </div>
                    {BTN}
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
    userLogin
}

export default connect(mapStateToProps, mapDispatchToProps) ( Login );