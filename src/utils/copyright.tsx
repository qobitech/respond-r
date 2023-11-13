import React from "react"

export const Copyright = () => {
  return (
    <div style={{ padding: ".2em 0" }}>
      {"Copyright © "}
      <span>Integrated Transport Database System</span>{" "}
      {new Date().getFullYear()}
      {"."}
    </div>
  )
}
