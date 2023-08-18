import React, { FC } from "react"
import { Copyright } from "../../utils/copyright"
import "./footer.scss"

const Footer: FC = () => {
  return (
    <div className={"footer_main"}>
      <Copyright />
    </div>
  )
}

export default Footer
