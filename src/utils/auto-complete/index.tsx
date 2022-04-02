import React, { useState, useEffect } from "react";
import Loader from '../../extras/images/loader/loader.svg'
import './index.scss';

export interface IAutoInputProps extends IInputProps {
    options: Array<string>;
    onLIClick?: React.MouseEventHandler<HTMLElement>;
    onXClick?: (e:React.MouseEvent<HTMLDivElement, MouseEvent>)=>void;
    refreshData?: React.MouseEventHandler<HTMLElement> | undefined;
    isLoad?: boolean;
    isData?: boolean;
    clearValue?: (item: string) => void;
    formClose?: boolean;
    updateDefaultValue? : string;
    update?: boolean;
};

const AutoInput = ( props: IAutoInputProps ) => {

    const { options, className, onChange, placeholder, required, name, style, defaultValue, update, updateDefaultValue, disabled, onLIClick, refreshData, isLoad, formClose } = props;
    const [ activeOption, setActiveOption ] = useState(0);
    const [ filteredOptions, setFilteredOptions ] = useState<Array<string>>(['']);
    const [ showOptions, setShowOptions ] = useState(false);
    const [ userInput, setUserInput ] = useState('');

    const handleChange = (e: any) => {
        setShowOptions(true)
        setUserInput(e.currentTarget.value);
        setFilteredOptions(options!?.filter((option) => option.toLowerCase().indexOf(userInput.toLowerCase()) > -1));
        setActiveOption(0);
    };

    useEffect(() => {
        setFilteredOptions(options!?.filter((option) => option!?.toLowerCase().indexOf(userInput.toLowerCase()) > -1));
    },[options, userInput])
    
    const handleClick = (e: any) => {
        setActiveOption(0);
        setFilteredOptions(['']);
        setShowOptions(false);
        setUserInput(e.currentTarget.innerText)
    };

    const handleKeyDown = (e: any) => {
        if ( e.keyCode === 13) {
            setActiveOption(0);
            setShowOptions(false)
            setUserInput(filteredOptions[activeOption])
        } else if ( e.keyCode === 38 ) {
            if ( activeOption === 0 ){
                return;
            }
            setActiveOption(activeOption - 1 )
        } else if ( e.keyCode === 40 ) {
            if ( activeOption - 1 === filteredOptions!?.length ) {
                return ;
            }
            setActiveOption( activeOption + 1 )
        }
    };

    // const handleClear = () => {
    //     setUserInput('')
    //     setShowOptions(false)
    // };

    useEffect(()=>{
        if(formClose){
            setUserInput('')
            setShowOptions(false)
        }
    },[formClose])

    return(
        <div className="options" onBlur={() => {setShowOptions(false)}}>
            <div style={{display:"flex", alignItems:"center", justifyContent:"space-between",width:"100%",position:"relative"}}>
                <input
                    type="text"
                    onChange={(e) => {handleChange(e); onChange!(e)}}
                    onFocus={() => {setShowOptions(true)}}
                    onKeyDown={(e) => {handleKeyDown(e)}}
                    value={ update ? ( userInput || updateDefaultValue || '' ) : ( userInput || defaultValue || '' ) }
                    required={required} style={style} name={name} 
                    placeholder={placeholder} className={className} autoComplete='nope'
                    disabled={ disabled }
                />
                {options!?.length === 0 &&
                <div style={{width:"10%",textAlign:"center", fontSize:"12px", position:"absolute",
                                top:0, right:0, height:"100%", display:"flex", alignItems:"center", justifyContent:"center"}}>
                    {isLoad ? <img src={Loader} alt="...loader" />
                    : <i className="fas fa-redo" onClick={ refreshData } style={{cursor:"pointer"}} />}
                </div>}
            </div>
            {
                showOptions &&
                    <>
                        {filteredOptions!?.length > 0 ? 
                            <ul>
                                {filteredOptions.map((option, index) => {
                                let className;
                    
                                if (index === activeOption) {
                                    className = "option-active";
                                }
                    
                                return (
                                    <li className={className} key={index} onClick={(e) => { handleClick(e); onLIClick!(e)}}
                                        onMouseDown={(e => e.preventDefault())}
                                    >
                                    {option}
                                    </li>
                                );
                                })}
                            </ul>
                        :
                        <div className="no-options">
                            <em>No options. Click the refresh icon to load data...</em>
                        </div>
                    }
                </>
            }
        </div>
    )
};

export default AutoInput;


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
    onInput?: React.FormEventHandler<HTMLDivElement> | undefined;
};