import React from "react"
import InputPhone from "react-phone-input-2"
import "react-phone-input-2/lib/bootstrap.css"
import "./index.scss"
import TextPrompt from "../text-prompt"

interface IInput extends React.ComponentPropsWithoutRef<"input"> {
  label?: string
  error?: string | undefined
  customwidth?: string | number
  handleOnChange?: (phone: string) => void
}

const TypePhoneInput = React.forwardRef(
  ({ label, error, handleOnChange, customwidth, ...props }: IInput, ref) => {
    return (
      <div className="type-phone-input">
        <div className="form-container">
          {label && <label htmlFor={props.id || props.name}>{label}</label>}
          <InputPhone
            country={"eg"}
            enableSearch={true}
            {...props}
            value={(props.value || "") as string}
            onChange={handleOnChange}
            inputClass={`${error ? "is-error" : null} ${props.className || ""}`}
            inputStyle={props.style}
          />
          {!!error && (
            <div className="div-error">
              <TextPrompt prompt={error} status={false} />
            </div>
          )}
        </div>
      </div>
    )
  }
)

export default TypePhoneInput
