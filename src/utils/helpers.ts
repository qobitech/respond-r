
import { naijaPhoneRegex } from './constants';

// export function checkIfNull<R> ( item: R ) {
//     if(item === null || item === undefined || (typeof item === 'string' && item.length === 0)) {
//         return false;
//     }else {
//         return true;
//     }
// }; 
export const checkIfNull = <R,>( item: R ): boolean => {
    if(item === null || item === undefined || (typeof item === 'string' && item.length === 0)) {
        return false;
    }else {
        return true;
    }
}; 

export const checkIfUrl = <R,>( item: R ): boolean => {
    let url: URL;

    try {
        url = new URL(typeof item === 'string' ? item : '')
    } catch(_) {
        return false;
    }

    return url.protocol === 'http:' || url.protocol === 'https:';

}

export const dateCleaner = ( item: string )  => {
    if(item!?.length > 0){
        return new Date(item).toDateString()
    }else{
        return ''
    }
};

export const timeCleaner = ( item: string )  => {
    return new Date(item).toLocaleTimeString()
};

export const separator = ( name : string ) => {
    let arr = name!?.split('').map( item => {
        if( item === item!?.toUpperCase() ) return ' ' + item;
        else return item;
    } ).toString().replace(/,/g, '');
    return arr!?.charAt(0).toUpperCase() + arr!?.slice(1).toLowerCase();
};

interface IVB {
    vehicleOffenseId: number;
    generateInvoiceId: (offenceId: object) => void;
    isGInvoiceLoad: boolean;
    pageNumber: number;
    pageSize: number;
    getAllVehicleOffencePayment: ( pageNumber?: number, pageSize?: number ) => void; 
};

export const checkIfVid =  <R,>( item: R ): boolean => {
    if (typeof item === 'string' && item.length > 0) {
        if( item.substring(item.lastIndexOf('.')).includes('mp4') ) {
            return true
        }else{
            return false
        }
    }return false
};

export const handleFloat = (item: string) => {
    var floatItem = parseFloat(item)
    if(isNaN(floatItem)) {
        return 0
    }else{
        return floatItem
    }
};


export const validatePhoneNumber = ( name:string, value : string, setOtherErrors: any, setOtherValidations: React.Dispatch<React.SetStateAction<boolean>> ) => {
        
    if(!naijaPhoneRegex.test(value!?.replaceAll('-', ''))){
        setOtherErrors((p: any) => ({...p, [ name ] : `${name} not valid`}))
        setOtherValidations( false )
    }else{
        setOtherValidations( true )
        setOtherErrors((p: any) => ({...p, [ name ] : ``}))
    }
};

export const validateUsername = (name: string, value: string, setOtherErrors: React.Dispatch<React.SetStateAction<{
    [key: string]: string;} | undefined>>, setOtherValidations: React.Dispatch<React.SetStateAction<boolean>>) => {

    if(value!?.length < 8){
        setOtherErrors(p => ({...p, [ name ] : `${name} must be at least 8 characters`}))
        setOtherValidations( false )
    }else{
        setOtherValidations( true )
        setOtherErrors(p => ({...p, [ name ] : ``}))
    }
};

export const validatePassword = (formDetails:{[key: string]: any;} , setOtherErrors: React.Dispatch<React.SetStateAction<{
    [key: string]: string;} | undefined>>, setOtherValidations: React.Dispatch<React.SetStateAction<boolean>>) => {

    if(formDetails!?.password!?.length > 5 && formDetails!?.confirmPassword!?.length > 5){
        if( formDetails!?.password !== formDetails!?.confirmPassword ){
            setOtherErrors(p => ({...p, 'password' : `password must match`}))
            setOtherErrors(p => ({...p, 'confirmPassword' : `password must match`}))
            setOtherValidations( false )
        }else{
            setOtherValidations( true )
            setOtherErrors(p => ({...p, 'password' : ``}))
            setOtherErrors(p => ({...p, 'confirmPassword' : ``}))
        }
    }else{
        setOtherErrors(p => ({...p, 'password' : formDetails!?.password!?.length < 6 ? `password must be atleast 6 characters` : ''}))
        setOtherErrors(p => ({...p, 'confirmPassword' : formDetails!?.confirmPassword!?.length < 6 ? `password must be atleast 6 characters` : ''}))
        setOtherValidations( false )
    }
};