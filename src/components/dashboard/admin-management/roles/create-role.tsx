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
import { IRole } from "interfaces/IRole"
import { role } from "store/types"
import { useGlobalContext } from "components/layout"
import { IOrganization } from "interfaces/IOrganization"
import { GODUSER } from "utils/new/constants/roles"
import { ISSUPERADMIN } from "utils/new/constants"

interface ICreateRole {
  name: string
  organisationId: number
}

const createRoleSchema = {
  name: yup.string().required("input required"),
  organisationId: GODUSER
    ? yup.number().required("input required")
    : yup.number(),
}

const getFormComponent = (organizations: IOrganization[]) =>
  [
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
      optionData: organizations.map((i, index) => ({
        id: index + 1,
        label: i.name,
        value: i.id,
      })),
    },
  ].filter((i) =>
    GODUSER ? i : ISSUPERADMIN ? i.id === "name" : false
  ) as IFormComponent[]

const CreateRole = ({
  states,
  actions,
  rsProps,
}: {
  states: IStates
  actions: IAction
  rsProps?: IRightSection<IRole>
}) => {
  const { organizations, userOrganization } = useGlobalContext()
  const formComponent = getFormComponent(organizations || [])
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
      !isUpdate
        ? { ...data, organizationId: userOrganization?.id }
        : { oldName: rsProps?.data?.name || "", newName: data.name },
      isUpdate,
      () => {
        setResponse({
          message: "role updated successfully",
          isSuccessful: true,
        })
        actions.getAllRoles("")
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
        title={isUpdate ? "Update Role" : "Add Role"}
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
