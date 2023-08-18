import React from "react"
import ButtonLoader from "./button-loader"
import "./index.scss"
import { CloseSVG } from "../svgs"

interface IButton extends React.ComponentPropsWithoutRef<"button"> {
  buttonType?: "bold" | "outlined" | "disabled" | "danger" | "active"
  buttonSize?: "small" | "medium" | "large" | "table"
  title: string
  load?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  close?: boolean
  status?: boolean
}

export const TypeButton = React.forwardRef(
  (
    { buttonType, buttonSize, title, load, onClick, ...props }: IButton,
    ref
  ) => {
    return (
      <div className="type-button">
        <button
          {...props}
          className={`${buttonType} ${buttonSize} ${props.className}`}
          ref={ref as React.LegacyRef<HTMLButtonElement> | undefined}
          onClick={load ? undefined : onClick}
        >
          {!load ? (
            <span>{title}</span>
          ) : (
            <ButtonLoader
              className={buttonType === "outlined" ? "bg-dark" : ""}
            />
          )}
        </button>
      </div>
    )
  }
)

export const TypeSmallButton = React.forwardRef(
  (
    {
      buttonType,
      buttonSize,
      title,
      load,
      onClick,
      close,
      status,
      ...props
    }: IButton,
    ref
  ) => {
    return (
      <div className="type-small-button">
        <button
          {...props}
          className={`${buttonType} ${buttonSize} ${props.className} ${
            status ? "status" : ""
          }`}
          ref={ref as React.LegacyRef<HTMLButtonElement> | undefined}
          onClick={load || status ? undefined : onClick}
          disabled={status || props.disabled}
        >
          {!load ? (
            <span>{close ? <CloseSVG /> : title}</span>
          ) : (
            <ButtonLoader
              className={buttonType === "outlined" ? "bg-dark" : ""}
            />
          )}
        </button>
      </div>
    )
  }
)
