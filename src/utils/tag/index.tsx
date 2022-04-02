import React, { FC } from 'react';
// import loader from 'extras/images/loader/loader.svg';
import './index.scss';

interface IProps {
    color: string;
    content: string | JSX.Element;
};

const TagPill: FC<IProps> = (props) => {
    const { color = '', content } = props;

    return (
        <div className='tag-pill' style={{border:`1px solid ${color}`}}>
            {content}
        </div>
    )
};

export default TagPill;