import React from "react"
import { useNavigate } from "react-router-dom"
import { url } from "enums/Route"
import "./index.scss"
import cars from "../../../extras/images/animation/animation_lmophnr9.json"
import Lottie from "react-lottie"
import { TypeButton } from "utils/new/button"

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

  const events = [
    "Traffic Report",
    "Police Emergency",
    "Fire Outbreak",
    "Medical Emergency",
  ]

  return (
    <>
      <div className="landing-page">
        <div className="container">
          <div className="hero-section">
            <div className="left-section">
              <h1>RESPOND-R</h1>
              <p>
                Engage in immediate communication responses and handle events in
                real-time as they unfold.
              </p>
              <div className="events">
                {events.map((i, index) => (
                  <div key={i} className="event-item">
                    <p>{i}</p>
                    {events.length - 1 !== index ? (
                      <div className="separator" />
                    ) : null}
                  </div>
                ))}
              </div>
              <div className="cta">
                <TypeButton
                  title="GET STARTED"
                  onClick={() => navigate(url.LOGIN)}
                />
              </div>
            </div>
            <div className="lottie-container">
              <Lottie options={{ ...defaultOptions, animationData: cars }} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LandingPage
