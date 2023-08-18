import React, { useEffect } from "react"
import "./index.scss"
import { IStates } from "interfaces/IReducer"
import { IAction } from "interfaces/IAction"
import { TypeButton, TypeSmallButton } from "utils/new/button"
import { IRightSection } from "components/reusable/right-section"
import { DeleteCTA } from "../application/view"
import { IOrganization } from "interfaces/IOrganization"

interface IProps {
  states?: IStates
  actions?: IAction
  rsProps?: IRightSection<IOrganization>
}

const contentItems = (org: IOrganization | null | undefined) => [
  {
    label: "Name",
    value: org?.organizationName ?? "...",
  },
  {
    label: "Address",
    value: org?.address ?? "...",
  },
  {
    label: "Email",
    value: org?.email ?? "...",
  },
  {
    label: "Phone Number",
    value: org?.phoneNumber ?? "...",
  },
  {
    label: "State",
    value: org?.state ?? "...",
  },
]

const ViewOrganization: React.FC<IProps> = ({ states, actions, rsProps }) => {
  const deleteApp = rsProps?.isView("delete", "organization")
  const organization = rsProps?.data
  const updateData = rsProps?.updateData
  const id = rsProps?.queryId

  useEffect(() => {
    if (!organization && id) {
      actions?.getOrganizationInfo(id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (states?.user.getUserById) updateData?.(states?.user.getUserById)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [states?.user.getUserById])

  const filterOnDelete = (i: { label: string; value: string }) =>
    deleteApp
      ? i.label !== "Phone Number" &&
        i.label !== "State" &&
        i.label !== "Employee ID" &&
        i.label !== "Role" &&
        i.label !== "Status"
      : i

  return (
    <form className="app-form" onSubmit={(e) => e.preventDefault()}>
      <div className="form-content fm-separator">
        {contentItems(organization)
          .filter(filterOnDelete)
          .map((i, index) => (
            <ViewContentItem key={index} {...i} />
          ))}
      </div>
      {!deleteApp ? (
        <div className="cta">
          <TypeButton title="CONTACT USER" />
          <TypeSmallButton title="Delete User" buttonType="danger" />
        </div>
      ) : (
        <DeleteCTA
          title="Delete Organization"
          onCancel={rsProps?.closeSection}
          onDelete={() => {
            actions?.deleteOrganization?.(organization?.id + "")
          }}
        />
      )}
    </form>
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
      {label === "Status" ? (
        <TypeSmallButton title={value} buttonType="active" status />
      ) : (
        <p>{value}</p>
      )}
    </div>
  )
}

export default ViewOrganization
