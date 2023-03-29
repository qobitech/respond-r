import React, { useEffect, useState } from 'react';
import './general.scss';

interface ILoaderBar {
    loading?: boolean;
}

const LoaderBar = (props: ILoaderBar) => {
    
    const { loading = true } = props;
    const [ completed, setCompleted ] = useState(0);

    useEffect(() => {
        if(loading){
            const loop = setInterval(() => setCompleted(Math.floor(completed) + 40), 100)

            return(() => {
                clearInterval(loop)
            })
        }
    }, [completed, loading])

    return(
        <div className='loader-bar'>
            <div className="filler" style={{width: `${completed}%`}}>
            </div>
        </div>
    )
} 

export default LoaderBar;