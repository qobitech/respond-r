import React, { FC, useEffect } from 'react'
import { connect } from 'react-redux';
import { IHttp } from 'interfaces/IHttp';
import { IAppState } from 'interfaces/IAppState';
import CreateUser from 'components/dashboard/user-management/create_upd-user';
import CTA from 'utils/cta';
import { checkIfNull } from 'utils/helpers';
import { useModalWithArg } from 'hooks/useModal';
import { IAuth } from 'interfaces/IAuth';
import DashboardWrapper from 'components/dashboard/dashboardwrapper';
import ChangePassword from './changePassword';
import './index.scss';

interface IStateProps {
	http: IHttp;
    auth: IAuth;
}

interface IDispatchProps {
}

interface IProps extends IStateProps, IDispatchProps { }

const UserProfile:FC<IProps> = ( props ) => {

    const { auth } = props;
    const { loggedInDetails, loading = false } = auth;
    const { user } = loggedInDetails || {};
    const { firstName = '', lastName = '', username = '', organizationName = '', middleName = '', phoneNumber = '', email = '',  } = user || {};
    const values = Object.values({ username, firstName, lastName, middleName, email, phoneNumber, organizationName });

    const content = [ 
        {title:'Update Information', action: ()=> setValueFunc('createUser', true), font: 'fa fa-edit', isLoad: false  },
        {title:'Change Password', action: ()=> setValueFunc('changePassword', true), font: 'fa fa-edit', isLoad: false  }
    ];

    const [ setValueFunc, ModalComponent ] = useModalWithArg( 
        [ <CreateUser update prevUser={user} />, <ChangePassword/> ], { createUser: false, changePassword: false } );

    const refresh = () => {
        console.log('profile')
    }

    useEffect(() => {
        refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return(
        <DashboardWrapper loading={false}>
            <div className="profile-container">

                <div className="profile-cta" >
                    <i className="fa fa-user prof"></i>
                    <div className='cta' >
                        <CTA content={content} loading={loading}/> 
                    </div>

                </div>

                <h2>Welcome {firstName}</h2>

                <div className="profile-content-wrapper" >
                    { Object.keys( { username, firstName, lastName, middleName, email, phoneNumber, organizationName } )
                    .map( ( item, index ) => {
                        return(
                            checkIfNull(values[index]) && 
                            <div className="content-card" key={ index }>
                                <p className="card-label">{ item }</p>

                                <p className="card-text">{ values[index] }</p>
                            </div>
                        )
                    } )}
                </div>
                {ModalComponent}
            </div>
        </DashboardWrapper>
    )
};

const mapStateToProps = (state: IAppState): IStateProps => ({
	auth: state.auth,
	http: state.http
});

const mapDispatchToProps: IDispatchProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);