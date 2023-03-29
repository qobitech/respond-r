import React, { useState, useEffect } from 'react';
import { IApplication } from 'interfaces/IApplication';
import './index.scss';

interface IAPPThumbnail {
    applications: Array<IApplication>;
    selectedApps: Array<IApplication>;
    setSelectedApps: React.Dispatch<React.SetStateAction<IApplication[]>>;
    onClick: React.MouseEventHandler<HTMLElement>;
};

const APPThumbnail = (props: IAPPThumbnail) => {

    const { applications, onClick, selectedApps, setSelectedApps } = props;
    const [ addAll, setAddAll ] = useState(false);

    const handleCheck = (id: number) => {
        let toBeChecked = selectedApps!?.find( x => x!?.id === id)
        if(toBeChecked !== undefined && Object.keys(toBeChecked)!?.length > 0){
            setSelectedApps(selectedApps!?.filter(a => a!?.id !== id))
        } else {
            setSelectedApps(prev => [...prev, applications!?.filter(a => a!?.id === id)[0]])
        }
    };

    const handleAddAll = () => {
        if(!addAll){
            setSelectedApps(applications)
        }else{
            setSelectedApps([])
        }
    };

    let allChecked = selectedApps!?.length === applications!?.length;

    useEffect(() => {
        if(allChecked) setAddAll(true)
        else setAddAll(false)
    }, [allChecked]);

    return(
        <>
            <div className="app-thumbnail-section">
                {
                    applications!?.map(app => {
                        const { id = 0, applicationName = ''  } = app || {};
                        let isInArray = selectedApps!?.some( x => x!?.id === id)
                        return(
                            <div className={`app-thumbnail ${isInArray && 'checked'}`} onClick={(e) => {handleCheck(id); onClick(e)}} 
                                key={id}>
                                <input type='checkbox' className='app-check' checked={isInArray || allChecked} onChange={() => void(0)} />
                                <p>{applicationName}</p>
                            </div>
                        )
                    })
                }
            </div>
            <div className="add-all-apps" onClick={() => {handleAddAll(); setAddAll(!addAll) }}>
                <input type='checkbox' className='app-check' checked={allChecked} onChange={() => void(0)} />
                <span>{`${!allChecked ? 'Select': 'Deselect'}`} all applications</span>
            </div>
        </>
    )
};

export default APPThumbnail;