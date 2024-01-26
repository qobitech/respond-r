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
import { action } from "store/types"
import { IRoleAction } from "interfaces/IRoleActions"
import { PAGENUMBER, PAGESIZE, getQuery } from "."

interface ICreateAction {
  name: string
}

const createActionSchema = {
  name: yup.string().required("input required"),
}

const formComponent: IFormComponent[] = [
  {
    id: "name",
    label: "Title",
    placeHolder: "Enter title",
    type: "text",
    component: "input",
  },
]

const CreateAction = ({
  states,
  actions,
  rsProps,
}: {
  states: IStates
  actions: IAction
  rsProps?: IRightSection<IRoleAction>
}) => {
  const isUpdate = rsProps?.isView("custom", "update-action")
  const [hookForm] = useFormHook<ICreateAction>(createActionSchema)
  const [response, setResponse] = useState<{
    message: string
    isSuccessful: boolean
  } | null>(null)

  useEffect(() => {
    if (isUpdate) {
      hookForm.setValue("name", rsProps?.data?.name || "")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdate])

  const handleUser = (data: ICreateAction) => {
    actions.clearAction(action.createAction)
    setResponse(null)
    actions.createAction(
      !isUpdate ? data : { ...data, id: rsProps?.data?.id },
      isUpdate,
      (res) => {
        setResponse({
          message: `${data.name} action ${!isUpdate ? "created" : "updated"}`,
          isSuccessful: true,
        })
        actions.getAllAction(getQuery(`${PAGESIZE}&${PAGENUMBER}`))
        hookForm.setValue("name", "")
      },
      (err) => {
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
        load={states.actions.createActionLoading}
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
