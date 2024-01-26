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
import { GODUSER } from "utils/new/constants/roles"

interface ICreateAdmin {
  email: string
  organisationId: string
  userName: string
  phoneNumber: string
  password: string
  confirmPassword: string
  role: string
}

const createAdminSchema = (update: boolean) => ({
  email: yup.string().required("input required"),
  organisationId: yup.string().required("input required"),
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

const getFormComponent = (states?: IStates): IFormComponent[] => {
  const allOrganizations = states?.organization?.getAllOrganization?.data
  const allRoles = states?.role?.getAllRoles?.data
  return [
    {
      id: "email",
      label: "Email",
      placeHolder: "Enter your email address",
      type: "text",
      component: "input",
    },
    {
      id: "organisationId",
      label: "Organization",
      placeHolder: "",
      type: "text",
      component: "select",
      initOptions: { id: 2, label: "Select Organziation", value: "" },
      optionData: allOrganizations?.map((i, index) => ({
        id: index + 1,
        label: i.name,
        value: i.id,
      })),
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
      optionData: allRoles?.map((i, index) => ({
        id: index + 1,
        label: i.name,
        value: i.name,
      })),
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
  ].filter((i) => (GODUSER ? i : i.id !== "organisationId")) as IFormComponent[]
}

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
    actions.getAllOrganization("")
    actions.getAllRoles("")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isUpdate) {
      hookForm.setValue("email", rsProps?.data?.email || "")
      hookForm.setValue(
        "organisationId",
        rsProps?.data?.organisation.id + "" || ""
      )
      hookForm.setValue("phoneNumber", "+" + rsProps?.data?.phoneNumber || "")
      hookForm.setValue("userName", rsProps?.data?.userName || "")
      hookForm.setValue("role", rsProps?.data?.roleForReturn?.[0]?.name || "")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdate])

  const getNormalizedName = (roleName: string) => {
    const allRoles = states?.role?.getAllRoles?.data
    return allRoles.filter((role) => role.name === roleName)?.[0]
      ?.normalizedName
  }

  const handleUser = (data: ICreateAdmin) => {
    setResponse(null)
    if (!isUpdate) {
      actions.clearAction(user.createUser)
      actions.createUser(
        { ...data, role: [getNormalizedName(data.role)] },
        (res) => {
          setResponse({
            message: "User created successfully",
            isSuccessful: true,
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

  const formComponent = getFormComponent(states)

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
