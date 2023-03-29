import React, { useState } from 'react';
// import pic_icon from '../../extras/images/icons/imageicon.svg'
// import vid_icon from '../../extras/images/icons/play-button.svg';
import { checkIfVid } from '../helpers';
import DownloadFeature from '../download-feature'
import './index.scss';


interface IProps {
    images: Array<string>;
}

const Carousel = (props: IProps) => {

    const { images = [] } = props;
    const [ index, setIndex ]= useState(0);
    var currVid = images![index]!?.replace('upload','upload/q_auto:low');

    return(
        <div className='main-carousel'>

            {index > 0 && 
                <div className='left-arrow' onClick={() => setIndex(index-1)}>
                    <i className='fa fa-arrow-left'></i>
                </div>
            }

            <div className='image'>
                {checkIfVid(images[index])?
                    <video controls>
                        <source src={currVid} />
                    </video>
                    :
                    <img src={images[index]} alt='carousel-img'/>
                }
                
                {/* <p className="image-info">{index+1}</p> */}

                <div className="download-container">
                    <DownloadFeature type="small" image={images[index]} />
                    {images.length > 1 &&
                    <>
                        <div className="space"/>
                        <DownloadFeature type="small" multiple imageArray={images} />
                    </>}
                </div>
                
            </div>

            { images!?.length > 0 && index < images!?.length - 1 &&
                <div className='right-arrow' onClick={() => setIndex(index+1)}>
                <i className='fa fa-arrow-right'></i>
            </div>
            }

        </div>
    )
};

export default Carousel;
