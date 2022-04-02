import React, { useReducer } from 'react';
import AutoInput from 'utils/auto-complete';
import ErrorTxt from 'utils/form-validation';

type InputType = 'text' | 'textarea' | 'autoinput'
type InputField = {label: string, type: InputType, value: string, placeholder?: string, options?: Array<any>};

interface InputState {
    [key: string]: InputField;
};
interface InputAction {
    type: string;
    payload: string;
};

interface ErrorState {
    [key: string]: string;
};
interface ErrorAction {
    type: string;
    payload: string;
};

type InputReturn = [InputState,  React.Dispatch<ErrorAction>, JSX.Element]

const inputReducer = (state: InputState, action: InputAction) :InputState => {
    const { type = '', payload = '' } = action;
    const inputField = state[type];

    return {...state, [type]: {...inputField, value: payload }};
};

const errorReducer = (state: ErrorState, action: ErrorAction) :ErrorState => {
    const { type = '', payload = '' } = action;

    return {...state, [type]: payload};
};

const objConv = (obj: Object) => {
    const objKeys = Object.keys(obj);
    let rObj = {} as {[key: string]: any};

    for(let i = 0; i < objKeys.length; i++){
        rObj[objKeys[i]] = ''
    }

    return rObj;
};

export const useInputReducer = (initialState: InputState) => {

    const [ state, dispatch ] = useReducer(inputReducer, initialState );
    const errorState = objConv(initialState);
    const [ formError, setFormError ] = useReducer(errorReducer, errorState);

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        dispatch({ type: name, payload: value })
    };

    const handleLIClick = (e: any, name: string ) => {
        const { innerText } = e.currentTarget;
        dispatch({ type: name, payload: innerText })
    };

    const convertState = () => {
        const objKeys = Object.keys(state);
        let rObj = {} as {[key: string]: any};

        for(let i = 0; i < objKeys.length; i++){
            let key = objKeys[i];
            rObj[key] = state[key].value
        }
        return rObj
    };

    const InputComponents = () => {
        const inputFields = initialState && Object.keys(initialState);

        return(
            <div>
                {
                    inputFields.map((field, index) => {
                        let fieldContent = state[field];
                        const { label, type, value, placeholder, options } = fieldContent;

                        switch (type) {
                            case 'text' :
                                return (
                                    <div className="input-area" key={index}>
                                        <p className="label">{label}</p>
                                        <input type="text" name={field} value={value}
                                        onChange={handleFormChange} placeholder={placeholder}  />
                                        <ErrorTxt formError={ formError } value={field} />
                                    </div>
                                )
                            
                            case 'textarea':
                                return (
                                        <div className="input-area" key={index}>
                                            <p className="label">{label}</p>
                                            <textarea name={field} onChange={handleFormChange} value={''} rows={3} />
                                            <ErrorTxt formError={ formError } value={field} />
                                        </div>
                                    )

                            case 'autoinput':
                                return (
                                        <div className="input-area" key={index}>
                                            <p className="label">{label}</p>
                                            <AutoInput options={options!} name='state' onChange={handleFormChange} 
                                            onLIClick={(e) => handleLIClick(e, 'state')} update updateDefaultValue={value}/>
                                            <ErrorTxt formError={ formError } value={field} />
                                        </div>
                                    )
                            default:
                                return <></>
                        }
                    })
                }
            </div>
        );
              
    };

    return [convertState(), setFormError, InputComponents()] as InputReturn;
};