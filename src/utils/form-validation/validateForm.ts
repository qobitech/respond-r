import { separator } from '../helpers'

type IErrorObj = React.Dispatch<React.SetStateAction<{ [ key : string ] : string; } | undefined>>


const compareProps = async <F>( formValues : F, interfaceobject : F, setErrorObj : IErrorObj ) => {
    setErrorObj( { } )
    let reason : Array<{ prop : string, value : any }> = [];
    for( let key in formValues ){
        if(formValues !== null && formValues !== undefined && interfaceobject !== null && interfaceobject !== undefined ){
            if( typeof formValues[ key ] !== typeof interfaceobject[ key ] ){
                reason.push( { prop : key, value : formValues[ key ] } )
                setErrorObj( p => ({ ...p, [ key ] : `${key} not valid` }) )
            } 
        }     
    }
    return { status : reason.length === 0 }
}

const checkLength = async <F>( formValues : F, interfaceobject : F, setErrorObj : IErrorObj ) => {
    setErrorObj( p => ({ ...p, 
        "props" : formValues !== null && formValues !== undefined && interfaceobject !== null && interfaceobject !== undefined 
        && Object.keys( formValues ).length === Object.keys( interfaceobject ).length ? '' : 'form props missing' 
    }))
    return (formValues !== null && formValues !== undefined && interfaceobject !== null && interfaceobject !== undefined) ?
    Object.keys( formValues! ).length === Object.keys( interfaceobject! ).length: false
}

const checkValues =  async <F extends { [key : string] : any }>( formValues : F, setErrorObj : IErrorObj ) => {
    let reason : Array<{ prop : string, value : string }> = [];
    for( let key in formValues ){
        if( formValues[ key ] === null || formValues[ key ] === undefined || formValues[ key ] === 0 || formValues[ key ].length === 0 ){
            reason.push( { prop : key, value : formValues[ key ] } )
            setErrorObj( p => ({ ...p, [ key ] : `${separator(key).replace('Id','').toLowerCase()} is required` }) )
        }
    }
    return { valueStatus : reason.length === 0, valueReason : reason, formValues }
} 

export const validateFormValues = async <F extends { [key : string] : any }>( formValues : F, interfaceobject : F, setErrorObj : IErrorObj ) => {
    let cL : boolean, cP : boolean, cV : boolean;
    cL = await checkLength( formValues, interfaceobject, setErrorObj )    
    cP = await (await compareProps( formValues, interfaceobject, setErrorObj )).status
    cV = await (await checkValues( formValues, setErrorObj )).valueStatus;
    return ( cL && cP && cV) as boolean;
}

export const getErrTxt = ( isError : { [ key : string ] : string } | undefined , value : string ) => {
    if( isError !== undefined )
        return typeof isError[ value ] === 'string' ? isError[ value ] === undefined ? '' : isError[ value ] : ''
    else
        return ''
}
