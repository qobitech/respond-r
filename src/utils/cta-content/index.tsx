import  React from 'react';
import './index.scss';

interface IProps {
    content: JSX.Element
    children: JSX.Element;
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    className?: string
};

const CTAContent = (props: IProps) => {
    const { children, show = false, className, content, setShow } = props;

    return (
        <div className="overall-content">
            {show && <div className="screen" onClick={() => setShow(false)}></div>}
            <div>
                {children}
            </div>
            <div className={show ? `cta-content show ${className}` : `cta-content ${className}`} onClick={() => setShow(false)}>
                {content}
            </div>
        </div>
    )
};

export default CTAContent;