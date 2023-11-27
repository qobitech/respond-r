import React from "react"
import TextPrompt from "../text-prompt"
import "./style.scss"

interface ISelect extends React.ComponentPropsWithoutRef<"select"> {
  label?: string
  error?: string | undefined
  optionsdata?: Array<{
    id: number | string
    label: string
    value: string | number
    hide?: boolean
  }>
  initoption: { label: string; value: string | number }
  customwidth?: string | number
  load?: boolean
  disableInit?: boolean
  cta?: {
    title: string
    action: () => void
    icon: string
  }
}

// eslint-disable-next-line react/display-name
export const TypeSelect = React.forwardRef(
  (
    {
      label,
      error,
      optionsdata,
      initoption,
      load,
      disableInit,
      cta,
      ...props
    }: ISelect,
    ref
  ) => {
    return (
      <div className="type-select" style={{ width: props.customwidth || "" }}>
        <div className="form-container">
          {label && <label htmlFor={props.id || props.name}>{label}</label>}
          <select
            {...props}
            ref={ref as React.LegacyRef<HTMLSelectElement> | undefined}
            className={error ? "is-error" : ""}
          >
            <option disabled={disableInit} value={initoption.value}>
              {initoption.label}
            </option>
            {optionsdata
              ?.filter((i) => !i.hide)
              ?.map((i) => (
                <option key={i.id} value={i.value}>
                  {i.label}
                </option>
              ))}
          </select>
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
