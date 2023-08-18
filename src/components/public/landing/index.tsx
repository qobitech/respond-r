import React from "react"
import { useNavigate } from "react-router-dom"
import { url } from "enums/Route"
import "./index.scss"
import trafficlight from "../../../extras/images/animation/animation_lkc6o54t.json"
import cars from "../../../extras/images/animation/animation_lkc5qgue.json"
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
            <div>
              <p className="tag">INTEGRATED TRANSPORT DATABASE SYSTEM</p>
              <h1>
                One-Stop Access To Managing Your{" "}
                <span>Traffic Management Applications</span>
              </h1>
              <div className="cta">
                <TypeButton
                  title="REGISTER NOW"
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
            <div className="lottie-container">
              <Lottie
                options={{ ...defaultOptions, animationData: trafficlight }}
              />
            </div>
          </div>
        </div>
        <div className="about">
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
                <p className="tag">YOUR PERSONALIZED DASHBOARD</p>
                <h2>Manage Your Application Empire</h2>
                <h6>Track your user management and application progress</h6>
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
        </div>
      </div>
    </>
  )
}

export default LandingPage
