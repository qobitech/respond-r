import React, { useEffect } from "react"
import "./index.scss"
import { IStates } from "interfaces/IReducer"
import { IAction } from "interfaces/IAction"
import { TypeButton, TypeSmallButton } from "utils/new/button"
import { IUser } from "interfaces/IUser"
import { IRightSection } from "components/reusable/right-section"
import { DeleteCTA } from "../application/view"

interface IProps {
  states?: IStates
  actions?: IAction
  rsProps?: IRightSection<IUser>
}

const contentItems = (user: IUser | null | undefined) => [
  {
    label: "First Name",
    value: user?.firstName ?? "...",
  },
  {
    label: "Middle Name",
    value: user?.middleName ?? "...",
  },
  {
    label: "Last Name",
    value: user?.lastName ?? "...",
  },
  {
    label: "User Name",
    value: user?.username ?? "...",
  },
  {
    label: "Phone Number",
    value: user?.phoneNumber ?? "...",
  },
  {
    label: "State",
    value: user?.state ?? "...",
  },
  {
    label: "Employee ID",
    value: user?.employeeId ?? "...",
  },
  {
    label: "Role",
    value: user?.roles?.[0] ? user?.roles[0] : "...",
  },
  {
    label: "Status",
    value: user?.status ?? "...",
  },
]

const ViewUser: React.FC<IProps> = ({ states, actions, rsProps }) => {
  const deleteApp = rsProps?.isView("delete", "user")
  const user = rsProps?.data
  const updateData = rsProps?.updateData
  const id = rsProps?.queryId

  useEffect(() => {
    if (!user && id) {
      actions?.getUserById(id)
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
        {contentItems(user)
          .filter(filterOnDelete)
          .map((i, index) => (
            <ViewContentItem key={index} {...i} />
          ))}
      </div>
      {!deleteApp ? (
        <div className="cta">
          <TypeButton title="CONTACT USER" />
          <TypeSmallButton
            title="Delete User"
            buttonType="danger"
            onClick={rsProps?.closeSection}
          />
        </div>
      ) : (
        <DeleteCTA
          title="Delete User"
          onCancel={rsProps?.closeSection}
          onDelete={() => {
            actions?.deleteUser?.(user?.id as string)
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

export default ViewUser
