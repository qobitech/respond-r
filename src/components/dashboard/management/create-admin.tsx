import React from "react"
import { TypeButton } from "utils/new/button"
import FormBuilder, { IFormComponent } from "utils/new/form-builder"
import { useFormHook } from "utils/new/hook"
import * as yup from "yup"

interface ICreateAdmin {
  email: string
  organisationName: string
  userName: string
  phoneNumber: string
  role: [string]
  password: string
  confirmPassword: string
}

const createAdminSchema = {
  email: yup.string(),
  organisationName: yup.string(),
  userName: yup.string(),
  phoneNumber: yup.string(),
  role: yup.string(),
  password: yup.string(),
  confirmPassword: yup.string(),
}

const formComponent: IFormComponent[] = [
  {
    id: "email",
    label: "Email",
    placeHolder: "Enter your email address",
    type: "text",
    component: "input",
  },
  {
    id: "organisationName",
    label: "Organization",
    placeHolder: "",
    type: "text",
    component: "select",
    initOptions: { id: 2, label: "Select Organziation", value: "" },
    optionData: [
      { id: 1, label: "Traffic", value: "Traffic" },
      { id: 2, label: "E-Police", value: "E-Police" },
      { id: 3, label: "Fire Service", value: "Fire Service" },
      { id: 4, label: "E-Medical", value: "E-Medical" },
    ],
  },
  {
    id: "userName",
    label: "User Name",
    placeHolder: "Enter your user name",
    type: "text",
    component: "input",
  },
  {
    id: "phoneNumber",
    label: "Phone Number",
    placeHolder: "Enter your phone number",
    type: "phone",
    component: "input",
  },
  {
    id: "role",
    label: "Role",
    placeHolder: "",
    type: "text",
    component: "select",
    initOptions: { id: 2, label: "Select Role", value: "" },
    optionData: [
      { id: 1, label: "Super Admin", value: "Super Admin" },
      { id: 2, label: "Moderator", value: "Moderator" },
    ],
  },
  {
    id: "password",
    label: "Password",
    placeHolder: "Enter your password",
    type: "password",
    component: "input",
  },
  {
    id: "confirmPassword",
    label: "Confirm Password",
    placeHolder: "Re-enter your password",
    type: "password",
    component: "input",
  },
]

const CreateAdmin = () => {
  const [hookForm] = useFormHook<ICreateAdmin>(createAdminSchema)

  return (
    <div>
      <FormBuilder formComponent={formComponent} hookForm={hookForm} />
      <TypeButton title="Create" />
    </div>
  )
}

export default CreateAdmin
