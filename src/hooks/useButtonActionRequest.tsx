import React, { useEffect } from 'react';
import { IHttp } from 'interfaces/IHttp';
import { ButtonRequest } from 'utils/button';
import { validateFormValues } from 'utils/form-validation';
import { useStrictLoader } from './useStrictLoader';

interface IProps {
    http: IHttp;
    loading: boolean;
    update: boolean | undefined;
    formAction?: ( action: string, data: object, update?: boolean ) => void;
    mediaAction?: ( data: FormData ) => void;
    adminAction: string;
    formState: {[key: string]: any};
    mediaState?: FormData;
    setFormState:  React.Dispatch<React.SetStateAction<{[key: string]: any}>>;
    isMedia?: boolean;
    createInitObj: object;
    updateInitObj?: object;
    requiredInitObj?: object;
    otherValidations: boolean;
    setFormError: React.Dispatch<React.SetStateAction<{ [ key : string ] : string; } | undefined>>;
    onButtonClick?: () => void;
    onSuccess?: () => void;
    required?: boolean;
    requiredState?: {[key: string]: any};
    updateFormState : ( title : string, callBack:( action: string, updatedFormState : object )=> void ) => Promise<void>;
    buttonOptions:Array<{ id: number, title : string, action : string }>;
}

export const useButtonActionRequest = ( props: IProps ) => {
    
    const { http, loading = false, update, formAction, formState, setFormState, mediaState, createInitObj, updateInitObj, onButtonClick, adminAction, otherValidations, setFormError, isMedia, mediaAction, onSuccess, required, requiredState, requiredInitObj, updateFormState, buttonOptions } = props;

    let isLoad = useStrictLoader(adminAction, ...buttonOptions.map(i => i.action) );

    let isBtnAction = ( action : string ) => {
        return adminAction === action;
    }

    const isSuccess = ( ) => {
        return isLoad && http.httpStatus === 200
    }

    useEffect(()=>{
        if( isSuccess() ){
            typeof onSuccess === "function" ? onSuccess() : void(0)
            if(!update){
                setFormState( createInitObj )
            }
        }
    // eslint-disable-next-line
    },[ http.httpStatus ]);

    const handleOnSubmit = async ( action: string, updatedFormState : object ) => {
        typeof onButtonClick === 'function' ? onButtonClick!() : void(0);
        validateFormValues( required ? requiredState! : updatedFormState, required ? requiredInitObj! :createInitObj, setFormError )
        .then(( isValidated )=>{        
            if( isValidated ) {
                if( otherValidations){
                    if(isMedia){
                        mediaAction!( mediaState! )
                    }else{
                        formAction!( action, updatedFormState )
                    }
                }
            }else{
                console.log(formState)
            }
        })
    }
    
    const handleOnUpdate = async ( action:string, updatedFormState: object ) => {
        typeof onButtonClick === 'function' ? onButtonClick!() : void(0);
        validateFormValues( required ? requiredState!: updatedFormState , required ? requiredInitObj! :updateInitObj!, setFormError )
        .then(( isValidated )=>{        
            if( isValidated ) {
                formAction!( action, updatedFormState , update )
            }
        } ) 
    }

    interface IBTNR {
        title : string;
        action : string;
    }

    const BTNR = (props : IBTNR ) => {

        const { title, action } = props

        return(
            <div style={{ width : "max-content", marginLeft : "10px" }}>
                <ButtonRequest 
                    title={ title } 
                    isLoad={ isBtnAction( action ) && loading && isLoad } 
                    isSuccess={ isBtnAction( action ) && isSuccess() } 
                    onClick={()=>{ 
                        update ? 
                            typeof updateFormState === 'function' ? updateFormState( title, handleOnUpdate ): void(0)
                        : 
                            typeof updateFormState === 'function' ? updateFormState( title, handleOnSubmit ) : void(0);
                    }} 
                />
            </div>
        )
    }

    const BTNOption = ( ) => {
        return(
            <div style={{display:"flex", alignItems:"center", justifyContent:"flex-end", marginLeft:"auto", width:"max-content"}}>
                {buttonOptions!.map( i => <BTNR title={i.title} key={i.id}  action={ i.action } />  )}
            </div>
        )
    }

    return [ <BTNOption /> ] 
};