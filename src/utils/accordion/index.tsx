import React, { FC, useState } from 'react';
import './index.scss';

interface IAccordion {
    title: string;
    content: JSX.Element | Array<string | JSX.Element>;
    index: number;
    icon? : string;
};

const Accordion:FC<IAccordion> = ( props ) => {

    const { title, content, index } = props
    const [openTray, setTray] = useState(false);

    return(
        <div className='main-accordion'>

            <div className={`accordion ${openTray && 'expanded'}`}>

                <div className='header' onClick={() => setTray(!openTray)}>
                    <p className="title">{index + 1}. {title}</p>
                    <i className={ `icon ${openTray ? "fas fa-minus" : "fas fa-plus"}`} />
                </div>

                {openTray && 
                    
                    <div className='content'>
                        {Array.isArray(content) ?
                            <ul>
                                {
                                    content!?.map((item, index) => {
                                        return(
                                            typeof item === 'string' ?
                                            <li key={index}>
                                                {item}
                                            </li>
                                            :
                                            <>{item}</>
                                        )
                                    })
                                }
                            </ul>
                            :
                            content
                        }
                    </div>
                }

            </div>     
        </div>
    )
};

export default Accordion;