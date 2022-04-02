import React, { FC } from 'react'
import { separator, checkIfNull, checkIfUrl } from 'utils/helpers';

type S = {sectionHeader : string, type : 'image' | 'no-image', moreDetails? : {[key: string]: any}, moreDetailsArray? : {[key: string]: any}[], CTA?: JSX.Element, cImages?: Array<string> }[]

export const useMoreDetailsSection = ( Component : FC<{}>, parentArg : {}, ...mdProps : S ) => {
    return [
        <Component { ...parentArg } >
            {mdProps.map(( { sectionHeader, moreDetails, moreDetailsArray, CTA, cImages }, index ) => {
                return (
                    <div className='more-details' key={ index }>

                        {sectionHeader.length > 0 &&
                            <div className={`section-header ${sectionHeader.length === 0 ? '' : 'bb'}`}>
                                <p>{sectionHeader}</p>
                                <div className='cta'>
                                    {CTA}
                                </div>
                            </div>
                        }

                        <div className="flex-wrapper">
                            {moreDetails !== undefined && moreDetails !== null && Object.keys( moreDetails ).map( ( item, index ) => { 
                                return(
                                    checkIfNull(moreDetails[item]) &&
                                    <div className="content-card" key={ index }>
                                        <p className="card-label">{ separator( item) }</p>
                                        {checkIfUrl(moreDetails[item]) ? 
                                            <a className="card-text" 
                                                href='# ' onClick={() => window.open(moreDetails![ item ] , '', 'width=1024, height=786')}>
                                                { moreDetails![ item ] }
                                            </a> 
                                            :
                                            typeof moreDetails[ item ] === 'string' ?
                                            <p className="card-text">{ moreDetails[ item ] }</p>
                                            :
                                            <div className="card-text">{ moreDetails[ item ] }</div>
                                        }
                                    </div>
                                )
                            } )}
                        </div>
                        
                    </div>
                )
            })}
        </Component>
    ]
}