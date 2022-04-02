import React, { FC } from 'react';
import Accordion from 'utils/accordion';
import { HowTo } from './how-to';
import Navbar from 'components/landing/navbar';
import Footer from 'components/landing/footer';
import './index.scss';

const Instructions: FC = ( ) => {

    return(
        <div className='instructions-main'>
            <Navbar />
            <div className='instructions-page'>
                <div className='header'>
                    <h2>How to...</h2>
                </div>
                <div className='instructions'>
                    {
                        HowTo!?.map((data, index) => {
                            const { howTo = [], title = '' } = data || {}
                            return(
                                <Accordion content={howTo} title={title} key={index} index={index} />
                            )
                        })
                    }
                </div>
            </div>  
            <Footer />
        </div>         
    )
}

export default Instructions;