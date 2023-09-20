import React from "react"
import { useNavigate } from "react-router-dom"
import { url } from "enums/Route"
import "./index.scss"
import trafficlight from "../../../extras/images/animation/animation_lkc6o54t.json"
import cars from "../../../extras/images/animation/animation_lmophnr9.json"
import Lottie from "react-lottie"
import { TypeButton } from "utils/new/button"
import { ArrowRightSVG } from "utils/new/svgs"

const LandingPage = () => {
  const navigate = useNavigate()

  const defaultOptions = {
    loop: true,
    autoplay: true,
    backgroundColor: "transparent",
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  }

  return (
    <>
      <div className="landing-page">
        <div className="container">
          <div className="hero-section">
            <div className="left-section">
              {/* <p className="tag">RESPOND-R</p> */}
              <h1>RESPOND-R</h1>
              <p>
                Seamlessly retrieve real-time live streams of traffic through
                RTSP data
              </p>
              <div className="cta">
                <TypeButton
                  title="GET STARTED"
                  onClick={() => navigate(url.REGISTER)}
                />
              </div>
            </div>
            <div className="lottie-container">
              <Lottie options={{ ...defaultOptions, animationData: cars }} />
            </div>
          </div>
        </div>
        {/* <div className="about">
          <div className="container">
            <div className="about-content">
              <div>
                <div className="lottie-2-container">
                  <Lottie
                    options={{ ...defaultOptions, animationData: cars }}
                  />
                </div>
              </div>
              <div>
                <p className="tag">ABOUT</p>
                <p>
                  RespondR is a cutting-edge web solution, designed to empower
                  law enforcement agencies: a dynamic platform that seamlessly
                  retrieves real-time live streams of traffic offenders through
                  RTSP data, revolutionizing the way police access critical
                  information..
                </p>
                <div className="cta">
                  <TypeButton
                    title="GET STARTED"
                    onClick={() => navigate(url.REGISTER)}
                  />
                  <div className="other_btn">
                    <p>LEARN MORE</p>
                    <div>
                      <ArrowRightSVG />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  )
}

export default LandingPage
