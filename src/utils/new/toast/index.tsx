import React from "react"
import "./index.scss"
import { CheckSVG } from "../svgs"

interface IHN {
  notice: string
  status: boolean
}

const Toast: React.FC<IHN> = ({ notice, status }) => {
  return (
    <>
      {notice ? (
        <div
          className={`toast-container ${status ? "success" : ""}`}
          style={{ width: "100%" }}
        >
          <CheckSVG color="#fff" />
          <p>{notice}</p>
        </div>
      ) : null}
    </>
  )
}

export default Toast
