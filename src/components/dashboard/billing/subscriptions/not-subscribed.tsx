import React from "react"
import "./index.scss"
import SubscribedSVG from "extras/images/SubscribedSvg"

interface IProps {}

const NotSubscribed = (props: IProps) => {
  return (
    <div className="not-subscribed">
      <div className="heading">
        <SubscribedSVG />
        <h2>Let's set you up!</h2>
        <p>This will be the bundle your organization would be subscribed to</p>
        <p>You can always switch bundles later if you wish</p>
      </div>
    </div>
  )
}

export default NotSubscribed
