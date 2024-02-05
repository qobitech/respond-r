import React from "react"
import "./index.scss"
import { MoonSVG, SunSVG } from "../svgs"
import { useGlobalContext } from "components/layout"

const Toggle = () => {
  const { theme, setTheme } = useGlobalContext()

  const handleChecked = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = target
    const themeColor = checked ? "dark" : "light"
    setTheme?.(themeColor)
    localStorage.setItem("theme", themeColor)
  }

  return (
    <div className="toggle" style={{ marginLeft: "auto" }}>
      <label className="switch">
        <input
          type="checkbox"
          className="switch-input"
          onChange={handleChecked}
          checked={theme === "dark"}
        />
        <div className="slider">
          <SunSVG />
          <MoonSVG />
        </div>
      </label>
    </div>
  )
}
export default Toggle
