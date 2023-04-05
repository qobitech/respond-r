import React from 'react';
import Accordion from 'utils/accordion';
import { HowTo } from './how-to';
import './index.scss';
import Page from 'components/reusable/page';

const Instructions = ( ) => {

    return(
        <Page fitContent>
            <div className='instructions-main'>
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
            </div>         
        </Page>
    )
}

export default Instructions;