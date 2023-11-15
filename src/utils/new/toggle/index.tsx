import React, { useContext } from "react"
import "./index.scss"
import { MoonSVG, SunSVG } from "../svgs"
import { ThemeContext } from "contexts/theme-context"

const Toggle = () => {
  const { theme, setTheme } = useContext(ThemeContext)

  const handleChecked = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = target
    const themeColor = checked ? "dark" : "light"
    setTheme(themeColor)
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
