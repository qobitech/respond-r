import React, { useReducer, useState, useEffect } from "react";
import JoyRide, { ACTIONS, EVENTS, STATUS } from "react-joyride";
import { useModalWithArg } from "hooks/useModal";
import { IAppState } from "interfaces/IAppState";
import { connect } from "react-redux";
import { IAuth } from "interfaces/IAuth";
import './index.scss';
import WelcomeSVG from "extras/images/WelcomeSVG";

interface IStateProps {
    auth: IAuth;
}

interface IDispatchProps {
}

interface IProps extends IStateProps, IDispatchProps{
	steps: Array<{
		target: string | HTMLElement;
		content: React.ReactNode;
		disableBeacon?: boolean;
	}>;
	showSkipButton?: boolean;
	continuous?: boolean;
	styles?: object;
};

const Tour = (props: IProps) => {
	const { steps, showSkipButton, auth } = props;
	const { loggedInDetails } = auth || {};
	const { user } = loggedInDetails || {};
	const { username = '', isFirstLogin = false } = user || {};
	const INITIAL_STATE = {
		key: new Date(),
		run: false,
		continuous: true,
		loading: false,
		stepIndex: 0,
		steps: steps
	};

	const reducer = (state = INITIAL_STATE, action: { type: string; payload?: any; }) => {
		switch (action.type) {
		case "START":
			return { ...state, run: true };
		case "RESET":
			return { ...state, stepIndex: 0 };
		case "STOP":
			return { ...state, run: false };
		case "NEXT_OR_PREV":
			return { ...state, ...action.payload };
		case "RESTART":
			return {
			...state,
			stepIndex: 0,
			run: true,
			loading: false,
			key: new Date()
			};
		default:
			return state;
		}
	};
	const [ modalViewed, setModalViewed ] = useState(false);

	const WelcomeMessage = () => {
		return(
			<div className='welcome-message'>
				<WelcomeSVG />
				<h2>Hello {username}</h2>
				<p>Welcome to your central database dashboard</p>
				<p>Click 'Start Tour' for a quick overview of the dashboard</p>
				<button onClick={() => {setValueFunc('welcomeModal', false); setModalViewed(true);}}>
					Start Tour
				</button>
			</div>
		)
	}

	const [tourState, dispatch] = useReducer(reducer, INITIAL_STATE);
	const [ setValueFunc, ModalComponent ] = useModalWithArg( [ <WelcomeMessage /> ], { welcomeModal: true }, [{}], () => setModalViewed(true) );

	useEffect(() => {
	  // Auto start the tour if the tour is not viewed before
	  if (!localStorage.getItem("tour") && modalViewed) {
		dispatch({ type: "START" });
	  }
	}, [modalViewed, isFirstLogin]);
  
	// Set once tour is viewed, skipped or closed
	const setTourViewed = () => {
	  localStorage.setItem("tour", "1");
	};

	interface ICallBackData {
		action: string;
		index: number;
		type: string;
		status: string;
	}
  
	const callback = (data: ICallBackData) => {
	  const { action, index, type, status } = data;
  
	  if (
		// If close button clicked, then close the tour
		action === ACTIONS.CLOSE ||
		// If skipped or end tour, then close the tour
		(status === STATUS.SKIPPED && tourState.run) ||
		status === STATUS.FINISHED
	  ) {
		setTourViewed();
		dispatch({ type: "STOP" });
	  } else if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
		// Check whether next or back button click and update the step.
		dispatch({
		  type: "NEXT_OR_PREV",
		  payload: { stepIndex: index + (action === ACTIONS.PREV ? -1 : 1) }
		});
	  }
	};
  
	const startTour = () => {
	  // Start the tour manually
	  dispatch({ type: "RESTART" });
	};

	return (
		<div className='user-onboarding'>
			<div className="start-tour">
				<button onClick={startTour}>
					<i className="fas fa-fingerprint"></i>
					Start tour
				</button>
			</div>
			<JoyRide
				{...tourState} 
				steps={steps} 
				continuous={true} 
				showSkipButton={showSkipButton}
				callback={callback}         
				styles={{
					tooltipContainer: {
						textAlign: "left",
						fontFamily: 'Montserrat',
					},
					buttonNext: {
						backgroundColor: "#1D2A3B"
					},
					buttonBack: {
						marginRight: 10
					}
				}} 
				locale={{
					last: "End tour"
				}}
			/>
			{isFirstLogin && ModalComponent}
		</div>
  	);
};

const mapStateToProps = (state: IAppState): IStateProps => ({
    auth : state.auth
});

const mapDispatchToProps: IDispatchProps = {
}

export default connect(mapStateToProps, mapDispatchToProps) ( Tour );