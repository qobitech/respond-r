import React from 'react';
import AutoInput from 'utils/auto-complete';
import ErrorTxt from 'utils/form-validation';
import { separator } from 'utils/helpers';
import './form.scss';

export type InputAR = {[ key : string] : any, className?: string, isAI?: boolean, options?: Array<string>, state?: Array<{[key: string]: any}>, refreshFunc?: Function, loading?:boolean }[];

type Ie = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>; 

interface IFormProps {
    label : string;
    name : string;
    className?: string;
    formError: {[key: string]: any};
    placeholder? : string;
    value? : string | number;
    onChange : ( e: Ie ) => void;
    isAI?: boolean;
    handleLIClick?: (e: any, name: string) => void;
    options?: Array<string>;
    refreshFunc?: Function;
    loading?: boolean;
};

const InputForm  = (props: IFormProps) => {

    const { label, name, placeholder, value, onChange, options, handleLIClick, refreshFunc, loading, isAI, className, formError } = props;

    return(
        <div className='create-main'>
            {
                isAI?
                <div className="input-area">
                     <p className="label">{label}</p>
                    <AutoInput options={ options! } onLIClick={(e) => handleLIClick!(e, name)}
                        onChange={onChange!} fullWidth name={ name } refreshData={() => refreshFunc!() }
                        onXClick={() => void(0)} isLoad={loading} key={options![0]} />
                    <ErrorTxt formError={ formError } value={name} />
                </div>
                :
                <div className="input-area">
                    <p className="label">{label}</p>
                    <input type="text" name={ name } onChange={ onChange } value={ value }
                        className={className} placeholder={ placeholder } />
                    <ErrorTxt formError={ formError } value={name} />
                </div>
            }
        </div> 
    )
}

interface IProps {
    formDetails: InputAR;
    setFormDetails: React.Dispatch<React.SetStateAction<InputAR>>;
    formError: {[key: string]: string};
}

export const InputFormMain = (props: IProps) => {

    const { formDetails = [], setFormDetails, formError } = props;

    const handleInputParameters = (e: Ie, index: number) => {
        const { name, value } = e.target;
        e.stopPropagation();
        let great = [...formDetails]
        let boom = great[index]
        boom[name] = value
        great[index] = boom
        setFormDetails(great);
    };

    const handleLIClick = (e: any, name: string, index: number) => {
        const { innerText } = e.currentTarget;
        let great = [...formDetails]
        let boom = great[index]
        boom[name] = boom!?.state!?.filter(c => c!?.name === innerText)[0]!?.id
        great[index] = boom
        setFormDetails(great);
    };

    return(
        <div>
            {
                Boolean(formDetails) && formDetails!?.map((name, index) => {
                    var nameList = Object.keys(name) || [''];
                    return(
                        <div key={index}>
                            <InputForm label={separator( nameList![0] )} name={nameList![0]} 
                            onChange={(e: Ie) => handleInputParameters(e, index)} formError={formError!}
                            value={Object.values(name)[0]} 
                            placeholder={ separator( nameList![0] ) } handleLIClick={(e: any) => handleLIClick(e, nameList![0], index )} options={name!?.options} isAI={name!?.isAI}
                            refreshFunc={name!?.refreshFunc} loading={name!?.loading}
                            /> 
                        </div>
                    )
                })
            }
        </div>
    )
};

export default InputFormMain;

// // {/* <div className="input-area" key={index}>
// // {/* <p className="label">username</p>
// // <input type="text" name='username' onChange={handleOnChange} value={formDetails!?.username}
// //     className={formError!?.username!?.length > 0 ? 'error' : ''} />
// // <ErrorTxt formError={ formError } value={'username'} /> */}
// </div> */}