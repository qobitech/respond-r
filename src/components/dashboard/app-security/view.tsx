import React from "react"
import "./index.scss"
import { IStates } from "interfaces/IReducer"
import { IAction } from "interfaces/IAction"
import { TypeInput } from "utils/new/input"
import { TypeButton, TypeSmallButton } from "utils/new/button"
import { LockSVG } from "utils/new/svgs"

interface IProps {
  states?: IStates
  actions?: IAction
}

const contentItems = [
  {
    label: "Application Name",
    value: "Testing BD",
  },
  {
    label: "Application ID",
    value: "12043-453-090-54",
  },
  {
    label: "Description",
    value: "Itex post integration with Chithub",
  },
  {
    label: "Environment",
    value: "Development",
  },
  {
    label: "Created At",
    value: "Mon Jan 10 2022",
  },
]

const ViewApplication: React.FC<IProps> = ({ states, actions }) => {
  return (
    <form className="app-form">
      <div className="form-content">
        {contentItems.map((i, index) => (
          <ViewContentItem key={index} {...i} />
        ))}
      </div>
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
        <TypeSmallButton title="Cancel" buttonType="danger" />
      </div>
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
      <p>{value}</p>
    </div>
  )
}

export default ViewApplication
