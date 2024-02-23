import React, { FC } from "react"
import "./footer.scss"

const Footer: FC = () => {
  return (
    <div className={"footer_main"}>
      <div style={{ padding: ".2em 0" }}>
        {"Copyright © "}
        <span>Integrated Transport Database System</span>{" "}
        {new Date().getFullYear()}
        {"."}
      </div>
    </div>
  )
}

export default Footer
