/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react"
import "./index.scss"
import "../global.scss"
import AdminReport, { ReportStatus } from "../admin-reports"
import { ISSUPERADMIN } from "utils/new/constants"
import { GODUSER } from "utils/new/constants/roles"
import { PlusSVG, PulseSVG, RefreshSVG } from "utils/new/svgs"
import { useInfiniteScroll } from "utils/new/hook"
import { IReports } from "interfaces/IReport"
import { useGlobalContext } from "components/layout"

const tabEnums = { REPORTS: "All Reports", FEED: "Feed" }

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
  fetchReports,
  addAsset,
  linkAsset,
  organization,
}: {
  children?: any
  section: typeAdminSections
  data?: Array<{ [key: string]: any }>
  fetchReports: (page?: number) => void
  addAsset: () => void
  linkAsset: (assetId: string) => void
  organization: "Police" | "Fire" | "Medical"
}) => {
  const { action, state } = useGlobalContext()
  if (!state) return <></>

  const fetchAssets = () => {
    action?.getAssets()
  }

  const reports = state?.report.getAllReports
  const loadReports = state?.report.getAllReportsLoading

  const createAssetLoading = false

  const [tab, setTab] = useState<string>(tabEnums.REPORTS)
  const [showHeader, setShowHeader] = useState<boolean>(false)

  const [localReports, setLocalReports] = useState<IReports | null>(null)
  const [continuePagination, setContinuePagination] = useState<boolean>(false)

  const hasmore =
    continuePagination &&
    state?.report?.getAllReports?.currentPage *
      state?.report?.getAllReports?.pageSize <
      state?.report?.getAllReports?.total

  const [lastCardElementRef] = useInfiniteScroll(loadReports!, hasmore, () => {
    fetchReports(1)
  })

  const combineReports = () => {
    setContinuePagination(false)
    if (!localReports) {
      setLocalReports(() => reports)
    } else {
      const { data, ...rest } = reports
      const { data: oldData } = localReports
      const combinedData = [...oldData, ...data]
      const newReport = { ...rest, data: combinedData }
      if (newReport.data !== reports.data) {
        setLocalReports(() => newReport)
        setContinuePagination(true)
      }
    }
  }

  useEffect(() => {
    if (!loadReports) {
      combineReports()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadReports])

  return (
    <>
      {GODUSER || ISSUPERADMIN ? (
        <div className="mb-5">
          <div className="tab-section">
            <div className="tab-header">
              <Header
                addAsset={addAsset}
                createAssetLoading={createAssetLoading}
                fetchAssets={fetchAssets}
                fetchReports={fetchReports}
                loadReports={loadReports}
                setShowHeader={setShowHeader}
                setTab={setTab}
                showHeader={showHeader}
                tab={tab}
              />
            </div>
            <div className="tab-body">
              {tab === tabEnums.REPORTS ? (
                <AdminReport
                  data={{ title: section, data: data || [] }}
                  reports={localReports!}
                  fetchReports={fetchReports}
                  loadReports={loadReports}
                  showHeader={showHeader}
                  fetchAssets={fetchAssets}
                  linkAsset={linkAsset}
                  lastCardElementRef={lastCardElementRef}
                  organization={organization}
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

interface IHeader {
  setTab: (tab: string) => void
  setShowHeader: (showHeader: boolean) => void
  showHeader: boolean
  tab: string
  createAssetLoading: boolean
  loadReports: boolean
  fetchReports: (page?: number) => void
  fetchAssets: () => void
  addAsset: () => void
}

const Header: React.FC<IHeader> = ({
  setTab,
  tab,
  createAssetLoading,
  setShowHeader,
  showHeader,
  loadReports,
  fetchAssets,
  fetchReports,
  addAsset,
}) => {
  return (
    <>
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
          reportStatus={["New", "Assigned", "Accepted", "Closed", "Rejected"]}
        />
      </div>
    </>
  )
}

export default AdminWrapper
