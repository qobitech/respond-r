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
import { getOrgId, organizationEnums } from "utils/new/constants"
import { IRole } from "interfaces/IRole"
import { role } from "store/types"

interface ICreateRole {
  name: string
  organisationId: number
}

const createRoleSchema = {
  name: yup.string().required("input required"),
  organisationId: yup.number().required("input required"),
}

const formComponent: IFormComponent[] = [
  {
    id: "name",
    label: "Title",
    placeHolder: "Enter role title",
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
    optionData: Object.values(organizationEnums).map((i, index) => ({
      id: index + 1,
      label: i,
      value: getOrgId(i),
    })),
  },
] as IFormComponent[]

const CreateRole = ({
  states,
  actions,
  rsProps,
}: {
  states: IStates
  actions: IAction
  rsProps?: IRightSection<IRole>
}) => {
  const isUpdate = rsProps?.isView("custom", "update-role")
  const [hookForm] = useFormHook<ICreateRole>(createRoleSchema)
  const [response, setResponse] = useState<{
    message: string
    isSuccessful: boolean
  } | null>(null)

  useEffect(() => {
    if (isUpdate) {
      hookForm.setValue("name", rsProps?.data?.name || "")
      hookForm.setValue("organisationId", rsProps?.data?.organisationId || 0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdate])

  const handleUser = (data: ICreateRole) => {
    actions.clearAction(role.createRole)
    setResponse(null)
    actions.createRole(
      data,
      isUpdate,
      (res) => {
        setResponse({
          message: states?.role?.createRole?.message || "",
          isSuccessful: states?.role?.createRole?.isSuccessful!,
        })
        console.log(res)
      },
      (err) => {
        console.log(err)
        setResponse({ message: "Something went wrong", isSuccessful: false })
      }
    )
  }
  return (
    <div className="card-section px-4 py-4">
      <FormBuilder formComponent={formComponent} hookForm={hookForm} />
      <TypeButton
        title={isUpdate ? "Update" : "Create"}
        onClick={hookForm.handleSubmit(handleUser)}
        load={states.role.createRoleLoading}
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

export default CreateRole
