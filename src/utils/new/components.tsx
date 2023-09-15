import React from "react"
import traffic from "../../extras/images/animation/animation_llang3ye.json"
import { PRIMARY_COLOR } from "./constants"
import Lottie from "react-lottie"
import loaderGIF from "../../extras/images/loader.gif"

export const Loader = ({ loader }: { loader: boolean }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: traffic,
    backgroundColor: "transparent",
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  }
  return (
    <>
      {loader && (
        <div
          style={{
            position: "fixed",
            zIndex: 6,
            background: "#fff",
            top: 0,
            left: 0,
            opacity: 0.9,
            color: PRIMARY_COLOR,
            width: "100%",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              maxWidth: "222px",
              width: "90%",
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            className="mx-auto text-center d-flex flex-column align-items-center"
          >
            <Lottie options={defaultOptions} />
            {/* <div className="d-flex align-items-center">
              <img src={logo} alt="cdbs logo" style={{ height: "25px" }} />
            </div> */}
          </div>
        </div>
      )}
    </>
  )
}

export const Loader2 = ({ loader }: { loader: boolean }) => {
  return (
    <>
      {loader ? (
        <div>
          <img src={loaderGIF} alt="loader" />
        </div>
      ) : null}
    </>
  )
}
