import React, { FC, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {  IAppState } from 'interfaces/IAppState'
import {  IAuth } from 'interfaces/IAuth'
import {  IHttp } from 'interfaces/IHttp'
import { createAPIConfig, getAPIConfigGroups } from 'store/actions'
import { useButtonRequest } from 'hooks/useButtonRequest';
import { ActionEnums } from 'enums/ActionEnums'
import ErrorTxt from 'utils/form-validation'
import { useStrictLoader } from 'hooks/useStrictLoader';
import { IAdmin } from 'interfaces/IAdmin';
import './index.scss';
import { IAPIConfig } from 'interfaces/IBilling'
import { pageName, url } from 'enums/Route'
import AutoInput from 'utils/auto-complete'

interface IStateProps {
    auth : IAuth;
    admin: IAdmin;
    http: IHttp;
}

interface IDispatchProps {
    createAPIConfig : ( data : object, update? : boolean ) => void;
    getAPIConfigGroups : (PageNumber?: number, PageSize?: number, query?: string) => void;
}

interface IProps extends IStateProps, IDispatchProps{
    update?: boolean
    prevConfig?: IAPIConfig;
}

const CreateAPIConfig : FC<IProps> = ( props ) => {

    const { http, update, createAPIConfig, prevConfig, admin, getAPIConfigGroups } = props;
    const { loading = false, action = '', apiConfigGroups = [] } = admin || {};
    const configGroupList = apiConfigGroups!?.map(c => c!?.groupCode);

    let isStatusLoad = useStrictLoader( action, ActionEnums.CREATE_API_CONFIG, ActionEnums.UPDATE_API_CONFIG ) && loading;

    const initObj = { groupCode: '', billingCategoryCode : '', apiName : '', apiRoute: '', description: '', perCallRate: '', applyDiscountAfter: '', discount: '' }

    const updateInitObj = { groupCode: '', billingCategoryCode : '', apiName : '', apiRoute: '', description: '', perCallRate: 0, applyDiscountAfter: 0, discount: 0 }

    const [ formDetails, setFormDetails ] = useState<{[key : string] : any}>( initObj );
    const [ formError, setFormError ] = useState<{ [key : string] : string }>();

    const handleOnChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        setFormError( {} );
        const { name = '', value = '' } = e.target
        switch(name){
            default : setFormDetails(p => ({ ...p, [ name ] : value })); break;
        } 
    };

    const handleLIClick = (e: any ) => {
        const { innerText } = e.currentTarget;
        setFormDetails( prev => ( {...prev, groupCode : innerText } ) ); 
    };

    const [BTN] = 
    useButtonRequest({ http, loading : isStatusLoad , cTitle: 'Create', uTitle: 'Update', update : update, 
    url: {url: url.API_CONFIGS, pageName: pageName.API_CONFIGS}, formAction: createAPIConfig, adminAction: action, formState: formDetails, setFormState: setFormDetails, createInitObj: initObj, updateInitObj,
    actionEnums: {create : ActionEnums.CREATE_API_CONFIG, update : ActionEnums.UPDATE_API_CONFIG}, otherValidations : true, setFormError: setFormError
    });

    useEffect(()=>{
        if( update ){
            setFormDetails({
                groupCode: prevConfig!?.groupCode,
                billingCategoryCode: prevConfig!?.billingCategoryCode,
                apiName: prevConfig!?.apiName,
                apiRoute: prevConfig!?.apiRoute,
                description: prevConfig!?.description,
                perCallRate: prevConfig!?.perCallRate,
                applyDiscountAfter: prevConfig!?.applyDiscountAfter,
                discount: prevConfig!?.discount
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[update, prevConfig]);

    return(
        <div className='create-api-config'>

            <div className="create-main">
            
                <h3>{update ? "Update API Configuration" : "Create API Configuration"}</h3>

                <div className="input-area">
                    <p className="label">Billing Category Code</p>
                    <input type="text" name='billingCategoryCode' onChange={handleOnChange} 
                        value={ formDetails!?.billingCategoryCode || '' } />
                    <ErrorTxt formError={ formError } value={'billingCategoryCode'} />
                </div>
                
                <div className="input-area">
                    <p className="label">API Name</p>
                    <input type="text" name='apiName' onChange={handleOnChange} value={ formDetails!?.apiName || '' } />
                    <ErrorTxt formError={ formError } value={'apiName'} />
                </div>
                
                <div className="input-area">
                    <p className="label">API Route</p>
                    <input type="text" name='apiRoute' onChange={handleOnChange} value={ formDetails!?.apiRoute || '' } />
                    <ErrorTxt formError={ formError } value={'apiRoute'} />
                </div>
                
                <div className="input-area">
                    <p className="label">Description</p>
                    <textarea name='description' onChange={handleOnChange} value={ formDetails!?.description || '' } rows={3} />
                    <ErrorTxt formError={ formError } value={'description'} />
                </div>

                <div className="input-area">
                    <p className="label">Call Rate</p>
                    <input type="number" name='perCallRate' onChange={handleOnChange} value={ formDetails!?.perCallRate || '' } 
                        step={0.1} />
                    <ErrorTxt formError={ formError } value={'perCallRate'} />
                </div>
                
                <div className="input-area">
                    <p className="label">Apply Discount After</p>
                    <input type="number" name='applyDiscountAfter' onChange={handleOnChange} 
                        value={ formDetails!?.applyDiscountAfter || '' } step={1000} />
                    <ErrorTxt formError={ formError } value={'applyDiscountAfter'} />
                </div>
                
                <div className="input-area">
                    <p className="label">Discount</p>
                    <input type="number" name='discount' onChange={handleOnChange} value={ formDetails!?.discount || '' } 
                        step={1} />
                    <ErrorTxt formError={ formError } value={'discount'} />
                </div>

                <div className="input-area">
                    <p className="label">Group Code</p>
                    <AutoInput options={configGroupList} name='groupCode' onChange={handleOnChange} onLIClick={handleLIClick} 
                        update updateDefaultValue={formDetails!?.groupCode} refreshData={() => getAPIConfigGroups()}/>
                    <ErrorTxt formError={ formError } value={'groupCode'} />
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
    createAPIConfig,
    getAPIConfigGroups
}

export default connect(mapStateToProps, mapDispatchToProps) ( CreateAPIConfig );