import React, { useState } from "react"
import "./index.scss"
import "../global.scss"
import AdminReport from "../admin-reports"
import { ISSUPERADMIN } from "utils/new/constants"

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
}: {
  children?: any
  section: typeAdminSections
  data?: Array<{ [key: string]: any }>
}) => {
  const tabEnums = { REPORTS: "All Reports", FEED: "Feed" }

  const [tab, setTab] = useState<string>(tabEnums.REPORTS)

  return (
    <>
      {ISSUPERADMIN ? (
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
                <AdminReport data={{ title: section, data: data || [] }} />
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
