import React, { FC } from 'react'
import './index.scss'

interface IProps {
    type : "small" | "big" | "thumbnail",
    imageArray? : Array<string>;
    image? : string;
    multiple? : boolean;
    docType? : string;
}

const DownloadFeature:FC<IProps> = (props) => {
    const { type, imageArray = [], image = '', multiple = false, docType } = props
    return(
        <DownloadComponent type={type}  multiple={multiple} onClick={()=>{ multiple ? downloadMultipleFilesasZip( imageArray ) : downloadFunction( image, docType ) }} />        
    )
}

interface IDC {
    multiple? : boolean;
    type : "small" | "big" | "thumbnail",
    onClick: React.MouseEventHandler<HTMLDivElement> | undefined;
}

const DownloadComponent:FC<IDC> = (props) => {
    const { multiple, type, onClick } = props
    return(
        <div className={`download-component ${type === "small" ? "small-btn" : type === 'big' ? 'big-btn' : type === 'thumbnail' ? 'thumbnail-btn' : ''}`}
            title={`Download ${multiple ? "All" : ""}`} onClick={onClick} >
            {type !== "thumbnail" && <p>Download&nbsp;&nbsp;{multiple ? "All" : ""}</p>}
            <i className="fa fa-download" aria-hidden="true"></i>
        </div>
    )
}

const downloadFunction = ( imgurl : string, docType : string | undefined ) => {
    fetch(imgurl.replace('http:','https:'))
    .then(function(response) {
        return response.blob()
    })
    .then(function(blob) {
        var element = document.createElement("a");
        element.href = URL.createObjectURL(blob);
        element.download = docType ? docType : "image.jpg";
        element.click();
    });  
}

const downloadMultipleFilesasZip = (fileURLs : Array<string> ) => {  
    let count = 0;
    let zip: any;
    const query = { fileURLs, count, zip };
    downloadFile(query, onDownloadComplete);
}

type qtype = { fileURLs : Array<string>, count : number, zip : any }

const downloadFile = (query : qtype, onSuccess : (query: qtype, blobData: Blob ) => void) => {
    const { fileURLs, count, } = query;
    var xhr = new XMLHttpRequest();
    // xhr.onprogress = calculateAndUpdateProgress;
    xhr.open('GET', fileURLs[count].replace('http:','https:'), true);
    xhr.responseType = "blob";
    xhr.onreadystatechange = function (e) {
        if (xhr.readyState === 4) {
            if (onSuccess) onSuccess(query, xhr.response );
        }
    }
    xhr.send();
}

const onDownloadComplete = (query: qtype, blobData : Blob ) => {
    let { fileURLs, count, zip } = query;
    if (count < fileURLs.length) {
      blobToBase64(blobData, function(binaryData){
        // add downloaded file to zip:
        // convert the source file name to the file name to display
        var displayFileName = (count+1) + '.' + getType(fileURLs[count]);
        zip.file(displayFileName, binaryData, {base64: true});
        if (count < fileURLs.length -1){
            count++;
            downloadFile({ ...query, count }, onDownloadComplete );
        }
        else {
            // all files have been downloaded, create the zip
            zip.generateAsync({type:"blob"}).then(function(content : any) {
                // see FileSaver.js
                // saveAs(content, `file.zip`);
            });
        }
      });
    }
}

const blobToBase64 = (blob : Blob, callback : ( b64 : string )=> void) => {
    var reader = new FileReader();
    reader.onload = function() {
        var dataUrl = reader.result;
        if(typeof dataUrl === "string"){
            var base64 = dataUrl.split(',')[1];
            callback(base64);
        }
    };
    reader.readAsDataURL(blob);
};

const getType = ( url : string ) => {
    return url.substring( url.lastIndexOf('.')+1, url.length )
};

// const calculateAndUpdateProgress = (evt : any) => {
//     if (evt.lengthComputable) {
//         // console.log(evt);
//     }
// }


export default DownloadFeature

// const downloadMultipleFilesasZip = async (url : Array<string>, count: number) => { 
//     for( let i = 0; i < url!?.length; i++ ){
//         fetch(url![i])
//         .then((image) => {
//             return image.blob()
//         })
//         .then((blob) => {
//             folder!.file('img' + i + '.jpg', blob)
//         })
//         if(i === url!?.length - 1 && count === url!?.length - 1) {
//             folder!.generateAsync({type: 'blob'}).then((content: any) => saveAs(content, 'files')); 
//         }
//         count++
//     };
// }