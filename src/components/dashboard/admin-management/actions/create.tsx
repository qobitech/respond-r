import { IAction } from "interfaces/IAction"
import { IStates } from "interfaces/IReducer"
import React, { useEffect, useState } from "react"
import { TypeButton } from "utils/new/button"
import FormBuilder, { IFormComponent } from "utils/new/form-builder"
import { useFormHook } from "utils/new/hook"
import TextPrompt from "utils/new/text-prompt"
import * as yup from "yup"
import "../../../../utils/new/page.scss"
import { IRightSection } from "components/reusable/right-section"
import { IUser } from "interfaces/IUser"
import { TypeCheckbox } from "utils/new/checkbox"

interface ICreateAdmin {
  action: string
  description: string
  organisations: string[]
  roles: string[]
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
    id: "action",
    label: "Action",
    placeHolder: "Enter action",
    type: "text",
    component: "input",
  },
  {
    id: "description",
    label: "Description",
    placeHolder: "Enter description",
    type: "text",
    component: "text-area",
  },
]

const CreateAction = ({
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
      hookForm.setValue("action", rsProps?.data?.email || "")
      hookForm.setValue(
        "description",
        rsProps?.data?.organisationName?.toLowerCase() || ""
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdate])

  const handleAction = (data: ICreateAdmin) => {
    setResponse(null)
    // if (!isUpdate) {
    //   actions.clearAction(user.createUser)
    //   actions.createUser(
    //     {
    //       ...data,
    //       organisationName: data.organisationName,
    //       role: [data.organisationName],
    //     },
    //     (res) => {
    //       setResponse({
    //         message: states?.user?.createUser?.message || "",
    //         isSuccessful: states?.user?.createUser?.isSuccessful!,
    //       })
    //       actions.getAllUsers("")
    //     },
    //     (err) => {
    //       setResponse({ message: "Something went wrong", isSuccessful: false })
    //     }
    //   )
    // } else {
    //   actions.clearAction(user.updateUser)
    // }
  }
  return (
    <div className="card-section px-4 py-4">
      <FormBuilder formComponent={formComponent} hookForm={hookForm} />
      <Organizations />
      <TypeButton
        title={isUpdate ? "Update" : "Create"}
        onClick={hookForm.handleSubmit(handleAction)}
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

export default CreateAction

const Organizations = () => {
  const data = [
    { id: "traffic", label: "Traffic", value: "traffic" },
    { id: "e-police", label: "E-Police", value: "e-police" },
    { id: "fire-service", label: "Fire Service", value: "fire-service" },
    { id: "e-medical", label: "E-Medical", value: "e-medical" },
  ]

  const [selectedOrganizations, setSelectedOrganizations] = useState<string[]>(
    []
  )

  const setValue = (id: string, checked: boolean) => {
    const temp = [...selectedOrganizations] || []
    const index = temp.indexOf(id)
    if (index === -1) {
      if (checked) temp.push(data.filter((i) => i.id === id)?.[0]?.value)
    } else {
      if (!checked) temp.splice(index, 1)
    }
    setSelectedOrganizations([...temp])
  }

  return (
    <div className="form-select-section-container p-0 border-0">
      <h5>Select Organizations</h5>
      <div className="form-select-section-content">
        {data.map((i) => (
          <SelectItem id={i.id} title={i.label} setValue={setValue} />
        ))}
      </div>
    </div>
  )
}

const Roles = () => {
  const data = [
    { id: "super-admin", label: "Super Admin", value: "traffic" },
    { id: "admin", label: "Admin", value: "e-police" },
    { id: "moderator", label: "Moderator", value: "fire-service" },
    { id: "field-officer", label: "Field Officer", value: "e-medical" },
  ]

  const [selectedOrganizations, setSelectedOrganizations] = useState<string[]>(
    []
  )

  const setValue = (id: string, checked: boolean) => {
    const temp = [...selectedOrganizations] || []
    const index = temp.indexOf(id)
    if (index === -1) {
      if (checked) temp.push(data.filter((i) => i.id === id)?.[0]?.value)
    } else {
      if (!checked) temp.splice(index, 1)
    }
    setSelectedOrganizations([...temp])
  }

  return (
    <div className="form-select-section-container m-0">
      <div className="form-select-role-section">
        {data.map((i) => (
          <RoleSelectItem id={i.id} title={i.label} setValue={setValue} />
        ))}
      </div>
    </div>
  )
}

const RoleSelectItem = ({
  id,
  title,
  setValue,
}: {
  title: string
  id: string
  setValue: (id: string, checked: boolean) => void
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const handleCheck = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = target
    setIsChecked(checked)
    setValue(id, checked)
  }
  const handleOnClick = () => {
    setIsChecked((e) => !isChecked)
    setValue(id, !isChecked)
  }
  return (
    <div className="role-select-item-wrapper">
      <div onClick={handleOnClick} className="select-item-content">
        <TypeCheckbox onChange={handleCheck} id={id} checked={isChecked} />
        <p>{title}</p>
      </div>
    </div>
  )
}

const SelectItem = ({
  id,
  title,
  setValue,
}: {
  title: string
  id: string
  setValue: (id: string, checked: boolean) => void
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(false)
  // const handleCheck = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
  //   const { checked } = target
  //   setIsChecked(checked)
  //   setValue(id, checked)
  // }
  const handleOnClick = () => {
    setIsChecked((e) => !isChecked)
    setValue(id, !isChecked)
  }
  return (
    <div className="select-item-wrapper">
      <div onClick={handleOnClick} className="select-item-content">
        {/* <TypeCheckbox onChange={handleCheck} id={id} checked={isChecked} /> */}
        <div className="w-100">
          <p>{title}</p>
          <Roles />
        </div>
      </div>
    </div>
  )
}
