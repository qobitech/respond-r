import React, { useEffect } from "react"
import "./index.scss"
import { IStates } from "interfaces/IReducer"
import { IAction } from "interfaces/IAction"
import { TypeButton, TypeSmallButton } from "utils/new/button"
import FormBuilder, { IFormComponent } from "utils/new/form-builder"
import * as yup from "yup"
import { useFormHook } from "utils/new/hook"
import { IOrganization } from "interfaces/IOrganization"

interface IProps {
  states?: IStates
  actions?: IAction
  update?: boolean
  organization?: IOrganization | null
}

export interface ICreateOrganizationHookForm {
  email: string
  address: string
  organizationName: string
  state: string
  phoneNumber: string
}

export const createOrganizationSchema = {
  email: yup.string().email().required("email is required"),
  address: yup.string().required("address is required"),
  organizationName: yup.string().required("Organization name is required"),
  state: yup.string().required("state is required"),
  phoneNumber: yup.string().required("phone number is required"),
}

const CreateOrganization: React.FC<IProps> = ({
  states,
  actions,
  update,
  organization,
}) => {
  const filterOnUpdate = (i: IFormComponent) =>
    update ? i.id !== "password" && i.id !== "confirmPassword" : i
  const createOrganizationFC: IFormComponent[] = [
    {
      id: "email",
      label: "Email Address",
      placeHolder: "Enter email address",
      type: "text",
      component: "input",
    },
    {
      id: "address",
      label: "Address",
      placeHolder: "Enter address",
      type: "text",
      component: "input",
    },
    {
      id: "organizationName",
      label: "Organization Name",
      placeHolder: "Enter organization name",
      type: "text",
      component: "input",
    },
    {
      id: "phoneNumber",
      label: "Phone Number",
      placeHolder: "Enter phone number",
      type: "text",
      component: "phone",
    },
    {
      id: "state",
      label: "State",
      placeHolder: "Enter state",
      type: "text",
      component: "input",
    },
  ]
  const [hookForm] = useFormHook<ICreateOrganizationHookForm>(
    createOrganizationSchema
  )

  useEffect(() => {
    // if (!apiScopes?.issucessFul) actions?.getAPIScopes()
    if (update) {
      hookForm.setValue("email", organization?.email || "")
      hookForm.setValue("phoneNumber", organization?.phoneNumber || "")
      hookForm.setValue("organizationName", organization?.state || "")
      hookForm.setValue("state", organization?.state || "")
      hookForm.setValue("address", organization?.address || "")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <form className="app-form">
      <div className="form-content fm-separator">
        <FormBuilder
          formComponent={createOrganizationFC.filter(filterOnUpdate)}
          hookForm={hookForm}
        />
      </div>
      <div className="cta">
        <TypeButton title={update ? "UPDATE" : "CREATE"} />
        <TypeSmallButton title="Cancel" buttonType="danger" />
      </div>
    </form>
  )
}

export default CreateOrganization
