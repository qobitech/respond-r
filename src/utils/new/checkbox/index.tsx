import React from "react"
import TextPrompt from "../text-prompt"
import "./index.scss"

interface IInput extends React.ComponentPropsWithoutRef<"input"> {
  label?: string
  error?: string | undefined
  children?: any
}

// eslint-disable-next-line react/display-name
export const TypeCheckbox = React.forwardRef(
  ({ label, error, children, ...props }: IInput, ref) => {
    return (
      <div className="type-checkbox">
        <div className="form-container">
          {label && <label htmlFor={props.id || props.name}>{label}</label>}
          <div className="checkbox-content">
            <input
              {...props}
              ref={ref as React.LegacyRef<HTMLInputElement> | undefined}
              type="checkbox"
            />
            {children}
          </div>
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
