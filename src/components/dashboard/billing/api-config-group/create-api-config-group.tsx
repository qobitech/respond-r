import React, { FC, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {  IAppState } from 'interfaces/IAppState'
import {  IAuth } from 'interfaces/IAuth'
import {  IHttp } from 'interfaces/IHttp'
import { createAPIConfigGroup } from 'store/actions'
import { useButtonRequest } from 'hooks/useButtonRequest';
import { ActionEnums } from 'enums/ActionEnums'
import ErrorTxt from 'utils/form-validation'
import { useStrictLoader } from 'hooks/useStrictLoader';
import { IAdmin } from 'interfaces/IAdmin';
import './index.scss';
import { IAPIConfigGroup } from 'interfaces/IBilling'
import { pageName, url } from 'enums/Route'

interface IStateProps {
    auth : IAuth;
    admin: IAdmin;
    http: IHttp;
}

interface IDispatchProps {
    createAPIConfigGroup : ( data : object, update?: boolean ) => void;
}

interface IProps extends IStateProps, IDispatchProps{
    update?: boolean
    prevConfigGroup?: IAPIConfigGroup;
}

const CreateConfigGroup : FC<IProps> = ( props ) => {

    const { http, update, createAPIConfigGroup, prevConfigGroup, admin } = props;
    const { loading = false, action = '' } = admin || {};

    let isStatusLoad = useStrictLoader( action, ActionEnums.CREATE_API_CONFIG_GROUP, ActionEnums.UPDATE_API_CONFIG_GROUP ) && loading;

    const initObj = { groupCode: '', groupDescription: '' }

    const updateInitObj = { groupCode: '', groupDescription: '' }

    const [ formDetails, setFormDetails ] = useState<{[key : string] : any}>( initObj );
    const [ formError, setFormError ] = useState<{ [key : string] : string }>();

    const handleOnChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        setFormError( {} );
        const { name = '', value = '' } = e.target
        switch(name){
            default : setFormDetails(p => ({ ...p, [ name ] : value })); break;
        } 
    };

    const [BTN] = 
    useButtonRequest({ http, loading : isStatusLoad , cTitle: 'Create', uTitle: 'Update', update : update, 
    url: {url: url.API_CONFIG_GROUPS, pageName: pageName.API_CONFIG_GROUPS}, formAction: createAPIConfigGroup, adminAction: action, formState: formDetails, setFormState: setFormDetails, createInitObj: initObj, updateInitObj,
    actionEnums: {create : ActionEnums.CREATE_API_CONFIG_GROUP, update : ActionEnums.UPDATE_API_CONFIG_GROUP}, otherValidations : true, setFormError: setFormError
    });

    useEffect(()=>{
        if( update ){
            setFormDetails({
                groupCode: prevConfigGroup!?.groupCode,
                groupDescription: prevConfigGroup!?.groupDescription
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[update, prevConfigGroup]);

    return(
        <div className='create-api-config-group'>

            <div className="create-main">
            
                <h3>{update ? "Update API Configuration Group" : "Create API Configuration Group"}</h3>

                <div className="input-area">
                    <p className="label">Group Code</p>
                    <input type="text" name='groupCode' onChange={handleOnChange} 
                        value={ formDetails!?.groupCode || '' } />
                    <ErrorTxt formError={ formError } value={'groupCode'} />
                </div>
                
                <div className="input-area">
                    <p className="label">Group Description</p>
                    <textarea name='groupDescription' onChange={handleOnChange} value={ formDetails!?.groupDescription || '' } />
                    <ErrorTxt formError={ formError } value={'groupDescription'} />
                </div>

                {BTN}
                
            </div>

        </div>
    )
}

const mapStateToProps = (state: IAppState): IStateProps => ({
    auth: state.auth,
    admin: state.admin,
    http : state.http
});

const mapDispatchToProps: IDispatchProps = {
    createAPIConfigGroup
}

export default connect(mapStateToProps, mapDispatchToProps) ( CreateConfigGroup );