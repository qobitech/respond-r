import React, { useState } from "react"
import "./index.scss"
import "../global.scss"
import ManagementPage from "./management"
import { IStates } from "interfaces/IReducer"
import { IAction } from "interfaces/IAction"
import ActionPage from "./action"
import { GODUSER } from "utils/new/constants/roles"
import RolePage from "./roles"
import OrganizationPage from "./organization"
import { useNavigate, useParams } from "react-router-dom"
import { url } from "enums/Route"
import { ISSUPERADMIN } from "utils/new/constants"

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

export const managementTabEnums = {
  USERS: "user",
  ACTIONS: "actions",
  ROLES: "roles",
  ORGANIZATIONS: "organizations",
} as const

export type mamagenentTabType =
  (typeof managementTabEnums)[keyof typeof managementTabEnums]

const AdminManagement: React.FC<IProps> = ({ states, ...props }) => {
  const navigate = useNavigate()

  const { pageTab } = useParams<{ pageTab: mamagenentTabType }>()

  const tabEnums = {
    USERS: "User Management",
    ACTIONS: "Actions",
    ROLES: "Roles",
    ORGANIZATIONS: "Organizations",
  } as const

  const getTab = (pageTab?: mamagenentTabType) => {
    switch (pageTab) {
      case "actions":
        return tabEnums.ACTIONS
      case "organizations":
        return tabEnums.ORGANIZATIONS
      case "roles":
        return tabEnums.ROLES
      default:
        return tabEnums.USERS
    }
  }
  const getPageTab = (pageTab?: (typeof tabEnums)[keyof typeof tabEnums]) => {
    switch (pageTab) {
      case "Actions":
        return managementTabEnums.ACTIONS
      case "Organizations":
        return managementTabEnums.ORGANIZATIONS
      case "Roles":
        return managementTabEnums.ROLES
      default:
        return managementTabEnums.USERS
    }
  }

  const actions = props as unknown as IAction

  const [tab, setTab] = useState<string>(getTab(pageTab))

  const filterTab = (i: string) =>
    GODUSER
      ? i
      : ISSUPERADMIN
      ? i !== tabEnums.ORGANIZATIONS && i !== tabEnums.ACTIONS
      : false
  return (
    <div className="main-page">
      <div className="pg-container">
        <div className="mb-5">
          <div className="tab-section">
            <div className="tab-header">
              {Object.values(tabEnums)
                .filter(filterTab)
                .map((i, index) => (
                  <div
                    className={`tab-item ${i === tab ? "active" : ""}`}
                    key={index}
                    onClick={() => {
                      navigate(`${url.MANAGEMENT}/${getPageTab(i)}`)
                      setTab(i)
                    }}
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
              {tab === tabEnums.ROLES ? (
                <RolePage states={states} actions={actions} />
              ) : null}
              {tab === tabEnums.ORGANIZATIONS ? (
                <OrganizationPage states={states} actions={actions} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminManagement
