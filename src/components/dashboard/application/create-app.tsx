import React, { FC, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {  IAppState } from 'interfaces/IAppState';
import {  IAuth } from 'interfaces/IAuth';
import {  IHttp } from 'interfaces/IHttp';
import { createApplication, getAPIScopes } from 'store/actions';
import { useButtonRequest } from 'hooks/useButtonRequest';
import { ActionEnums } from 'enums/ActionEnums';
import ErrorTxt from 'utils/form-validation';
import { useStrictLoader } from 'hooks/useStrictLoader';
import { IAdmin } from 'interfaces/IAdmin';
import { IAPIScope } from 'interfaces/IApplication';
import { pageName, url } from 'enums/Route';
import DashboardWrapper from '../dashboardwrapper';
import Loader from 'extras/images/loader/loader.svg';
import TagPill from 'utils/tag';
import './index.scss';

interface IStateProps {
    auth : IAuth;
    admin: IAdmin;
    http: IHttp;
}

interface IDispatchProps {
    createApplication : ( data : object, update?: boolean ) => void;
    getAPIScopes: () => void;
}

interface IProps extends IStateProps, IDispatchProps{
    update?: boolean
}

const Application : FC<IProps> = ( props ) => {

    const { http, auth, admin, update, createApplication, getAPIScopes } = props;
    const { loading = false, action = '', loggedInDetails } = auth || {};
    const { user } = loggedInDetails || {};
    const {  email = '' } = user || {};
    const { apiScopes } = admin || {};

    let isStatusLoad = useStrictLoader( action, ActionEnums.CREATE_APPLICATION, ActionEnums.UPDATE_APPLICATION ) && loading;
    let isAPIScopeLoad = useStrictLoader( action, ActionEnums.GET_API_SCOPES ) && loading;

    const initObj = { email, ApplicationName : '', environment : '', organizationId: 1, description : '', allowedScopes : [''], clientName: '' }
    const updateInitObj = { applicationRoleAccess : '', ApplicationName : '', environment : '' }
    const [ formDetails, setFormDetails ] = useState<{[key : string] : any}>( initObj );
    const [ formError, setFormError ] = useState<{ [key : string] : string }>();

    const handleOnChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        setFormError( {} );
        const { name = '', value = '' } = e.target
        switch(name){
            default : setFormDetails(p => ({ ...p, [ name ] : value })); break;
        } 
    };

    const apiScopeConv = (scopes: Array<IAPIScope>) => scopes!?.map(s => s!?.name);
    const [ selectedScopes, setSelectedScopes ] = useState<Array<IAPIScope>>([]);

    
    const handleCheck = (id: number) => {
        let toBeChecked = selectedScopes!?.find( x => x!?.id === id)
        if(toBeChecked !== undefined && Object.keys(toBeChecked)!?.length > 0){
            setSelectedScopes(selectedScopes!?.filter(a => a!?.id !== id))
        } else {
            setSelectedScopes(prev => [...prev, apiScopes!?.filter(a => a!?.id === id)[0]])
        }
    };

    const [BTN] = 
    useButtonRequest({ http, loading : isStatusLoad , cTitle: 'Create', uTitle: 'Update', update : update,
    formAction: createApplication, adminAction: action, formState: formDetails, setFormState: setFormDetails, 
    createInitObj: update ? updateInitObj : initObj, actionEnums: {create : ActionEnums.CREATE_APPLICATION, update : ActionEnums.UPDATE_APPLICATION}, otherValidations : true, setFormError: setFormError, url: {url: url.APPLICATIONS, pageName: pageName.APPLICATIONS}
    });

    useEffect(() => {
        apiScopes!?.length === 0 && getAPIScopes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(()=>{
        if( update ){
            setFormDetails( updateInitObj )
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[update]);

    useEffect(() => {
        setFormDetails(prev => ({ ...prev,
            allowedScopes: apiScopeConv(selectedScopes),
            clientName: formDetails!?.description
        }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedScopes])

    return(
        <DashboardWrapper loading={false}>
            <div className='create-app'>

                <div className="create-main">
                    <h3>{update ? "Update Application" : "Create Application"}</h3>

                    <div className="input-area">
                        <p className="label">Application Name</p>
                        <input type="text" name='ApplicationName' onChange={handleOnChange} 
                            value={ formDetails!!?.ApplicationName || '' } />
                        <ErrorTxt formError={ formError } value={'ApplicationName'} />
                    </div>
                    
                    <div className="input-area">
                        <p className="label">Environment</p>
                        <input type="text" name='environment' placeholder='e.g. Development' onChange={handleOnChange} value={ formDetails!!?.environment || '' } />
                        <ErrorTxt formError={ formError } value={'environment'} />
                    </div>

                    {!update &&
                    <div className="input-area">
                        <p className="label">Description</p>
                        <textarea name='description' onChange={handleOnChange} value={ formDetails!?.description || '' } rows={3} />
                        <ErrorTxt formError={ formError } value={'description'} />
                    </div>}
                    
                    {!update &&
                        <div className="scopes">
                            <p className="label">Allowed Scopes</p>
                            <span>Choose what you want your application to access</span>
                            <div className='scope-select'>
                                {isAPIScopeLoad ? 
                                    <div style={{ textAlign:'center' }}>
                                        <img src={Loader} alt="loading...."/>
                                    </div>
                                    :
                                    apiScopes!?.map(aS => {
                                        const { displayName = '', description = '', id } = aS || {};
                                        let isInArray = selectedScopes!?.some( x => x!?.id === id)
                                        return(
                                            <div className={`select-scope ${isInArray && 'checked'}`} 
                                                onClick={() => handleCheck(id)} key={id} >
                                                <input type="checkbox" checked={isInArray} onChange={() => void(0)} />
                                                <b>{displayName}:</b>&nbsp;
                                                <p>{description}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className="scope-tags">
                                {
                                    selectedScopes!?.map(s => (
                                        <TagPill content={s!?.displayName} color={'#3b9786'} key={s!?.id}/>
                                    ))
                                }
                            </div>
                            <ErrorTxt formError={ formError } value={'allowedScopes'} />
                        </div>
                    }

                    {update &&
                    <div className="input-area">
                        <p className="label">Application Role Access</p>
                        <input type="text" name='applicationRoleAccess' onChange={handleOnChange} 
                            value={ formDetails!?.applicationRoleAccess || '' }/>
                        <ErrorTxt formError={ formError } value={'applicationRoleAccess'} />
                    </div>}

                    {BTN}
                </div>

            </div>
        </DashboardWrapper>

    )
}

const mapStateToProps = (state: IAppState): IStateProps => ({
    auth: state.auth,
    admin: state.admin,
    http : state.http
});

const mapDispatchToProps: IDispatchProps = {
    createApplication,
    getAPIScopes
}

export default connect(mapStateToProps, mapDispatchToProps) ( Application );