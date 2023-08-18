import React from "react"
import "./index.scss"

interface IProps {}

const Subscribed = (props: IProps) => {
  return (
    <div className="subscribed">
      <div className="select-another">
        <p className="another-bundle">
          Subscribe to another bundle
          <i className="fa fa-angle-right"></i>
        </p>
      </div>
    </div>
  )
}

export default Subscribed
