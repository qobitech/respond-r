import  React from 'react';
import './index.scss';
import loader from 'extras/images/loader/loader.svg';
import NoResultsSVG from 'extras/images/NoResultsSVG';

interface IProps {
    onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    style?: React.CSSProperties;
    position?: string;
    loading?: boolean;
};

const Refresh = (props: IProps) => {
    const { onClick, style, position, loading } = props;

    return (
        <div style={{ display:'flex', justifyContent: position, height:"40px" }}>
            {
            !loading ?
            <div onClick={onClick} style={{display:'flex', width:'max-content', alignItems:'center', cursor:'pointer', whiteSpace:'nowrap', margin:'1em 0'}}
                className='refresh'>
                <p style={{margin:'0', marginRight:'10px'}}>Refresh</p>
                <i className='fas fa-sync' style={{...style}}></i>
            </div>
            :
            <div style={{display:'flex', width:'max-content', alignItems:'center', cursor:'pointer', whiteSpace:'nowrap'}}>
                <p style={{margin:'0', marginRight:'10px'}}>Loading...</p>
                <img src={ loader } alt="loader" />
            </div>
            }
        </div>
    )
};

interface IToggle {
    onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    toggle: boolean;
    position?: string;
    optionA: string;
    optionB: string;
}

export const Toggle = (props: IToggle) => {
    const { onClick, toggle, position, optionA, optionB } = props;

    return (
        <div style={{ display:'flex', justifyContent: position }}>
            <p onClick={onClick} style={{cursor: 'pointer', color:'#5d77fc'}}>
                <i className={toggle? 'fa fa-toggle-on' : 'fa fa-toggle-off'} style={{marginRight:'.5em'}}></i>
                {toggle? optionA : optionB}
            </p>
        </div>
    )
};

interface IDownload {
    href: string;
    what?: string
}

export const Download = (props: IDownload) => {

    const { href, what } = props;

    return(
        <div>
            <a href={ href } download>Download { what }</a>
        </div>
    )
};

interface INoSearchResult {};

export const NoSearchResults = (props: INoSearchResult) => {

    return(
        <div className='no-result'>
            <NoResultsSVG />
            <p>No search results...</p>
        </div>
    )
};

export default Refresh;