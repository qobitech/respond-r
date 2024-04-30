/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useRef, useState } from "react"
import "./index.scss"
import "../global.scss"
import AdminReport, { ObjectType, ReportStatus } from "../admin-reports"
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
  addAsset,
  linkAsset,
}: {
  children?: any
  section: typeAdminSections
  data?: Array<{ [key: string]: any }>
  addAsset: () => void
  linkAsset: (assetId: string) => void
}) => {
  const { state, fetchReports, fetchAssets, organization } = useGlobalContext()
  if (!state) return <></>

  const reports = state?.report.getAllReports
  const loadReports = state?.report.getAllReportsLoading

  const createAssetLoading = false

  const [tab, setTab] = useState<string>(tabEnums.REPORTS)
  const [showHeader, setShowHeader] = useState<boolean>(false)

  const [localReports, setLocalReports] = useState<IReports | null>(null)
  const [groupedReports, setGroupedReports] = useState<ObjectType>({})

  const hasmore =
    state?.report?.getAllReports?.currentPage *
      state?.report?.getAllReports?.pageSize <
    state?.report?.getAllReports?.total

  const lastCardElementRef = useRef<HTMLTableRowElement>(null)

  const observer = useInfiniteScroll(
    lastCardElementRef,
    { threshold: 0.5 },
    () => {
      if (hasmore) fetchReports?.()
    }
  )

  const groupReports = (reports: IReports) => {
    setGroupedReports((prev) => {
      prev =
        reports?.data?.reduce((acc, obj) => {
          const date: string = obj.createdAt.split("T")[0]
          if (!acc[date]) {
            acc[date] = []
          }
          acc[date].push(obj)
          return acc
        }, {} as ObjectType) || {}
      return prev
    })
  }

  const combineReports = () => {
    if (!localReports) {
      setLocalReports(() => reports)
      groupReports(reports)
    } else {
      const { data: newData, ...rest } = reports
      const { data: oldData } = localReports

      // Replace old data with new data if their IDs match
      const updatedData = oldData.map((oldItem) => {
        const matchingNewItem = newData.find(
          (newItem) => newItem.id === oldItem.id
        )
        return matchingNewItem || oldItem
      })

      // Merge new items that don't have the same ID as old items
      const newItemsToAdd = newData.filter(
        (newItem) => !oldData.some((oldItem) => oldItem.id === newItem.id)
      )

      const combinedData = [...updatedData, ...newItemsToAdd]

      const newReport = { ...rest, data: combinedData }
      if (newReport.data !== reports.data) {
        setLocalReports(() => newReport)
        groupReports(newReport)
      }
    }
  }

  const updateLocalReportStatusByID = (id: string, status: string) => {
    setLocalReports((prev) => {
      if (!prev) return null
      const reportIndex = prev.data.map((i) => i.id).indexOf(id)
      if (reportIndex === -1) return prev
      prev.data[reportIndex].status = status
      return prev
    })
  }

  useEffect(() => {
    if (!loadReports) {
      if (lastCardElementRef.current) {
        observer.current?.observe(lastCardElementRef.current)
      }
      combineReports()
    } else {
      observer.current?.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadReports])

  useEffect(() => {
    if (organization !== null) {
      setLocalReports(null)
      fetchReports?.(1)
      fetchAssets?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organization])

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
                  loadReports={loadReports}
                  showHeader={showHeader}
                  linkAsset={linkAsset}
                  lastCardElementRef={lastCardElementRef}
                  updateLocalReportStatusByID={updateLocalReportStatusByID}
                  groupedReports={groupedReports}
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
  fetchReports?: (page?: number) => void
  fetchAssets?: () => void
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
              fetchReports?.(1)
              fetchAssets?.()
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
