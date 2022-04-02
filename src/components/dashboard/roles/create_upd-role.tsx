import React, { FC, useState, useEffect } from 'react';
import { connect } from 'react-redux'
import {  IAppState } from 'interfaces/IAppState'
import {  IAuth } from 'interfaces/IAuth'
import {  IHttp } from 'interfaces/IHttp'
import { createRole } from 'store/actions'
import { useButtonRequest } from 'hooks/useButtonRequest';
import { ActionEnums } from 'enums/ActionEnums'
import ErrorTxt from 'utils/form-validation'
import { useStrictLoader } from 'hooks/useStrictLoader';
import { IAdmin } from 'interfaces/IAdmin';
import { pageName, url } from 'enums/Route';
import { IRole } from 'interfaces/IRole';
import './index.scss';

interface IStateProps {
    auth : IAuth;
    admin: IAdmin;
    http: IHttp;
}

interface IDispatchProps {
    createRole : ( data : object, update?: boolean ) => void;
};

interface IUpdate {
    prevRole?: IRole;
    update?: boolean;
};

interface IProps extends IStateProps, IDispatchProps, IUpdate {};

const CreateUpdRole : FC<IProps> = ( props ) => {

    const  { auth, http, createRole, update, prevRole } = props;
    const { loading, action } = auth;
    const initObj = { roleName: '', roleDescription: '' };
    const updObj = { id: '', roleName: '', roleDescription: '' };

    const [ formDetails, setFormDetails ] = useState<{[key : string] : any}>( initObj );
    const [ formError, setFormError ] = useState<{ [key : string] : string }>( );

    const handleOnChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        setFormError( {} );
        const { name = '', value = '' } = e.target
        switch(name){
            default : setFormDetails(p => ({ ...p, [ name ] : value })); break;
        } 
    };

    let isRoleLoad = useStrictLoader( action, ActionEnums.CREATE_ROLE, ActionEnums.UPDATE_ROLE ) && loading;

    const [BTN] = 
    useButtonRequest({ http, loading : isRoleLoad , cTitle: 'Create Role', uTitle: 'Update Role', update : update, 
    formAction: createRole, adminAction: action, formState: formDetails, setFormState: setFormDetails,
    createInitObj: initObj, updateInitObj: updObj, actionEnums: {create: ActionEnums.CREATE_ROLE, update: ActionEnums.UPDATE_ROLE}, otherValidations: true, setFormError: setFormError, url: {url: url.ROLES, pageName: pageName.ROLES}
    });

    useEffect(() => {
        if(update){
            setFormDetails({
                id: prevRole!?.id,
                roleName: prevRole!?.name,
                roleDescription: prevRole!?.roleDescription,
            })
        }
    },[update, prevRole])

    return(
        <div className="create-role">
            <div className='create-main'>
                <h3>{update? 'Update Role' : 'Create Role'}</h3>
                
                <div className="input-area">
                    <p className="label">role name</p>
                    <input type="text" name='roleName' onChange={handleOnChange} value={formDetails!?.roleName || ''}
                        className={formError!?.roleName!?.length > 0 ? 'error' : ''} />
                    <ErrorTxt formError={ formError } value={'roleName'} />
                </div>

                <div className="input-area">
                    <p className="label">description</p>
                    <input type="text" name='roleDescription' onChange={handleOnChange} value={formDetails!?.roleDescription || ''}
                        className={formError!?.roleDescription!?.length > 0 ? 'error' : ''} />
                    <ErrorTxt formError={ formError } value={'roleDescription'} />
                </div>

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
    createRole,
}

export default connect(mapStateToProps, mapDispatchToProps) ( CreateUpdRole );