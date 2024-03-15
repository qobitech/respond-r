import React, { useEffect, useState } from "react"
import "./index.scss"
import { TypeInput } from "utils/new/input"
import { TypeButton } from "utils/new/button"
import { TypeSelect } from "utils/new/select"
import ReportTable, { ITableRecord } from "utils/new/report-table"
import { ILocationDetails, NoMediaComponent } from "../traffic"
import { IReport, IReports } from "interfaces/IReport"
import { MainView } from "../components"
import RightSection, {
  IRightSection,
  useRightSection,
} from "components/reusable/right-section"
import { PulseSVG, RefreshSVG } from "utils/new/svgs"
import { IAsset, IAssets } from "interfaces/IAsset"
import { CopyComponent, useCopy } from "utils/new/hook"
import moveable from "../../../extras/images/moveable.svg"
import fixed from "../../../extras/images/fixed.svg"

interface IReportData<T> {
  title: string
  data: T[]
}

export const getReportStatusBg = (status: string) => {
  //     Assigned (blue)
  // Accepted (yellow)
  // Closed (green)
  // Ignored (---)
  switch (status.toLowerCase()) {
    case "new":
      return "red"
    case "assigned":
      return "blue"
    case "accepted":
      return "yellow"
    case "closed":
      return "green"
    default:
      return "grey"
  }
}

export const getTime = (date: string) => {
  const currentDate = new Date(date)
  const hours = currentDate.getHours()
  const minutes = currentDate.getMinutes()
  const seconds = currentDate.getSeconds()
  const amPM = hours >= 12 ? "PM" : "AM" // Determine AM/PM

  // Convert hours to 12-hour format
  const formattedHours = hours % 12 || 12

  // Ensure minutes and seconds are displayed with leading zeros if less than 10
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${amPM}`
}

const AdminReport = <T extends { [key: string]: any }>({
  data,
  reports,
  fetchReports,
  fetchAssets,
  loadReports,
  showHeader,
  assets,
  linkAsset,
}: {
  data: IReportData<T>
  reports: IReports
  assets: IAssets
  fetchReports: (sort?: "asc" | "desc") => void
  fetchAssets: () => void
  loadReports: boolean
  loadAssets: boolean
  showHeader: boolean
  linkAsset: (assetId: string) => void
}) => {
  const [selectedReport, setSelectedReport] = useState<IReport | null>(null)

  const rsProps = useRightSection<IReport>(undefined, undefined, () => {
    // setSelectedReport(null)
  })
  interface ObjectType {
    [key: string]: IReport[]
  }

  const reportsGroupedByDate = reports?.data?.reduce((acc, obj) => {
    const date: string = obj.createdAt.split("T")[0]
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(obj)
    return acc
  }, {} as ObjectType)

  const getTableReport = (data: IReport[]): ITableRecord[] => {
    if (!data) return []
    return data?.map((report) => {
      const isSelected = report.id === selectedReport?.id
      return {
        id: "1",
        isSelected,
        row: [
          {
            value: getTime(report.updatedAt),
            isLink: false,
            action: () => {
              if (!isSelected)
                rsProps.callSection("custom", "report", report.id, report)
              setSelectedReport(isSelected ? null : report)
            },
          },
          {
            value: report.description,
            isLink: false,
            action: () => {
              if (!isSelected)
                rsProps.callSection("custom", "report", report.id, report)
              setSelectedReport(isSelected ? null : report)
            },
            textLength: 25,
            cellWidth: "180px",
            classProps: "pl-2 lh-base",
          },
          {
            value: report.nearestPlace,
            isLink: false,
            action: () => {
              if (!isSelected)
                rsProps.callSection("custom", "report", report.id, report)
              setSelectedReport(isSelected ? null : report)
            },
          },
          {
            value: "",
            isLink: false,
            dangerouselySetHtml: `<div style="width: 12px; height: 12px; border-radius: 50%; background: ${getReportStatusBg(
              report.status
            )}" title="${report.status}"></div>`,
          },
        ],
        rowActions: [],
      }
    })
  }

  useEffect(() => {
    fetchReports()
    fetchAssets()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [copyProps] = useCopy()

  const getSelectedReport = (selectedReport: IReport) => ({
    location: {
      latitude: parseFloat(selectedReport.latitude || "0"),
      longitude: parseFloat(selectedReport.longitude || "0"),
    },
    map: selectedReport.map,
    nearestPlace: selectedReport.nearestPlace,
    markerContent: (
      <p
        className="d-flex text-decoration-underline"
        style={{ cursor: "pointer" }}
        onClick={() => {
          rsProps.callSection(
            "custom",
            "report",
            selectedReport.id,
            selectedReport
          )
          setSelectedReport(selectedReport)
        }}
      >
        {selectedReport.nearestPlace}
      </p>
    ),
    markerColor: getReportStatusBg(selectedReport.status),
  })

  const getSelectedAsset = (selectedAsset: IAsset) => ({
    location: {
      latitude: parseFloat(selectedAsset.location.latitude || "0"),
      longitude: parseFloat(selectedAsset.location.longitude || "0"),
    },
    map: selectedAsset.location.map,
    nearestPlace: selectedAsset.location.nearestPlace,
    markerContent: (
      <div
        onClick={() => {
          copyProps.setUrl(selectedAsset.id)
          linkAsset(selectedAsset.id)
        }}
      >
        <p className="d-flex m-0" style={{ cursor: "pointer" }}>
          <span style={{ width: "70px" }}>asset:</span> {selectedAsset.type}
        </p>
        <p className="d-flex m-0" style={{ cursor: "pointer" }}>
          <span style={{ width: "70px" }}>title:</span> {selectedAsset.name}
        </p>
        <p className="d-flex m-0" style={{ cursor: "pointer" }}>
          <span style={{ width: "70px" }}>contact:</span>{" "}
          {selectedAsset.contact.name}
        </p>
      </div>
    ),
    markerColor: getReportStatusBg(selectedAsset.status),
    iconUrl: selectedAsset.category === "fixed" ? fixed : moveable,
    iconSize: [20, 20],
  })

  const defaultDetails = [
    { location: { latitude: 1, longitude: 1 }, map: "", nearestPlace: "" },
  ]
  const allReports = !reports
    ? defaultDetails
    : reports?.data.map(getSelectedReport)
  const allAssets = !assets
    ? defaultDetails
    : assets?.data.map(getSelectedAsset)

  const getLocationDetails = (): ILocationDetails[] => {
    return [...allReports, ...allAssets]
  }

  return (
    <>
      <CopyComponent {...copyProps} />
      <RightSection rsProps={rsProps}>
        {rsProps.isView("custom", "report") ? <ViewReport /> : null}
      </RightSection>
      <div className="admin-report-section">
        <div className={`admin-report-header ${!showHeader ? "d-none" : ""}`}>
          <div className="d-flex align-items-center" style={{ gap: "20px" }}>
            <h1>{data.title} Reports</h1>
            <div
              style={{ width: "max-content", height: "max-content" }}
              role="button"
              title="Refresh Reports"
              onClick={() => fetchReports()}
            >
              {loadReports ? <PulseSVG /> : <RefreshSVG />}
            </div>
          </div>
          <FilterSection />
        </div>
        <div className="admin-report-body">
          <div className="admin-report">
            <div className="admin-report-left">
              <NoMediaComponent
                locationDetails={
                  selectedReport
                    ? [getSelectedReport(selectedReport), ...allAssets]
                    : getLocationDetails() || [{ latitude: 1, longitude: 1 }]
                }
                load={false}
                key={selectedReport ? selectedReport.id : reports?.data?.length}
                defaultZoom={selectedReport ? 10 : 6.5}
              />
            </div>
            <div className="admin-report-right">
              {reportsGroupedByDate ? (
                <div className="table-wrapper">
                  {Object.values(reportsGroupedByDate)?.map((report, index) => (
                    <TableWrapper
                      title={Object.keys(reportsGroupedByDate)[index]}
                      key={index}
                    >
                      <ReportTable
                        header={["Time", "Report", "Location", "Status"]}
                        record={getTableReport(report)}
                        hideNumbering
                      />
                    </TableWrapper>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const TableWrapper = ({
  title,
  children,
}: {
  title: string
  children?: any
}) => {
  const [toggle, setToggle] = useState<boolean>(true)
  return (
    <div className="table-wrapper-box">
      <div
        className="table-wrapper-box-header"
        onClick={() => setToggle(!toggle)}
      >
        <p>{new Date(title).toDateString()}</p>
        <p>
          <span>
            <i className={`fas fa-angle-${toggle ? "down" : "up"}`} />
          </span>
        </p>
      </div>
      {toggle ? (
        <div className={`table-wrapper-box-body`}>{children}</div>
      ) : null}
    </div>
  )
}

const ViewReport = ({ rsProps }: { rsProps?: IRightSection<IReport> }) => {
  return <MainView feed={rsProps?.data!} />
}

export default AdminReport

const FilterSection = () => {
  return (
    <div className="admin-filter-section">
      <TypeSelect
        initoption={{ label: "All reports", value: "" }}
        optionsdata={[
          { id: 1, label: "Un-assigned reports", value: "unassigned" },
          { id: 2, label: "Assigned reports", value: "assigned" },
          { id: 3, label: "Rejected reports", value: "rejected" },
        ]}
      />
      <TypeInput placeholder="Search report or location" />
      <TypeButton buttonSize="small" title="Search" />
    </div>
  )
}

export const ReportStatus = ({ reportStatus }: { reportStatus: string[] }) => {
  return (
    <div className="d-flex align-items-center" style={{ gap: "20px" }}>
      {reportStatus.map((i, index) => (
        <ReportStatusItem status={i} key={index} />
      ))}
    </div>
  )
}

const ReportStatusItem = ({ status }: { status: string }) => {
  return (
    <div className="d-flex align-items-center" style={{ gap: "5px" }}>
      <div
        style={{
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          background: getReportStatusBg(status),
        }}
        title={status}
      ></div>
      <p className="m-0 text-color" style={{ fontSize: "0.7rem" }}>
        {status}
      </p>
    </div>
  )
}
