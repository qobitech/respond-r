import React, { FC, useState, useEffect, useLayoutEffect } from "react";
import "./index.scss";

interface IProps {
	trigger: boolean;
	content: JSX.Element;
	reference?: React.MutableRefObject<any>
}

const Prompt: FC<IProps> = (props) => {

	const { trigger, content, reference } = props;
	const [showPrompt, setShowPrompt] = useState(trigger);
	const [referenceEl, setReferenceEl] = React.useState(0);

	useLayoutEffect(() => {
		function updatePosition() {
			setReferenceEl(() => reference?.current && reference.current.getBoundingClientRect().top);
		}
		window.addEventListener('resize', updatePosition);
		updatePosition();
		return () => window.removeEventListener('resize', updatePosition);
	}, [reference, referenceEl]);

	useEffect(() => {
		if(trigger){
			if(!showPrompt){
				let showP: NodeJS.Timeout
				showP = setTimeout(() => {
					setShowPrompt(true)
				}, 1800000)

				return(() => {
					clearTimeout(showP)
				})
			}
		}
	}, [trigger, showPrompt])

	const togglePrompt = () => {
		setShowPrompt(showPrompt => !showPrompt)
	}
	
	return (
		trigger ?
		<>
			{showPrompt ?
				<div className={`prompt-wrapper ${showPrompt ? 'open' : 'close'}`} 
					style={{ top: referenceEl ? referenceEl : '8vh', 
						right: referenceEl ? undefined : 0, 
						position: referenceEl ? 'absolute': 'fixed' 
					}}
				>
					<div className="content" >
						{content}
					</div>
					<div className="close-prompt" onClick={togglePrompt}>
						<button>Close</button>
					</div>
				</div>
				:
				<div className="prompt-baby" onClick={togglePrompt} 
					style={{ top: referenceEl ? referenceEl : '8vh', 
						right: referenceEl ? undefined : 0, 
						position: referenceEl ? 'absolute': 'fixed' 
					}}
				>
					<i className="fa fa-info-circle" ></i>
				</div>
			}
		</>
		:
		<></>
	);
};

export default Prompt;