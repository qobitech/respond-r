import  React from 'react';
// import loader from 'extras/images/loader/loader.svg';
import './index.scss';

interface IProps {
    color: string;
    content: string | JSX.Element;
};

const TagPill = (props: IProps) => {
    const { color = '', content } = props;

    return (
        <div className='tag-pill' style={{border:`1px solid ${color}`}}>
            {content}
        </div>
    )
};

export default TagPill;