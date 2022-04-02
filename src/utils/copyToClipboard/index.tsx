import React, { FC, useState, useEffect } from 'react';

interface IProps{
    toCopy: string;
    isSecret?: boolean;
};

const CopyToClipboard: FC<IProps> = (props) => {

    const { toCopy = '', isSecret = false }  = props;
    const [ copySuccess, setCopySuccess ] = useState('');
    const [ toggleSecret, setToggleSecret ] = useState(false);

    const copyToClipboard = async (toCopy: string) => {
        try {
            navigator!?.clipboard!?.writeText(toCopy)
            setCopySuccess('Copied!')
        } catch (err) {
            setCopySuccess('Failed to Copy :(')
        }
    };

    useEffect(() => {
        if(copySuccess!?.length > 0){
            let clearCopyText = setTimeout(() => {
                setCopySuccess('')
            }, 2000);

            return(() => {
                clearTimeout(clearCopyText)
            })
        }
    }, [copySuccess]);

    return(
        <div>
            <p style={{position: 'relative'}}>
                {isSecret ?
                    (!toggleSecret ? '**********' : toCopy)
                    :
                    toCopy
                }
                {isSecret &&  
                    <i className='fa fa-eye' style={{marginLeft: '5px', cursor: 'pointer'}} onClick={() => setToggleSecret(!toggleSecret)}></i>
                }
                <i className='fa fa-clone' style={{marginLeft: '5px', cursor: 'pointer'}} onClick={() => copyToClipboard(toCopy)}></i>
                <span style={{position: 'absolute', backgroundColor: '#64FDE1'}}>{copySuccess}</span>
            </p> 
        </div>
    )
};

export default CopyToClipboard;