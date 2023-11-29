import { IAction } from "interfaces/IAction"
import { IStates } from "interfaces/IReducer"
import React, { useState } from "react"
import { user } from "store/types"
import { TypeButton } from "utils/new/button"
import FormBuilder, { IFormComponent } from "utils/new/form-builder"
import { useFormHook } from "utils/new/hook"
import TextPrompt from "utils/new/text-prompt"
import * as yup from "yup"

interface ICreateAdmin {
  email: string
  organisationName: string
  userName: string
  phoneNumber: string
  // role: [string]
  password: string
  confirmPassword: string
}

const createAdminSchema = {
  email: yup.string().required("input required"),
  organisationName: yup.string().required("input required"),
  userName: yup.string().required("input required"),
  phoneNumber: yup.string().required("input required"),
  // role: yup.string(),
  password: yup.string().required("input required"),
  confirmPassword: yup
    .string()
    .required("input required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
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
      { id: 1, label: "Traffic", value: "traffic" },
      { id: 2, label: "E-Police", value: "e-Police" },
      { id: 3, label: "Fire Service", value: "fire-service" },
      { id: 4, label: "E-Medical", value: "e-medical" },
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
    component: "phone",
  },
  // {
  //   id: "role",
  //   label: "Role",
  //   placeHolder: "",
  //   type: "text",
  //   component: "select",
  //   initOptions: { id: 2, label: "Select Role", value: "" },
  //   optionData: [
  //     { id: 1, label: "Super Admin", value: "Super Admin" },
  //     { id: 2, label: "Moderator", value: "Moderator" },
  //   ],
  // },
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

const CreateAdmin = ({
  states,
  actions,
}: {
  states: IStates
  actions: IAction
}) => {
  const [hookForm] = useFormHook<ICreateAdmin>(createAdminSchema)
  const [response, setResponse] = useState<{
    message: string
    isSuccessful: boolean
  } | null>(null)

  const handleCreateUser = (data: ICreateAdmin) => {
    setResponse(null)
    actions.clearAction(user.createUser)
    actions.createUser(
      {
        ...data,
        organisationName: data.organisationName,
        role: [data.organisationName],
      },
      (res) => {
        setResponse({
          message: states?.user?.createUser?.message || "",
          isSuccessful: states?.user?.createUser?.isSuccessful!,
        })
      },
      (err) => {
        setResponse({ message: "Something went wrong", isSuccessful: false })
      }
    )
  }
  return (
    <div>
      <FormBuilder formComponent={formComponent} hookForm={hookForm} />
      <TypeButton
        title="Create"
        onClick={hookForm.handleSubmit(handleCreateUser)}
        load={states.user.createUserLoading}
      />
      <div className="my-3" />
      {response !== null ? (
        <TextPrompt
          prompt={response?.message || ""}
          status={response?.isSuccessful}
        />
      ) : null}
    </div>
  )
}

export default CreateAdmin
