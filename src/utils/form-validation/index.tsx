import React,{ FC } from 'react'
import { getErrTxt, validateFormValues } from './validateForm'

interface IProps {
    formError : { [ key : string ] : string } | undefined ; 
    value : any
}

export { validateFormValues };

const ErrorTxt: FC<IProps> = ( props ) => {

    const { formError, value } = props

    const errTxt = getErrTxt( formError, value )

    return(
        <>
        {errTxt.length > 0 &&
            <p style={{color:"#FF5592", fontSize:".8em", margin: "0px 0px 5px 0px"}}>
                {errTxt}
            </p>}
        </>
    )
}

export default ErrorTxt;