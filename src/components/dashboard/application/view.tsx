import React, { useEffect } from "react"
import "./index.scss"
import { IStates } from "interfaces/IReducer"
import { IAction } from "interfaces/IAction"
import { TypeButton, TypeSmallButton } from "utils/new/button"
import { LockSVG } from "utils/new/svgs"
import { IApplication } from "interfaces/IApplication"
import { IRightSection } from "components/reusable/right-section"

interface IProps {
  states?: IStates
  actions?: IAction
  rsProps?: IRightSection<IApplication>
}

const contentItems = (application: IApplication | null | undefined) => [
  {
    label: "Application Name",
    value: application?.applicationName || "...",
  },
  {
    label: "Application ID",
    value: application?.id ? application?.id + "" : "...",
  },
  {
    label: "Description",
    value: application?.description || "...",
  },
  {
    label: "Environment",
    value: application?.environment || "",
  },
  {
    label: "Created At",
    value: application?.createdAt
      ? new Date(application?.createdAt).toDateString()
      : "",
  },
]

const ViewApplication: React.FC<IProps> = ({ states, actions, rsProps }) => {
  const deleteApp = rsProps?.isView("delete", "application")
  const application = rsProps?.data
  const updateData = rsProps?.updateData
  const id = rsProps?.queryId

  console.log(rsProps?.data)

  useEffect(() => {
    if (!application && id) {
      actions?.getApplicationById(id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (states?.application.getApplicationById)
      updateData?.(states?.application.getApplicationById)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [states?.application.getApplicationById])

  const filterOnDelete = (i: { label: string; value: string }) =>
    deleteApp ? i.label !== "Created At" && i.label !== "Application ID" : i

  return (
    <form className="app-form" onSubmit={(e) => e.preventDefault()}>
      <div className="form-content">
        {contentItems(application)
          .filter(filterOnDelete)
          .map((i, index) => (
            <ViewContentItem key={index} {...i} />
          ))}
      </div>
      {!deleteApp ? (
        <>
          <div className="view-content-item api-keys-section">
            <label>API Keys</label>
            <p className="content-value">No Access</p>
            <div className="api-keys-prompt">
              <LockSVG />
              <p>You don&apos;t have the access to view</p>
            </div>
          </div>

          <div className="cta">
            <TypeButton title="ADD APPLICATION TO SUBSCRIPTION" />
            <TypeSmallButton
              title="Cancel"
              buttonType="danger"
              onClick={rsProps?.closeSection}
            />
          </div>
        </>
      ) : (
        <DeleteCTA
          title="Delete Application"
          onCancel={rsProps?.closeSection}
          onDelete={() => {
            actions?.deleteApplication?.(application?.id as number)
          }}
        />
      )}
    </form>
  )
}

export const DeleteCTA = ({
  onDelete,
  onCancel,
  title,
}: {
  onDelete?: React.MouseEventHandler<HTMLButtonElement> | undefined
  onCancel?: React.MouseEventHandler<HTMLButtonElement> | undefined
  title: string
}) => {
  return (
    <div className="delete-app">
      <p style={{ color: "red" }}>
        Are you sure? This action cannot be undone!
      </p>
      <div className="cta-delete-app">
        <TypeButton title={title} onClick={onDelete} />
        <TypeSmallButton
          title="Cancel"
          buttonType="danger"
          onClick={onCancel}
        />
      </div>
    </div>
  )
}

export const ViewContentItem = ({
  label,
  value,
}: {
  label: string
  value: string
}) => {
  return (
    <div className="view-content-item">
      <label>{label}</label>
      <p>{value}</p>
    </div>
  )
}

export default ViewApplication
