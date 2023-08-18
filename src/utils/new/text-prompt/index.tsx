import React from "react"
import { useNavigate } from "react-router-dom"
import "./index.scss"
import { CheckSVG, InfoSVG } from "../svgs"

interface ITP {
  prompt: string
  status?: boolean
  noStatus?: boolean
  url?: string
  underline?: boolean
  iconPosition?: "left" | "right"
}

const TextPrompt: React.FC<ITP> = ({
  prompt,
  status,
  noStatus,
  url,
  underline,
  iconPosition,
}) => {
  const navigate = useNavigate()
  return (
    <div className="text-prompt">
      {prompt && (
        <p
          className={`${noStatus ? "" : status ? "success" : "danger"} ${
            url ? "cursor-pointer" : ""
          }`}
          style={{ textDecoration: url && underline ? "underline" : "" }}
          onClick={() => {
            if (url) navigate(url)
          }}
        >
          {iconPosition === "left" ||
            (!iconPosition && (
              <span>
                <IconComponent status={status} />
                &nbsp;&nbsp;
              </span>
            ))}
          {prompt}
          {iconPosition === "right" && (
            <span>
              &nbsp;&nbsp;
              <IconComponent status={status} />
            </span>
          )}
        </p>
      )}
    </div>
  )
}

const IconComponent = ({ status }: { status?: boolean }) => {
  return (
    <span>
      {!status ? (
        <InfoSVG width="10" height="10" color="#F56E9D" />
      ) : (
        <CheckSVG width="10" height="10" color="#0F9979" />
      )}
      &nbsp;&nbsp;
    </span>
  )
}

export default TextPrompt
