import { IAction } from "interfaces/IAction"
import { IStates } from "interfaces/IReducer"
import React, { useEffect, useState } from "react"
import { user } from "store/types"
import { TypeButton } from "utils/new/button"
import FormBuilder, { IFormComponent } from "utils/new/form-builder"
import { useFormHook } from "utils/new/hook"
import TextPrompt from "utils/new/text-prompt"
import * as yup from "yup"
import "../../../../utils/new/page.scss"
import { IRightSection } from "components/reusable/right-section"
import { IUser } from "interfaces/IUser"
import { ORGANIZATION, ROLE } from "utils/new/constants"

interface ICreateAdmin {
  email: string
  organisationName: string
  userName: string
  phoneNumber: string
  // role: [string]
  password: string
  confirmPassword: string
}

const createAdminSchema = (update: boolean) => ({
  email: yup.string().required("input required"),
  organisationName: yup.string().required("input required"),
  userName: yup.string().required("input required"),
  phoneNumber: yup.string().required("input required"),
  password: update ? yup.string() : yup.string().required("input required"),
  confirmPassword: update
    ? yup.string()
    : yup
        .string()
        .required("input required")
        .oneOf([yup.ref("password"), null], "Passwords must match"),
})

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
      { id: 2, label: "E-Police", value: "e-police" },
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
  {
    id: "role",
    label: "Role",
    placeHolder: "",
    type: "text",
    component: "select",
    initOptions: { id: 2, label: "Select Role", value: "" },
    optionData: [
      { id: 1, label: "Super Admin", value: "Super Admin" },
      { id: 2, label: "Admin", value: "Admin" },
      { id: 3, label: "Moderator", value: "Moderator" },
      { id: 4, label: "Field Officer", value: "Field Officer" },
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
].filter((i) =>
  ORGANIZATION === "all" && ROLE === "super-admin"
    ? i
    : i.id !== "organisationName"
) as IFormComponent[]

const CreateAdmin = ({
  states,
  actions,
  rsProps,
}: {
  states: IStates
  actions: IAction
  rsProps?: IRightSection<IUser>
}) => {
  const isUpdate = rsProps?.isView("custom", "update-admin")
  const [hookForm] = useFormHook<ICreateAdmin>(createAdminSchema(isUpdate!))
  const [response, setResponse] = useState<{
    message: string
    isSuccessful: boolean
  } | null>(null)

  useEffect(() => {
    if (isUpdate) {
      hookForm.setValue("email", rsProps?.data?.email || "")
      hookForm.setValue(
        "organisationName",
        rsProps?.data?.organisationName?.toLowerCase() || ""
      )
      hookForm.setValue("phoneNumber", "+" + rsProps?.data?.phoneNumber || "")
      hookForm.setValue("userName", rsProps?.data?.userName || "")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdate])

  const handleUser = (data: ICreateAdmin) => {
    setResponse(null)
    if (!isUpdate) {
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
          actions.getAllUsers("")
        },
        (err) => {
          setResponse({ message: "Something went wrong", isSuccessful: false })
        }
      )
    } else {
      actions.clearAction(user.updateUser)
    }
  }
  return (
    <div className="card-section px-4 py-4">
      <FormBuilder formComponent={formComponent} hookForm={hookForm} />
      <TypeButton
        title={isUpdate ? "Update" : "Create"}
        onClick={hookForm.handleSubmit(handleUser)}
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
