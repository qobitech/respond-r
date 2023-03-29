import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import {  IAppState } from 'interfaces/IAppState'
import {  IAuth } from 'interfaces/IAuth'
import {  IHttp } from 'interfaces/IHttp'
import { createUser, getAllRoles } from 'store/actions'
import { useButtonRequest } from 'hooks/useButtonRequest';
import { ActionEnums } from 'enums/ActionEnums'
import ErrorTxt from 'utils/form-validation'
import { useStrictLoader } from 'hooks/useStrictLoader';
import AutoInput from 'utils/auto-complete';
import { IAdmin } from 'interfaces/IAdmin';
import { pageName, url } from 'enums/Route';
import { IPermission } from 'interfaces/IRole';
import './index.scss';

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
    prevPermission?: IPermission;
    update?: boolean;
};

interface IProps extends IStateProps, IDispatchProps, IUpdate {};

const CreateUpdPermission= (props: IProps) => {

    const  { auth, admin, http, createUser, update, prevPermission } = props;
    const { loading, action } = auth;
    const roleOptions = admin!?.roles!?.map(r => r!?.normalizedName);
    const initObj = { permission: '', description: '', permissionGroup: 0 };
    const updObj = { permission: '', description: '', permissionGroup: 0 };

    const [ formDetails, setFormDetails ] = useState<{[key : string] : any}>( initObj );
    const [ formError, setFormError ] = useState<{ [key : string] : string }>( );

    const handleOnChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        setFormError( {} );
        const { name = '', value = '' } = e.target
        switch(name){
            default : setFormDetails(p => ({ ...p, [ name ] : value })); break;
        } 
    };

    const handleLIClick = (e: any, name: string) => {
        const { innerText } = e.currentTarget;
        switch( name ) {
            case 'permissionGroup' :  setFormDetails( prev => ( {...prev, permissionGroup : innerText } ) ); break;
        };
    };

    let isPermLoad = useStrictLoader( action, ActionEnums.CREATE_PERMISSION ) && loading;

    const [BTN] = 
    useButtonRequest({ http, loading : isPermLoad , cTitle: 'Create Permission', uTitle: 'Update Permission', update : update, 
    formAction: createUser, adminAction: action, formState: formDetails, setFormState: setFormDetails,
    createInitObj: initObj, updateInitObj: updObj, actionEnums: {create: ActionEnums.CREATE_PERMISSION, update: ActionEnums.UPDATE_PERMISSION}, otherValidations: true, setFormError: setFormError, url: {url: url.PERMISSIONS, pageName: pageName.PERMISSIONS}
    });

    useEffect(() => {
        if(update){
            setFormDetails({
                permission: prevPermission!?.permission,
                description: prevPermission!?.description,
                permissionGroup: prevPermission!?.permissionGroup
            })
        }
    },[update, prevPermission])

    return(
        <div className="create-permission">
            <div className='create-main'>
                <h3>{update? 'Update Permission' : 'Create Permission'}</h3>
                
                <div className="input-area">
                    <p className="label">permission</p>
                    <input type="text" name='permission' onChange={handleOnChange} value={formDetails!?.permission || ''}
                        className={formError!?.permission!?.length > 0 ? 'error' : ''} />
                    <ErrorTxt formError={ formError } value={'permission'} />
                </div>

                <div className="input-area">
                    <p className="label">description</p>
                    <input type="text" name='description' onChange={handleOnChange} value={formDetails!?.description || ''}
                        className={formError!?.description!?.length > 0 ? 'error' : ''} />
                    <ErrorTxt formError={ formError } value={'description'} />
                </div>

                <div className="input-area">
                    <p className="label">permission group</p>
                    <AutoInput options={roleOptions} name='permissionGroup' onChange={handleOnChange} 
                        onLIClick={(e) => handleLIClick(e, 'permissionGroup')} defaultValue={update && prevPermission!?.permissionGroup} />
                    <ErrorTxt formError={ formError } value={'permissionGroup'} />
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
    createUser,
    getAllRoles
}

export default connect(mapStateToProps, mapDispatchToProps) ( CreateUpdPermission );