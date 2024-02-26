import React, { useEffect, useState } from "react"
import "./index.scss"
import "../global.scss"
import AdminReport from "../admin-reports"
import { ISSUPERADMIN } from "utils/new/constants"
import { GODUSER } from "utils/new/constants/roles"
import { IAction } from "interfaces/IAction"
import { IStates } from "interfaces/IReducer"

export const adminSections = {
  TRAFFIC: "E-traffic",
  POLICE: "E-police",
  FIRE_DEPARTMENT: "E-fire department",
  HEALTHCARE: "E-healthcare",
} as const

export type typeAdminSections =
  (typeof adminSections)[keyof typeof adminSections]

const AdminWrapper = ({
  children,
  section,
  data,
  actions,
  states,
  organization,
}: {
  children?: any
  section: typeAdminSections
  data?: Array<{ [key: string]: any }>
  actions: IAction
  states: IStates
  organization: "Fire" | "Police" | "Medical"
}) => {
  const reports = states.report.getAllReports
  const loadReports = states.report.getAllReportsLoading

  const fetchReports = () => {
    actions.getAllReports(organization)
  }

  useEffect(() => {
    fetchReports()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const tabEnums = { REPORTS: "All Reports", FEED: "Feed" }

  const [tab, setTab] = useState<string>(tabEnums.REPORTS)

  return (
    <>
      {GODUSER || ISSUPERADMIN ? (
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
              {tab === tabEnums.REPORTS ? (
                <AdminReport
                  data={{ title: section, data: data || [] }}
                  reports={reports}
                  fetchReports={fetchReports}
                  loadReports={loadReports}
                />
              ) : null}
              {tab === tabEnums.FEED ? children : null}
            </div>
          </div>
        </div>
      ) : (
        children
      )}
    </>
  )
}

export default AdminWrapper
