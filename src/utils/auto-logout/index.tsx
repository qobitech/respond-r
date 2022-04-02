import React, { useState, useEffect, useRef } from 'react';
import { IAuth } from 'interfaces/IAuth';
import Modal from '../modal';
import './index.scss';
import { useStrictLoader } from 'hooks/useStrictLoader';
import { ActionEnums } from 'enums/ActionEnums';

const SessionTimeout = ( auth: IAuth, logOutauth: () => void, getRefreshToken: (data: object) => void ) => {

	// const [second, setSecond] = useState(0);
	const [isOpen, setOpen] = useState(false);
	const { refreshToken, authenticated = false, loading = false } = auth || {};
    const { tokenExpiryDate = '', accessToken = '', refreshToken: rT = '' } = refreshToken || {};
    let isLoad = useStrictLoader( 'Token Refresh', ActionEnums.TOKEN_REFRESH );

	// let startTimerInterval = useRef<any>();
	let warningInactiveInterval = useRef<any>();
  
    // warning timer
    let warningInactive = (timeString: string) => {
    //   clearTimeout(startTimerInterval.current);
  
      	warningInactiveInterval.current = setInterval(() => {
  
        const diff = new Date(timeString).getTime() - new Date().getTime();
        const minLeft = Math.round(diff / 60000);
        // const leftSecond = new Date(diff).getSeconds();
  
        if (minLeft === 1 ) {
    	  	setOpen(true);
        }
  
        if (minLeft <= 0) {
          	clearInterval(warningInactiveInterval.current);
			setOpen(false);
			sessionStorage.removeItem('lastTimeStamp');
			logOutauth();
        }
      }, 1000);
    };
  
    //handle close popup
    const handleClose = () => {
    	setOpen(false);
    };
  
    useEffect(() => {
		if(authenticated) {
			warningInactive(tokenExpiryDate);
		}
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tokenExpiryDate, authenticated]);
  
	if (!isOpen) {
		return null;
	};

	const handleRefresh = () => {
		getRefreshToken({ token: accessToken, refreshToken: rT})
	}
    
    const OurModal = 
		<Modal show={true} handleClose={handleClose}> 
			<div className='logout-prompt'>
				<h3>The current session would end soon</h3>
				<p>Click 'Continue' to continue working</p>
				<div className="lg-btn">
					<button onClick={handleRefresh}>
            {
              loading && isLoad ?
                'Loading...'
                :
                'Continue'
            }
          </button>
				</div>
			</div>
		</Modal>
    // change fragment to modal and handleclose func to close
    return [OurModal];
  };

export default SessionTimeout;