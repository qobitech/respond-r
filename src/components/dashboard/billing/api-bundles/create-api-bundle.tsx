import React, { FC, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {  IAppState } from 'interfaces/IAppState'
import {  IAuth } from 'interfaces/IAuth'
import {  IHttp } from 'interfaces/IHttp'
import { createAPIBundle } from 'store/actions'
import { useButtonRequest } from 'hooks/useButtonRequest';
import { ActionEnums } from 'enums/ActionEnums'
import ErrorTxt from 'utils/form-validation'
import { useStrictLoader } from 'hooks/useStrictLoader';
import { IAdmin } from 'interfaces/IAdmin';
import './index.scss';
import { IAPIBundle } from 'interfaces/IBilling'
import { pageName, url } from 'enums/Route'

interface IStateProps {
    auth : IAuth;
    admin: IAdmin;
    http: IHttp;
}

interface IDispatchProps {
    createAPIBundle : ( data : object, update?: boolean ) => void;
}

interface IProps extends IStateProps, IDispatchProps{
    update?: boolean,
    prevApiBundle?: IAPIBundle;
}

const CreateAPIBundle : FC<IProps> = ( props ) => {

    const { http, auth, update, createAPIBundle, prevApiBundle } = props;
    const { loading = false, action = '' } = auth || {};

    let isStatusLoad = useStrictLoader( action, ActionEnums.CREATE_API_BUNDLE, ActionEnums.UPDATE_API_BUNDLE ) && loading;

    const initObj = { code : '', description : '' }

    const updateInitObj = { code : '', description : '' }

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
    formAction: createAPIBundle, adminAction: action, formState: formDetails, setFormState: setFormDetails, 
    createInitObj: initObj, updateInitObj, actionEnums: {create : ActionEnums.CREATE_API_BUNDLE, update : ActionEnums.UPDATE_API_BUNDLE}, otherValidations : true, setFormError: setFormError, url: {url: url.API_BUNDLES, pageName: pageName.API_BUNDLES}
    });

    useEffect(()=>{
        if( update ){
            setFormDetails({
                code: prevApiBundle!?.code,
                description: prevApiBundle!?.description
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[update, prevApiBundle]);

    return(
        <div className='create-api-bundle'>

            <div className="create-main">
            
                <h3>{update ? "Update API Bundle" : "Create API Bundle"}</h3>

                <div className="input-area">
                    <p className="label">Code</p>
                    <input type="text" name='code' onChange={handleOnChange} value={ formDetails!?.code || '' } />
                    <ErrorTxt formError={ formError } value={'code'} />
                </div>
                
                <div className="input-area">
                    <p className="label">Description</p>
                    <textarea name='description' onChange={handleOnChange} value={ formDetails!?.description || '' } rows={3} />
                    <ErrorTxt formError={ formError } value={'description'} />
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
    createAPIBundle,
}

export default connect(mapStateToProps, mapDispatchToProps) ( CreateAPIBundle );