import React, { FC } from "react"
import { useNavigate } from "react-router-dom"
import { getOverview } from "enums/Route"
// import trafficlightimg from '../../extras/images/payment4.jpg'

const Page404: FC = () => {
  const navigate = useNavigate()

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
        backgroundImage: `url(${""})`,
        backgroundSize: "contain",
      }}
    >
      <div
        style={{
          background: "#000",
          opacity: 0.8,
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
        }}
      />

      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2,
          position: "relative",
        }}
      >
        <h2
          style={{
            fontSize: "5em",
            fontWeight: 700,
            marginBottom: "25px",
            color: "#fff",
          }}
        >
          404
        </h2>
        <p style={{ color: "#fff" }}>
          Oops, looks like you're in the wrong place
        </p>
        <div
          style={{
            marginTop: "70px",
            width: "max-content",
            margin: "35px auto 0",
          }}
        >
          <button
            style={{ background: "yellow", fontWeight: 600 }}
            onClick={() => navigate(getOverview())}
          >
            Go To Home Page
          </button>
        </div>
      </div>
    </div>
  )
}

export default Page404
