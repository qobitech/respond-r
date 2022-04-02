import React, { useState, useEffect } from "react";
import Loader from '../../extras/images/loader/loader.svg';
import { IAutoInputProps } from 'utils/auto-complete';
import './index.scss';

interface IProps extends IAutoInputProps {
    options: Array<string>;
    onLIClick?: React.MouseEventHandler<HTMLElement>;
    onXClick?: (e:React.MouseEvent<HTMLDivElement, MouseEvent>)=>void;
    refreshData?: React.MouseEventHandler<HTMLElement> | undefined;
    isLoad?: boolean;
    isData?: boolean;
    clearValue?: (item: string) => void;
    formClose?: boolean;
    updateDefaultValues? : Array<string>;
    update?: boolean;
    selectedTags: Array<ITag>;
    setSelectedTags: React.Dispatch<React.SetStateAction<ITag[]>>
    allowedScopes: Array<ITag>;
}

const InputTag = ( props: IProps ) => {

    const { options = [''], selectedTags, className, onChange, placeholder, required, name, style, defaultValue, update, updateDefaultValues, disabled, onLIClick, refreshData, isLoad, formClose, allowedScopes, setSelectedTags } = props;
    const [ activeOption, setActiveOption ] = useState(0);
    const [ filteredOptions, setFilteredOptions ] = useState<Array<string>>(['']);
    const [ showOptions, setShowOptions ] = useState(false);
    const [ userInput, setUserInput ] = useState('');
    const lUV = updateDefaultValues!?.map(m => m!?.toLowerCase());

    const handleChange = (e: any) => {
        setShowOptions(true)
        setUserInput(e.currentTarget.value);
        setFilteredOptions(options!?.filter((option) => option.toLowerCase().indexOf(userInput.toLowerCase()) > -1));
        setActiveOption(0);
    };

    useEffect(() => {
        setFilteredOptions(options!?.filter((option) => option!?.toLowerCase().indexOf(userInput.toLowerCase()) > -1));
    },[userInput, options])
    
    const handleClick = (e: any) => {
        setActiveOption(0);
        // setFilteredOptions(['']);
        // setShowOptions(false);
        // setUserInput(e.currentTarget.innerText)
    };

    const handleKeyDown = (e: any) => {
        if ( e.keyCode === 13) {
            setActiveOption(0);
            // setShowOptions(false)
            setSelectedTags(prev => [ ...prev, allowedScopes!?.filter(s => s!?.value === filteredOptions[activeOption])[0]])
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

    const handleClearTag = (value: string) => {
        setSelectedTags(selectedTags!?.filter(s => s!?.value.toLowerCase() !== value.toLowerCase()))
        setShowOptions(true)
    }

    useEffect(()=>{
        if(formClose){
            setUserInput('')
            setShowOptions(false)
        }
    },[formClose]);

    const apiScopeConv = (scopes: Array<string>) =>
    scopes!?.map((s, i) => ({
        id: i,
        value: s.toUpperCase()
    } as ITag));

    useEffect(() => {
        if(update)
        Array.isArray(updateDefaultValues) && setSelectedTags(apiScopeConv(updateDefaultValues!))
    },[update, updateDefaultValues, setSelectedTags]);

    return(
        <div className="input-tag">
            {selectedTags!?.length>0 && 
                <div className="tag-section">
                    {
                        Boolean(selectedTags) && selectedTags!?.length > 0 &&
                            selectedTags!?.map(tag => {
                                return(
                                    <div className='selected-tag' key={tag!?.id}>
                                        <p>{tag!?.value}</p>
                                        <i className="fa fa-window-close" onClick={() => handleClearTag(tag!?.value)}></i>
                                    </div>
                                )
                            })
                    }
                </div>
            }
            <div className="options" onBlur={() => {setShowOptions(false)}}>
                <div style={{display:"flex", alignItems:"center", justifyContent:"space-between",width:"100%",position:"relative"}}>
                    <input
                        type="text"
                        onChange={(e) => {handleChange(e); onChange!(e)}}
                        onFocus={() => {setShowOptions(true)}}
                        onKeyDown={(e) => {handleKeyDown(e)}}
                        value={ ( userInput || defaultValue ) }
                        required={required} style={style} name={name} 
                        placeholder={placeholder} className={className} autoComplete='nope'
                        defaultValue={defaultValue} disabled={ disabled }
                    />
                    {allowedScopes!?.length === 0 &&
                    <div style={{width:"10%",textAlign:"center", fontSize:"12px", position:"absolute", 
                        top:0, right:0, height:"100%", display:"flex", alignItems:"center", justifyContent:"center"}}>
                        {isLoad ? <img src={Loader} alt="...loader" />
                        : <i className="fas fa-redo" onClick={ refreshData } style={{cursor:"pointer"}} />}
                    </div>}
                </div>
                {
                    (showOptions) &&
                        <>
                            {allowedScopes!?.length > 0 ? 
                                filteredOptions!?.length > 0 && 
                                    <ul>
                                        <p className='close-options' onClick={() => setShowOptions(false)}>
                                            <i className="fa fa-window-close"></i>
                                            Close Options
                                        </p>
                                        {filteredOptions!?.map((option, index) => {
                                            let className;
                                            if (index === activeOption) {className = "option-active"}
                            
                                            return (
                                                (update ? !lUV!?.includes(option.toLowerCase()) : true) &&
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
                                <em>No options. Click the refresh icon to load data..</em>
                            </div>
                        }
                    </>
                }
            </div>
        </div>
    )
};

export default InputTag;

interface ITag {
    id: number;
    value: string;
}