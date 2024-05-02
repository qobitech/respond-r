import React, { useEffect } from "react"
import "./index.scss"
import { CheckSVG, CloseSVG } from "../svgs"

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

export interface ISideToast {
  show: boolean
  notice: string
  status: boolean
}
export interface ISideToastComp {
  sideToast: ISideToast
  setSideToast: (data: ISideToast) => void
}

export const SideToast: React.FC<ISideToastComp> = ({
  sideToast,
  setSideToast,
}) => {
  const { notice, show, status } = sideToast

  const resetSideToast = () => {
    setSideToast({ notice: "", status: false, show: false })
  }

  useEffect(() => {
    let timeOut: NodeJS.Timeout
    if (notice)
      timeOut = setTimeout(() => {
        resetSideToast()
      }, 2000)

    return () => {
      clearTimeout(timeOut)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notice])

  return (
    <div
      className={`side-toast-container ${status ? "success" : ""} ${
        show ? "menuopen" : "menuclose"
      } rounded`}
    >
      <div className="side-toast-container-content gap-10">
        <div className="side-toast-close">
          <div
            className="side-toast-close-content rounded"
            onClick={resetSideToast}
          >
            <CloseSVG />
          </div>
        </div>
        <CheckSVG />
        <p className="m-0 text-small">
          {notice || "Asset assigned successfully"}
        </p>
      </div>
    </div>
  )
}
