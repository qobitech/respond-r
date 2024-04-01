import React, { useState } from "react"
import "./index.scss"
import "../global.scss"
import AdminReport, { ReportStatus } from "../admin-reports"
import { ISSUPERADMIN } from "utils/new/constants"
import { GODUSER } from "utils/new/constants/roles"
import { IStates } from "interfaces/IReducer"
import { PlusSVG, PulseSVG, RefreshSVG } from "utils/new/svgs"
import { useInfiniteScroll } from "utils/new/hook"
import { IRightSection } from "components/reusable/right-section"
import { IReport } from "interfaces/IReport"

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
  states,
  fetchReports,
  fetchAssets,
  addAsset,
  linkAsset,
  rsProps,
}: {
  children?: any
  section: typeAdminSections
  data?: Array<{ [key: string]: any }>
  states: IStates
  fetchReports: (page?: number) => void
  fetchAssets: () => void
  addAsset: () => void
  linkAsset: (assetId: string) => void
  rsProps: IRightSection<IReport>
}) => {
  const reports = states.report.getAllReports
  const loadReports = states.report.getAllReportsLoading
  const assets = states.asset.getAllAssets
  const loadAssets = states.asset.getAllAssetsLoading
  const createAssetLoading = false
  const hasmore =
    states?.report?.getAllReports?.currentPage <
    states?.report?.getAllReports?.lastPage

  const tabEnums = { REPORTS: "All Reports", FEED: "Feed" }

  const [tab, setTab] = useState<string>(tabEnums.REPORTS)
  const [showHeader, setShowHeader] = useState<boolean>(false)

  const [lastCardElementRef] = useInfiniteScroll(loadReports!, hasmore, () => {
    fetchReports(1)
  })

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

              <div
                className={`ml-auto pr-4 align-items-center ${
                  tab !== tabEnums.REPORTS ? "d-none" : "d-flex"
                }`}
                style={{ gap: "50px" }}
              >
                <div className="video-section-header-tab">
                  <button onClick={() => addAsset()} className="border-0">
                    ADD ASSET&nbsp;&nbsp;&nbsp;
                    {createAssetLoading ? <PulseSVG /> : <PlusSVG />}
                  </button>
                  <button
                    onClick={() => {
                      fetchReports()
                      fetchAssets()
                    }}
                  >
                    REFRESH&nbsp;&nbsp;&nbsp;
                    {loadReports ? <PulseSVG /> : <RefreshSVG />}
                  </button>
                  <button
                    className={showHeader ? "active" : ""}
                    onClick={() => {
                      setShowHeader(!showHeader)
                    }}
                  >
                    {showHeader ? "HIDE" : "SHOW"} FILTER
                  </button>
                </div>
                <ReportStatus
                  reportStatus={[
                    "New",
                    "Assigned",
                    "Accepted",
                    "Closed",
                    "Rejected",
                  ]}
                />
              </div>
            </div>
            <div className="tab-body">
              {tab === tabEnums.REPORTS ? (
                <AdminReport
                  data={{ title: section, data: data || [] }}
                  reports={reports}
                  assets={assets}
                  fetchReports={fetchReports}
                  loadReports={loadReports}
                  loadAssets={loadAssets}
                  showHeader={showHeader}
                  fetchAssets={fetchAssets}
                  linkAsset={linkAsset}
                  lastCardElementRef={lastCardElementRef}
                  rsProps={rsProps}
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
