import React, { useEffect } from 'react';
import { IHttp } from 'interfaces/IHttp';
import { ButtonRequest } from 'utils/button';
import { validateFormValues } from 'utils/form-validation';
import { useNavigate } from 'react-router-dom';

interface IProps {
    formState: {[key: string]: any};
    setFormState:  React.Dispatch<React.SetStateAction<{[key: string]: any}>>;
    http: IHttp;
    loading: boolean;
    cTitle: string | JSX.Element;
    update: boolean | undefined;
    actionEnums: { create: string, update?: string };
    otherValidations: boolean;
    setFormError: any;
    createInitObj: object;
    url?: {url: string, pageName: string};
    uTitle?: string;
    formAction?: ( data: any, update?: boolean ) => void;
    mediaAction?: ( data: FormData ) => void;
    adminAction: string;
    mediaState?: FormData;
    isMedia?: boolean;
    updateInitObj?: object;
    requiredInitObj?: object;
    onButtonClick?: () => void;
    onSuccess?: () => void;
    required?: boolean;
    requiredState?: {[key: string]: any};
}

export const useButtonRequest = ( props: IProps ) => {
    
    const { http, loading = false, cTitle, uTitle, update, formAction, formState, setFormState, mediaState, createInitObj, updateInitObj, onButtonClick, actionEnums, adminAction, otherValidations, setFormError, isMedia, mediaAction, onSuccess, required, requiredState, requiredInitObj, url } = props;
    const navigate = useNavigate();

    const isSuccess = ( ) => {
        return (update ? actionEnums.update : actionEnums.create ) === adminAction && http.httpStatus === 200
    };

    useEffect(()=>{
        if( (update ? actionEnums.update : actionEnums.create ) === adminAction && http.httpStatus === 200 ){
            typeof onSuccess === "function" ? onSuccess() : void(0)
            if(!update){
                setFormState( createInitObj )
            }
            navigate(url!?.url, {state: {pageName: url!?.pageName}})
            // history.go(0)
        }
    // eslint-disable-next-line
    },[http.httpStatus]);

    const handleOnSubmit = ( ) => {
        typeof onButtonClick !== 'function' ? void(0) : onButtonClick();
        validateFormValues( required ? requiredState! : formState, required ? requiredInitObj! :createInitObj!, setFormError )
        .then(( isValidated )=>{        
            if( isValidated ) {
                if( otherValidations ){
                    if(isMedia){
                        typeof mediaAction === "function" ? mediaAction( mediaState! ) : void(0)
                    }else{
                        typeof formAction === "function" ? formAction( formState ) : void(0)
                    }
                }
            }else{
                console.log(formState)
            }
        })
    }
    
    const handleOnUpdate = async ( ) => {
        typeof onButtonClick === 'function' ? onButtonClick!() : void(0);
        validateFormValues( required ? requiredState! : formState, required ? requiredInitObj! : updateInitObj!, setFormError )
        .then(( isValidated )=>{        
            if( isValidated ) {
                formAction!( formState, update )
            }else{
                console.log(formState)
            }
        } ) 
    }

    const BTN = 
    <ButtonRequest title={ update ? uTitle! : cTitle } isLoad={ loading } isSuccess={ isSuccess( ) } 
        onClick={()=>{ update ? handleOnUpdate() : handleOnSubmit();}} />

    return [ BTN ]
};