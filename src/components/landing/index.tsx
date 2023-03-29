import React, { FC } from 'react';
import Navbar from './navbar';
import Footer from './footer';
import { useNavigate } from 'react-router-dom';
import { url } from 'enums/Route';
import './index.scss';
import DashboardInterfaceSVG from 'extras/images/DashboardInterface';

const LandingPage = () => {

    const navigate = useNavigate();

    return(
        <div>
            <Navbar />
            <div className="landing-page">
                <div className='hero-section'>
                    <div className="left-hero">
                        <p className='intro-title'>integrated transport database system</p>
                        <h1>
                            ONE-STOP ACCESS TO MANAGING YOUR TRAFFIC MANAGEMENT APPLICATIONS
                        </h1>
                        <button onClick={() => navigate(url.REGISTER)}>
                            Register Now
                        </button>
                    </div>

                    <div className="right-hero">
                    </div>
                </div>

                <div className="second-section">
                    <div className="left-ss">
                        <DashboardInterfaceSVG />

                    </div>
                    <div className="right-ss">
                        <p className="intro-title">your personalized dashboard</p>
                        <h1>Manage your application empire</h1>
                        <p>Track your user management and application progress.</p>
                        <p className="get-started" onClick={() => navigate(url.REGISTER)}>
                            Get Started <span><i className='fa fa-angle-right'></i></span>
                        </p>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    )
};

export default LandingPage;