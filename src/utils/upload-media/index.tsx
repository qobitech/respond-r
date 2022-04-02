import React, {FC, useState } from 'react';

interface IUC {
    FILE_SIZE_LIMIT : number;
    filesize : string;
    setUploadObj : ( file : File ) => void;
    uploadObj : {[key: string]: File;};
    name: string;
    setIsUpload : React.Dispatch<React.SetStateAction<boolean>>;
    isUpload : boolean;
}

export const UploadComponent : FC<IUC> = (props) => {
    const { setUploadObj, uploadObj, FILE_SIZE_LIMIT, filesize, name, setIsUpload, isUpload } = props
    const [ validationStatus, setValidationStatus ] = useState('');

    const handleFiles = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { files } = e.target as HTMLInputElement
        setValidationStatus(''); setIsUpload(false);
        if (validateFileSize(files)){
            if(validateFileFormat(files)){
                if(null !== files){
                    setUploadObj(files[0])
                    setIsUpload(true);
                }
            }else{
                setValidationStatus('Invalid file format (pdf, doc, jpeg only)');
                setIsUpload(false);
            }
        }else{
            setValidationStatus(`File size limit of ${filesize} exceeded...`);
            setIsUpload(false);
        }
    }

    const validateFileSize = ( files : FileList | null ) => {
        return files !== null && files[0].size <= FILE_SIZE_LIMIT;
    }
    const validateFileFormat = ( files : FileList | null ) => {
        return files !== null && isFileFormat(files);
    }

    const isFileFormat = ( files : FileList ) => {
        switch( files[0].type ){
            case 'doc' : return true;
            case 'application/pdf' : return true;
            case 'image/jpeg' : return true;
            case 'application/msword' : return true;
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' : return true;
            default : return false;
        }
    }

    return(
        <div style={{display:"flex", flexDirection:"column"}}>

            {!isUpload ?
            <div style={{display:"flex",flexDirection:"column", alignItems:"flex-start",margin:"0 auto 20px", width:"100%", 
                height: validationStatus.length > 0 ? "auto" : "56px", position:"relative"}}>
                
                <input onChange={handleFiles} type="file" style={{width:"100%", margin:0, height:"56px"}} name={name}/>

               
                {validationStatus.length > 0 && <p style={{fontSize:"13px", color:"red", marginBottom:"15px"}}>{validationStatus}</p>}
            </div>
            :
            <div style={{border:"1px solid #e7e7e7", borderRadius:"5px", width:"100%", height:"56px", marginBottom:"25px", marginTop:"10px", position:"relative"}}>
                <div style={{width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center", textAlign:"center", margin:"0"}}>
                    <p style={{fontSize:"1em", fontWeight:600, margin:0}}>
                        {uploadObj!?.name}
                    </p>
                </div>
            </div>}
        </div>
    )
}