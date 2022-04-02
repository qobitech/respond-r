import React, { useRef } from 'react';
// import Loader from '../../extras/images/loader/loader.svg';
import './index.scss';

interface IProps {
    src: string;
    title: string;
    height?: string | number;
    width?: string | number;
}

const IFrame: React.FC<IProps> = props => {
    const { src = '', title = '', height } = props || {};
    // const [ isLoaded, setIsLoaded ] = useState(true);
    const Iframe = useRef<HTMLIFrameElement | null>(null);

    // useEffect(() => {
    //     var IframeDoc = Iframe.current?.contentDocument
    //     if(IframeDoc?.readyState === 'complete') {
    //         setIsLoaded(true)
    //     }else{
    //         setIsLoaded(false)
    //     }
    // },[setIsLoaded, Iframe])
    
  return (
    <div className='i-frame'>
        {
            src ?

            <div style={{padding: '1em'}}>
                <h3>{title}</h3>

                {
                    <iframe src={src} frameBorder="0" title={title} height={height! || '700px'} width='100%' style={  {borderRadius:'5px'}} ref={Iframe}>
                    </iframe>

                    // :

                    // <div style={{ textAlign:'center' }}>
                    //     <img src={Loader} alt="loading...."/>
                    //     <p>Content is loading...</p>
                    // </div>
                    
                }
            </div>

            :

            <div style={{textAlign:'center'}}>
                <h3>No content available...</h3>
            </div>

        }
        
        <div className="hide-nav"></div>

    </div>
  );
};

export default IFrame;