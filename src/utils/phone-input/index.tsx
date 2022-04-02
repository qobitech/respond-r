import React, { useState, useEffect } from "react";
import { CountryCodes } from './country-codes';
import './index.scss';

export interface IPhoneInput extends IInputProps {
    update?: boolean;
};

const PhoneInput = ( props: IPhoneInput ) => {

    const { className, onChange, placeholder, required, name, style, disabled, onBlur, onKeyUp, defaultValue, update } = props;
    const [ showOptions, setShowOptions ] = useState(false);
    const [ countrySearch, setCountrySearch ] = useState('');
    const defaultCountry =  CountryCodes.filter(cD => cD!?.country_code === 'NG')[0]
    const [ selectedOption, setSelectedOption ] = useState(defaultCountry);
    const DefaultValue = selectedOption!?.phone_code;
    const [ userInput, setUserInput ] = useState(DefaultValue);

    const handleChange = (e: any) => {
        setUserInput('+' + thousandSep(e.currentTarget.value));
    };

    const handleKeyDown = (e: any) => {
        if (userInput!?.length <= 4 && e.keyCode === 8){
            e.preventDefault()
        };
    };

    const thousandSep = ( value : string ) => {
        return value.toString().match(/[a-zA-Z0-9]{3}(?=[a-zA-Z0-9]{2,3})|[a-zA-Z0-9]+/g)!?.join("-");
    };

    useEffect(() => {
        if(update){
            setUserInput(defaultValue)
        }else{
            setUserInput(DefaultValue)
        }
    }, [DefaultValue, update, defaultValue]);

    return(
        <div className="options" onBlur={() => {setShowOptions(false)}}>
            <div className='password-input-area'>
                <div className='code-dropdown' onClick={() => setShowOptions(!showOptions)}>
                    <img src={selectedOption!?.image!} alt="flag" />
                    <i className={showOptions ? "fa fa-angle-up" : "fa fa-angle-down"}></i>
                </div>
                <input
                    type="tel"
                    onChange={(e) => {handleChange(e); onChange!(e)}}
                    value={(userInput || DefaultValue || defaultValue || '') }
                    onBlur={onBlur}
                    onKeyUp={onKeyUp}
                    onKeyDown={(e) => {handleKeyDown(e)}}
                    required={required} style={style} name={name} 
                    placeholder={placeholder} className={className} autoComplete='nope'
                    disabled={ disabled }
                />
            </div>
            {
                showOptions &&
                    <div className='options-box'>
                        <ul>
                            <input type="search" value={countrySearch} onChange={(e) => setCountrySearch(e.target.value)} 
                                placeholder='Search...' />
                            {CountryCodes.filter(c => c!?.country_name.toLowerCase().includes(countrySearch.toLowerCase()))
                            .map((cD) => {
                                return (
                                    <li key={cD!?.country_code} onClick={() => { setSelectedOption(cD); setShowOptions(false); }}>
                                        {cD!?.country_name} {cD!?.phone_code}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
            }
        </div>
    )
};

export default PhoneInput;


export interface IInputProps {
    className?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onClick?: (e: React.MouseEvent<HTMLDivElement> | undefined) => void;
    placeholder?: string;
    required?: true;
    fullWidth?: true;
    name?: string;
    type?: string;
    autoComplete?: string
    label?: string;
    step?: number;
    style?: React.CSSProperties;
    value?: string | number;
    onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    multiline?: boolean;
    rows?: number | string;
    rowsMax?: number | string;
    defaultValue?: any;
    disabled?: boolean;
    ref?: ((instance: HTMLDivElement | null) => void) | React.RefObject<HTMLDivElement> | null | undefined;
    inputRef? : React.Ref<any> | undefined;
    onKeyDown?: React.KeyboardEventHandler<HTMLDivElement> | undefined;
    onKeyUp?: React.KeyboardEventHandler<HTMLDivElement> | undefined;
    onInput?: React.FormEventHandler<HTMLDivElement> | undefined;
};