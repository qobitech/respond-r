import React from "react"
import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form"
import { TypeInput } from "../input"
import TypePhoneInput from "../phone-input"
import { TypeSelect } from "../select"
import { TypeTextArea } from "../text-area"
import { TypeCheckbox } from "../checkbox"

export type typecomponent =
  | "input"
  | "phone"
  | "select"
  | "text-area"
  | "radio"
  | "check-box"

interface ISelectOptions {
  id: number
  label: string
  value: string | number
}

export interface IFormComponent {
  id: string
  label: string
  placeHolder: string
  type: string
  component: typecomponent
  initOptions?: ISelectOptions
  optionData?: ISelectOptions[]
  text?: string
  cta?: {
    text: string
    link: string
    type: "external" | "internal"
  }
}

interface IFormBuilder<T extends FieldValues> {
  formComponent: IFormComponent[]
  hookForm: UseFormReturn<T, any>
}

const FormBuilder = <T extends FieldValues>({
  formComponent,
  hookForm,
}: IFormBuilder<T>) => {
  return (
    <>
      {formComponent.map((i) => (
        <div key={i.id}>
          {i.component === "input" && (
            <TypeInput
              {...hookForm.register(i.id as Path<T>)}
              label={i.label}
              placeholder={i.placeHolder}
              type={i.type}
              error={
                hookForm.formState.errors?.[i.id as Path<T>]?.message as string
              }
            />
          )}
          {i.component === "phone" && (
            <TypePhoneInput
              {...hookForm.register(i.id as Path<T>)}
              label={i.label}
              placeholder={i.placeHolder}
              handleOnChange={(phone) => {
                hookForm.setValue(
                  i.id as Path<T>,
                  phone as PathValue<T, Path<T>>
                )
              }}
              type={i.type}
              error={
                hookForm.formState.errors?.[i.id as Path<T>]?.message as string
              }
              value={hookForm.watch(i.id as Path<T>)}
            />
          )}
          {i.component === "select" && (
            <TypeSelect
              {...hookForm.register(i.id as Path<T>)}
              initoption={i.initOptions as ISelectOptions}
              optionsdata={i.optionData as ISelectOptions[]}
              customwidth={"100%"}
              label={i.label}
              error={
                hookForm.formState.errors?.[i.id as Path<T>]?.message as string
              }
            />
          )}
          {i.component === "text-area" && (
            <TypeTextArea
              {...hookForm.register(i.id as Path<T>)}
              placeholder={i.placeHolder}
              label={i.label}
              error={
                hookForm.formState.errors?.[i.id as Path<T>]?.message as string
              }
            />
          )}
          {i.component === "check-box" && (
            <TypeCheckbox
              {...hookForm.register(i.id as Path<T>)}
              error={
                hookForm.formState.errors?.[i.id as Path<T>]?.message as string
              }
            />
          )}
          {i.component === "radio" && (
            <TypeTextArea
              {...hookForm.register(i.id as Path<T>)}
              placeholder={i.placeHolder}
              label={i.label}
              error={
                hookForm.formState.errors?.[i.id as Path<T>]?.message as string
              }
            />
          )}
        </div>
      ))}
    </>
  )
}

export default FormBuilder
