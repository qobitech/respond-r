import React, { FC, ReactNode, useState } from "react";
import "./tooltip.scss";

interface IProps {
  content: JSX.Element;
  children: ReactNode;
  direction?: string;
  delay?: number;
}

const Tooltip : FC <IProps> = (props) => {

  const { delay, content, direction } = props

  let timeout : NodeJS.Timeout;
  let timein : NodeJS.Timeout;

  const [active, setActive] = useState(false);

  const showTip = () => {
    clearInterval(timein);
    timeout = setTimeout(() => {
      setActive(true);
    }, delay || 200);
  };

  const hideTip = () => {
    clearInterval(timeout);
    timein = setTimeout(() => {
      setActive(false);
    }, delay || 200);
    
  };

  return (
    <div className="Tooltip-Wrapper" onMouseEnter={showTip} onMouseLeave={hideTip} >
      	{props.children}
		{active &&
			<div style={{width:"max-content",height:"max-content", display:"flex", position:"relative"}}>
				<div className={`Tooltip-Tip tooltipContainer ${direction || "top"}`} onMouseEnter={showTip}>
					<div className="tooltipText" >
					{content}
					</div>
				</div>
				<div className={`Tooltip-Triad tooltipTriangle ${direction || "top"}`} onMouseEnter={showTip} />
			</div>
		}
    </div>
  );
};

export default Tooltip;