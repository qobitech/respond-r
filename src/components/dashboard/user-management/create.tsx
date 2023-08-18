import React, { useEffect } from "react"
import "./index.scss"
import { IStates } from "interfaces/IReducer"
import { IAction } from "interfaces/IAction"
import { TypeButton, TypeSmallButton } from "utils/new/button"
import FormBuilder, { IFormComponent } from "utils/new/form-builder"
import * as yup from "yup"
import { useFormHook } from "utils/new/hook"
import { IUser } from "interfaces/IUser"
import { IRightSection } from "components/reusable/right-section"

interface IProps {
  states?: IStates
  actions?: IAction
  rsProps?: IRightSection<IUser>
}

export interface ICreateUserHookForm {
  firstName: string
  middleName: string
  lastName: string
  email: string
  phoneNumber: string
  state: string
  employeeId: string
  password: string
  confirmPassword: string
  organizationId: number
  organizationName: string
  roles: string[]
}

export const createUserSchema = {
  firstName: yup.string().required("first name is required"),
  middleName: yup.string().required("middle name is required"),
  lastName: yup.string().required("last name is required"),
  email: yup.string().email().required("email is required"),
  phoneNumber: yup.string().required("phone number is required"),
  state: yup.string().required("state is required"),
  employeeId: yup.string(),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  organizationId: yup.number(),
  organizationName: yup.string().required("Organization name is required"),
  roles: yup
    .array(yup.string())
    .min(1, "Select at least one (1) role")
    .required("Select at least one (1) role"),
}

const CreateUser: React.FC<IProps> = ({ states, actions, rsProps }) => {
  const update = rsProps?.isView("update", "user")
  const user = rsProps?.data
  const filterOnUpdate = (i: IFormComponent) =>
    update ? i.id !== "password" && i.id !== "confirmPassword" : i
  const createUserFC: IFormComponent[] = [
    {
      id: "firstName",
      label: "First Name",
      placeHolder: "Enter first name",
      type: "text",
      component: "input",
    },
    {
      id: "middleName",
      label: "Middle Name",
      placeHolder: "Enter middle name",
      type: "text",
      component: "input",
    },
    {
      id: "lastName",
      label: "Last Name",
      placeHolder: "Enter last name",
      type: "text",
      component: "input",
    },
    {
      id: "email",
      label: "Email Address",
      placeHolder: "Enter email address",
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
    {
      id: "password",
      label: "Password",
      placeHolder: "Enter password",
      type: "password",
      component: "input",
    },
    {
      id: "confirmPassword",
      label: "Confirm Password",
      placeHolder: "Confirm password",
      type: "password",
      component: "input",
    },
    {
      id: "employeeId",
      label: "Employee ID",
      placeHolder: "Enter employee id",
      type: "text",
      component: "input",
    },
    {
      id: "roles",
      label: "Role",
      placeHolder: "Select Role",
      type: "text",
      component: "select",
      initOptions: { id: 1, label: "Select role", value: "" },
      optionData: [
        {
          id: 1,
          label: "Development",
          value: "Development",
        },
        {
          id: 2,
          label: "Production",
          value: "Production",
        },
      ],
    },
  ]
  const [hookForm] = useFormHook<ICreateUserHookForm>(createUserSchema)

  useEffect(() => {
    // if (!apiScopes?.issucessFul) actions?.getAPIScopes()
    if (update) {
      hookForm.setValue("firstName", user?.firstName || "")
      hookForm.setValue("middleName", user?.middleName || "")
      hookForm.setValue("lastName", user?.lastName || "")
      hookForm.setValue("email", user?.email || "")
      hookForm.setValue("phoneNumber", user?.phoneNumber || "")
      hookForm.setValue("state", user?.state || "")
      hookForm.setValue("state", user?.state || "")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <form className="app-form" onSubmit={(e) => e.preventDefault()}>
      <div className="form-content fm-separator">
        <FormBuilder
          formComponent={createUserFC.filter(filterOnUpdate)}
          hookForm={hookForm}
        />
      </div>
      <div className="cta">
        <TypeButton title={update ? "UPDATE" : "CREATE"} />
        <TypeSmallButton
          title="Cancel"
          buttonType="danger"
          onClick={rsProps?.closeSection}
        />
      </div>
    </form>
  )
}

export default CreateUser
