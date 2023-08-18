import React, { useState } from "react"
import "./index.scss"
import { IStates } from "interfaces/IReducer"
import { IAction } from "interfaces/IAction"
import { TypeInput } from "utils/new/input"
import { TypeCheckbox } from "utils/new/checkbox"
import { AngleRightSVG } from "utils/new/svgs"
import { TypeButton, TypeSmallButton } from "utils/new/button"

interface IProps {
  states?: IStates
  actions?: IAction
}

const description =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate"

const apiScopeData = [
  {
    title: "My API",
    description,
  },
  {
    title: "User API",
    description,
  },
  {
    title: "CBS API",
    description,
  },
  {
    title: "Insurance API",
    description,
  },
  {
    title: "Vehicle API",
    description,
  },
]

const CreateApplication: React.FC<IProps> = ({ states, actions }) => {
  return (
    <form className="app-form">
      <div className="form-content">
        <TypeInput
          label="Application Name"
          placeholder="Enter application name"
        />
        <TypeInput label="Environment" placeholder="Select environment" />
        <TypeInput label="Description" placeholder="Enter description" />
      </div>
      <div className="allowed-scope">
        <h3>Allowed Scope</h3>
        <p>Please choose one or multiple API services for your application</p>
      </div>
      <div className="form-content fm-separator">
        {apiScopeData.map((i, index) => (
          <APIScope key={index} {...i} />
        ))}
      </div>
      <div className="cta">
        <TypeButton title="CREATE" />
        <TypeSmallButton title="Cancel" buttonType="danger" />
      </div>
    </form>
  )
}

const APIScope = ({
  title,
  description,
}: {
  title: string
  description: string
}) => {
  const [openDesc, setOpenDesc] = useState<boolean>(false)
  const handleDesc = () => {
    setOpenDesc(!openDesc)
  }
  return (
    <div className="api-scope-item">
      <TypeCheckbox />
      <div className="api-scope-content">
        <h6>{title}</h6>
        <div className="api-scope-description" onClick={handleDesc}>
          <AngleRightSVG className={openDesc ? "open" : ""} />
          <p className={openDesc ? "open" : ""}>{description}</p>
        </div>
      </div>
    </div>
  )
}

export default CreateApplication
