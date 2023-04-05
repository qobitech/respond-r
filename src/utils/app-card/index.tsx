import  React from 'react';
import { useNavigate } from 'react-router-dom';
// import CTAContent from 'utils/cta-content';
import { pageName, url } from 'enums/Route';
import './index.scss';

interface IAppCard {
    id: number;
    title: string;
    description: string;
    date?: string;
}

const AppCard = (props: IAppCard) => {

    const { id = 0, title = '', description = '', date = '' } = props;
    const navigate = useNavigate();
    // const [ showActions, setShowActions ] = useState(false);

    return(
        <div className="app-card">
            
            {/* <CTAContent show={showActions} content={<p>boom</p>} setShow={setShowActions} >
                <i className="fa fa-ellipsis-v more-info" onClick={() => setShowActions(true)}></i>
            </CTAContent> */}
            <div onClick={() => navigate(url.APPLICATIONS + `/${id}`, {state: {pageName: pageName.APPLICATIONS}}) } className='app-body'>
                <h3>{title}</h3>
                <div className="desc-section">
                    <p className='desc-header'>Description</p>
                    <p className="desc">{description}</p>
                </div>
                <div className="date">
                    <i className="fa fa-calendar"></i>
                    <p>{new Date(date).toDateString()}</p>
                </div>
                <span className='view-ck'>Click card to view Client key and token</span>
            </div>
        </div>
    )
};

export default AppCard;


export const AppCards: Array<IAppCard> = [
    {
        id: 1,
        title: 'Application 1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        date: ''
    },
    {
        id: 2,
        title: 'Application 2',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        date: ''
    },
    {
        id: 3,
        title: 'Application 3',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        date: ''
    },
];