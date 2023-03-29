import React, { useState } from 'react';
import { connect } from "react-redux";
import { IAppState } from "interfaces/IAppState";
import { updatePassword } from "store/actions";
import { useStrictLoader } from 'hooks/useStrictLoader';
import { useButtonRequest } from 'hooks/useButtonRequest';
import { ActionEnums } from 'enums/ActionEnums';
import { IHttp } from 'interfaces/IHttp';
import ErrorTxt from 'utils/form-validation';
import { IAuth } from 'interfaces/IAuth';
import { pageName, url } from 'enums/Route';

interface IStateProps {
    auth: IAuth;
    http: IHttp;
};

interface IDispatchProps {
    updatePassword: (formDetails: object) => void;
}

interface IProps extends IStateProps, IDispatchProps { };

const ChangePassword = (props: IProps) => {
    const { http, auth, updatePassword } = props;
    const { loading, action } = auth
    const initObj = { currentPassword: '', newPassword: '', confirmPassword: '' }
    const [ formDetails, setFormDetails ] = useState<{[key : string] : any}>( initObj );
    const [ formError, setFormError ] = useState<{ [key : string] : string }>( );
    const [ otherValidations, setOtherValidations ] = useState(false);
    const [ validation, setValidation ] = useState('');

    const handleOnChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        setFormError( {} );
        const { name = '', value = '' } = e.target
        switch(name){
            default : setFormDetails(p => ({ ...p, [ name ] : value })); break;
        } 
    };

    let isLoad = useStrictLoader( action, ActionEnums.PASSWORD_UPDATE ) && loading;

    const checkNewPasswords = () => {
        if(formDetails!?.newPassword !== formDetails.confirmPassword) {
            setValidation('Check new password')
            setOtherValidations(false)
        }
        else{
            setValidation('')
            setOtherValidations(true)
        }
    }

    const [BTN] = 
    useButtonRequest({ http, loading : isLoad , cTitle: 'Update Password',update : false, 
    formAction: updatePassword, adminAction: action, formState: formDetails, setFormState: setFormDetails, 
    createInitObj: initObj, actionEnums: {create: ActionEnums.ORGANIZATION_REGISTRATION}, otherValidations, 
    setFormError: setFormError, url: {url: url.PROFILE, pageName: pageName.PROFILE}
    });

    return (
        <div className='change-password'>

            <div className="create-main">
            
                <h3>Update Password</h3>

                <div className="input-area">
                    <p className="label">Current Password</p>
                    <input type="password" name='currentPassword' onChange={handleOnChange} value={ formDetails!?.currentPassword }
                        autoComplete='new-password' />
                    <ErrorTxt formError={ formError } value={'currentPassword'} />
                </div>

                <div className="input-area">
                    <p className="label">New Password</p>
                    <input type="password" name='newPassword' onChange={handleOnChange} value={ formDetails!?.newPassword }         autoComplete='new-password' />
                    <ErrorTxt formError={ formError } value={'newPassword'} />
                </div>

                { formDetails!?.newPassword!?.length > 0 &&
                    <div className="input-area">
                        <p className="label">Confirm New Password</p>
                        <input type="password" name='confirmPassword' onChange={handleOnChange} value={ formDetails!?.confirmPassword } autoComplete='new-password' onBlur={() => checkNewPasswords() } />
                        <ErrorTxt formError={ formError } value={'confirmPassword'} />
                        {formDetails!?.newPassword !== formDetails.confirmPassword ? 
                            <span className='error'>{validation}</span>
                            :
                            <span style={{color: '#64FDE1', fontSize: '10px' }}>
                                <i className='fa fa-thumbs-up' style={{marginRight: '10px'}}></i>Passwords match
                            </span>
                        }
                    </div>
                }
                
                {BTN}
            </div>
        </div>
    )
}

const mapStateToProps = (state: IAppState): IStateProps => ({
    auth: state.auth,
    http: state.http
});

const mapDispatchToProps: IDispatchProps = {
    updatePassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);