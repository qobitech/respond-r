import React, { FC, useState } from 'react';
import SideBar from './sidebar';
import logo from 'extras/images/car_logo.jpg';
import { useLocation, useNavigate } from 'react-router';
import { IHttp } from 'interfaces/IHttp';
import { IAuth } from 'interfaces/IAuth';
import { IAppState } from 'interfaces/IAppState';
import { connect } from 'react-redux';
import { logOut } from 'store/actions';
import { url, pageName as pName } from 'enums/Route';
import { useModalWithArg } from 'hooks/useModal';
import UpdateOrg from '../organization/update-org';
import CTAContent from 'utils/cta-content';
import './index.scss';

interface IStateProps {
    auth : IAuth;
    http: IHttp;
}

interface IDispatchProps {
    logOut: () => void;
}

interface IProps extends IStateProps, IDispatchProps {};

const DashboardNav:FC<IProps> = (props) => {

    const { auth, logOut } = props;
    const { loggedInDetails } = auth || {};
    const { user } = loggedInDetails || {};
    const { username = '' } = user || {};
    const [ hamburgerClicked, setHamburgerClicked ] = useState(false);
    const [ showActions, setShowActions ] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const historyState = location!?.state;
    const pageName = historyState!?.pageName;

    const [ setValueFunc, ModalComponent ] = useModalWithArg( [ <UpdateOrg />, <></> ], { updateOrg: false } );

    return(
        <div className='complete-nav'>
            <SideBar hamburgerClicked={hamburgerClicked} setHamburgerClicked={setHamburgerClicked} />

            {hamburgerClicked && <div className="backdrop" onClick={() => setHamburgerClicked(false)}></div>}

            <div className='dashboard-nav'>
                <div className="logo-section">
                    <img src={logo} alt='.///' />
                </div>
                
                <div className="ham-title">
                    <div className='ham-container'>
                        <i className={hamburgerClicked ? 'fa fa-times' : 'fa fa-bars'} 
                            onClick={() => setHamburgerClicked(!hamburgerClicked)}>
                        </i>
                    </div>
                    <p className='dash-header'>{pageName!?.length > 0 ? pageName : pName.OVERVIEW}</p>
                </div>

                <div className="search">
                    <input type="search" placeholder='Search...' name='search' autoComplete='oops' />
                    <button>Search</button>
                </div>

                <div className="dashboard-icons">
                    <i className='fa fa-bell'></i>
                    
                    <CTAContent show={showActions} setShow={setShowActions}
                        content={
                            <div className='action-list'>
                                <h4>{username}</h4>
                                <p onClick={() => navigate(url.PROFILE, {state: {pageName: pName.PROFILE }})}>My Profile</p>
                                <p onClick={() => setValueFunc('updateOrg', true)}>Update Organization Information</p>
                                <p onClick={() => navigate(url.SUBSCRIPTION, {state: {pageName: pName.SUBSCRIPTIONS}})}>Manage Subscription</p>
                                <p onClick={() => logOut()}>Logout</p>
                            </div>
                        }
                    >
                        <div className='actions' onClick={() => setShowActions(!showActions)}>
                            <p>Actions</p>
                            <i className={showActions ? 'fa fa-angle-up': 'fa fa-angle-down'}></i>
                        </div>
                        
                    </CTAContent>
                </div>

            </div>
            {ModalComponent}
        </div>
    )
};

const mapStateToProps = (state: IAppState): IStateProps => ({
    auth: state.auth,
    http : state.http
});

const mapDispatchToProps: IDispatchProps = {
    logOut
}

export default connect(mapStateToProps, mapDispatchToProps) ( DashboardNav );