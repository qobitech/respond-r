import React, { FC, useEffect } from 'react';
import Navbar from 'components/landing/navbar';
import Footer from 'components/landing/footer';
import { url } from 'enums/Route';
import { connect } from 'react-redux';
import {  IAppState } from 'interfaces/IAppState';
import {  IAuth } from 'interfaces/IAuth';
import { verifyEmail } from 'store/actions';
import { ActionEnums } from 'enums/ActionEnums';
import { useStrictLoader } from 'hooks/useStrictLoader';
import { useParams, useHistory } from 'react-router-dom';
import Loader from 'extras/images/loader/loader.svg';
import './index.scss';

interface IStateProps {
    auth : IAuth;
}

interface IDispatchProps {
    verifyEmail : ( formDetails : object ) => void;
}

interface IProps extends IStateProps, IDispatchProps {}

const ResetPassword:FC<IProps> = ( props ) => {

    const { auth, verifyEmail } = props;
    const { loading = false, action = '', verifyEmail: vEmail } = auth || {};
    const { isSuccessful = false } = vEmail || {};
    const { email, token } = useParams<{ email: string, token: string }>();
    const history = useHistory();

    let isVELoad = useStrictLoader( action, ActionEnums.EMAIL_VERIFICATION ) && loading;

    useEffect(()=>{
        verifyEmail( { username: email, token } );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    useEffect(() => {
        if(isSuccessful){
            history.push(url.LOGIN)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccessful])

    return(
        <div className="verify-email">
            <Navbar />

                <div className="verify-main">
                    {
                        isVELoad ?
                        
                            <div style={{ textAlign:'center' }}>
                                <h1>Your email is being verified...</h1>
                                <img src={Loader} alt="loading...."/>
                            </div>

                            :

                            isSuccessful ? 
                                <div className='verify-success'>
                                    <i className='fa fa-thumbs-up'></i>
                                    <p>Your email has been verified</p>
                                    <span>Redirecting to login page...</span>
                                </div>
                                :
                                <div className='verify-failure'>
                                    <i className='fa fa-exclamation-triangle'></i>
                                    <p>Email Verification failed</p>
                                    <button onClick={() => history.push(url.LOGIN)}>Back to login</button>
                                </div>
                    }
                </div>

            <Footer />
        </div>
    )
};

const mapStateToProps = (state: IAppState): IStateProps => ({
    auth: state.auth,
});

const mapDispatchToProps: IDispatchProps = {
    verifyEmail
}

export default connect(mapStateToProps, mapDispatchToProps) ( ResetPassword );