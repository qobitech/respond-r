import React, { useEffect, useState } from "react"
import "./index.scss"
import { IStates } from "interfaces/IReducer"
import { IAction } from "interfaces/IAction"
import { TypeCheckbox } from "utils/new/checkbox"
import { AngleRightSVG } from "utils/new/svgs"
import { TypeButton, TypeSmallButton } from "utils/new/button"
import FormBuilder, { IFormComponent } from "utils/new/form-builder"
import { IAPIScope, IApplication } from "interfaces/IApplication"
import { Loader2 } from "utils/new/components"
import * as yup from "yup"
import { useFormHook } from "utils/new/hook"
import { TypeInput } from "utils/new/input"
import TextPrompt from "utils/new/text-prompt"
import { IRightSection } from "components/reusable/right-section"

interface IProps {
  states?: IStates
  actions?: IAction
  rsProps?: IRightSection<IApplication>
}

export interface ICreateApplicationHookForm {
  email: string
  ApplicationName: string
  environment: string
  organizationId: number
  description: string
  clientName: string
  allowedScopes: string[]
}

export const createApplicationSchema = {
  email: yup.string().email(),
  ApplicationName: yup.string().required("Application name is required"),
  environment: yup.string().required("Environment is required"),
  organizationId: yup.number(),
  description: yup.string().required("Description is required"),
  clientName: yup.string(),
  allowedScopes: yup
    .array(yup.string())
    .min(1, "Select at least one (1) scope")
    .required("Select at least one (1) scope"),
}

const CreateApplication: React.FC<IProps> = ({ states, actions, rsProps }) => {
  const update = rsProps?.isView("update", "application")
  const application = rsProps?.data
  const [hookForm] = useFormHook<ICreateApplicationHookForm>(
    createApplicationSchema
  )
  const apiScopes = states?.apiscope.getAPIScopes
  const apiScopesLoading = states?.apiscope.getAPIScopesLoading
  const createApiScopesLoading = states?.apiscope.createAPIScopeLoading
  // const createApiScopes = states?.apiscope.createAPIScope
  useEffect(() => {
    if (!apiScopes?.issucessFul) actions?.getAPIScopes()
    if (update) {
      hookForm.setValue("ApplicationName", application?.applicationName || "")
      hookForm.setValue("environment", application?.environment || "")
      hookForm.setValue("description", application?.description || "")
      hookForm.setValue("allowedScopes", application?.allowedScopes || [])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const createApplicationFC: IFormComponent[] = [
    {
      id: "ApplicationName",
      label: "Application Name",
      placeHolder: "Enter application name",
      type: "text",
      component: "input",
    },
    {
      id: "environment",
      label: "Environment",
      placeHolder: "Enter your password",
      type: "text",
      component: "select",
      initOptions: { id: 1, label: "Select environment", value: "" },
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
    {
      id: "description",
      label: "Description",
      placeHolder: "Enter description",
      type: "text",
      component: "text-area",
    },
  ]

  const handleAPIScope = (id: string) => {
    const temp = !!hookForm.getValues("allowedScopes")
      ? hookForm.getValues("allowedScopes")
      : []
    const index = temp?.findIndex((i) => i === id)
    if (index === -1 || !hookForm.getValues("allowedScopes")) {
      temp?.push(id)
    } else {
      temp?.splice(index || 0, 1)
    }
    hookForm.setValue("allowedScopes", temp)
  }

  const handleChecked = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { id } = target
    handleAPIScope(id)
  }

  const handleClicked = (id: number) => {
    handleAPIScope(id + "")
  }

  const submitForm = (data: ICreateApplicationHookForm) => {
    actions?.createAPIScope(
      {
        ...data,
        clientName: "John",
        email: "johnaka@gmail.com",
        organizationId: 1,
      },
      update
    )
  }

  return (
    <form className="app-form" onSubmit={(e) => e.preventDefault()}>
      <div className="form-content">
        <FormBuilder formComponent={createApplicationFC} hookForm={hookForm} />
      </div>
      <div className="allowed-scope-form">
        <h3>Allowed Scope ({hookForm.watch().allowedScopes?.length || "0"})</h3>
        <p>Please choose one or multiple API services for your application</p>
        {!hookForm.watch().allowedScopes?.length && (
          <TextPrompt
            prompt={hookForm.formState.errors.allowedScopes?.message || ""}
          />
        )}
        <div className="allowed-scope-search">
          <TypeInput placeholder="Search API Scope" />
        </div>
      </div>
      {apiScopesLoading ? (
        <Loader2 loader />
      ) : (
        <div className="form-content fm-separator api-scope-wrapper">
          {apiScopes?.scopes?.map((i, index) => (
            <APIScope
              key={index}
              {...i}
              isChecked={
                hookForm.watch().allowedScopes?.includes(i.id + "") || false
              }
              handleChecked={handleChecked}
              handleClicked={handleClicked}
            />
          ))}
        </div>
      )}
      <div className="cta">
        <TypeButton
          title={update ? "UPDATE" : "CREATE"}
          load={createApiScopesLoading}
          onClick={hookForm.handleSubmit(submitForm)}
        />
        <TypeSmallButton
          title="Cancel"
          buttonType="danger"
          onClick={rsProps?.closeSection}
        />
      </div>
    </form>
  )
}

const APIScope = (
  props: IAPIScope & {
    isChecked: boolean
    handleChecked: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleClicked: (id: number) => void
  }
) => {
  const [openDesc, setOpenDesc] = useState<boolean>(false)
  const handleDesc = () => {
    setOpenDesc(!openDesc)
  }
  return (
    <div className="api-scope-item">
      <TypeCheckbox
        checked={props.isChecked}
        onChange={props.handleChecked}
        id={props.id + ""}
      />
      <div className="api-scope-content">
        <h6 onClick={() => props.handleClicked(props.id)}>{props.name}</h6>
        <div className="api-scope-description" onClick={handleDesc}>
          <AngleRightSVG className={openDesc ? "open" : ""} />
          <p className={openDesc ? "open" : ""}>
            {props.description || "no description"}
          </p>
        </div>
      </div>
    </div>
  )
}

export default CreateApplication
