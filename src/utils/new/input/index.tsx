import React from "react"
import TextPrompt from "../text-prompt"
import "./index.scss"

interface IInput extends React.ComponentPropsWithoutRef<"input"> {
  label?: string
  error?: string | undefined
}

// eslint-disable-next-line react/display-name
export const TypeInput = React.forwardRef(
  ({ label, error, ...props }: IInput, ref) => {
    return (
      <div className="type-input">
        <div className="form-container">
          {label && <label htmlFor={props.id || props.name}>{label}</label>}
          <input
            {...props}
            ref={ref as React.LegacyRef<HTMLInputElement> | undefined}
            className={error ? "is-error" : ""}
          />
          {!!error && (
            <>
              <TextPrompt prompt={error} status={false} />
            </>
          )}
        </div>
      </div>
    )
  }
)
