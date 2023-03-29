import React, { FC } from 'react';
import './index.scss';

type S = { title: string, action: () => void, className?: string, font?: string, isLoad: boolean, show?: boolean }
interface IProps {
    content: Array<S>;
    loading?: boolean;
}

const CTA = (props: IProps) => {
    const { content = [], loading = false } = props;
    return(
        <div className='cta-comp'>
            {
                content.map(({ title = '', action, className = '', font = '', isLoad = false, show = true }, index) => {
                    return(
                        show &&
                        <button onClick={ () => { action() }} className={className} key={index}>
                            {font!?.length > 0 && <i className={font}></i>}
                            {loading && isLoad ? 'Loading...': title}
                        </button>
                    )
                })
            }
        </div>
    )
}

export default CTA;