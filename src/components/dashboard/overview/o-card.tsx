import  React from 'react';
import './o-card.scss';

interface ICComponent {
    title : string;
    stats : string;
    icon: string;
    color?: string;
}

export const CardComponent = ( props: ICComponent ) => {

    const { title = '', stats = '', icon = '', color = '' } = props

    return(
        <div className="o-card">
            <div className="icon-title">
                <i className={icon}></i>
                <p className="title">{title}</p>
            </div>
            <div className="stats">
                <h2 style={{color: color ? color : ''}}>{stats}</h2>
            </div>
        </div>
    )
};

export const OverviewCards: Array<ICComponent> = [
    {
        title: 'Active Users',
        stats: '24',
        icon: 'fa fa-user'
    },
    {
        title: 'Applications',
        stats: '10',
        icon: 'fa fa-shield-alt'
    },
    {
        title: 'Integrations',
        stats: '2',
        icon: 'fas fa-network-wired'
    },
];