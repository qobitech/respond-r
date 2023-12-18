import React, { useState } from "react"
import "./index.scss"
import "../global.scss"
import AdminReport from "../admin-reports"
import ManagementPage from "./management"
import { IStates } from "interfaces/IReducer"
import { IAction } from "interfaces/IAction"
import ActionPage from "./actions"

export const adminSections = {
  TRAFFIC: "E-traffic",
  POLICE: "E-police",
  FIRE_DEPARTMENT: "E-fire department",
  HEALTHCARE: "E-healthcare",
} as const

export type typeAdminSections =
  (typeof adminSections)[keyof typeof adminSections]

interface IProps {
  states?: IStates
}

const AdminManagement: React.FC<IProps> = ({ states, ...props }) => {
  const tabEnums = { USERS: "User Management", ACTIONS: "Actions" }
  const actions = props as unknown as IAction

  const [tab, setTab] = useState<string>(tabEnums.USERS)
  return (
    <div className="main-page">
      <div className="pg-container">
        <div className="mb-5">
          <div className="tab-section">
            <div className="tab-header">
              {Object.values(tabEnums).map((i, index) => (
                <div
                  className={`tab-item ${i === tab ? "active" : ""}`}
                  key={index}
                  onClick={() => setTab(i)}
                >
                  <p>{i}</p>
                </div>
              ))}
            </div>
            <div className="tab-body">
              {tab === tabEnums.USERS ? (
                <ManagementPage states={states} actions={actions} />
              ) : null}
              {tab === tabEnums.ACTIONS ? (
                <ActionPage states={states} actions={actions} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminManagement
