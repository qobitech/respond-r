import React from "react"
import { useNavigate } from "react-router-dom"
import { url } from "enums/Route"
import "./index.scss"
import cars from "../../../extras/images/animation/Animation - 1707465062653.json"
import Lottie from "react-lottie"
import { TypeButton } from "utils/new/button"
import {
  FireExtinguisherSVG,
  MedicalSVG,
  PoliceSVG,
  TrafficSVG,
} from "utils/new/svgs"

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
    { title: "TrafficWardens", logo: <TrafficSVG /> },
    { title: "Police", logo: <PoliceSVG /> },
    { title: "FireFighters", logo: <FireExtinguisherSVG /> },
    { title: "Medics", logo: <MedicalSVG /> },
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
                  <div key={i.title} className="event-item">
                    <div className="event-item-wrapper">
                      {i.logo}
                      <p>{i.title}</p>
                    </div>
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
