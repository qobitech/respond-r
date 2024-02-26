import React, { useEffect } from "react"
import "./index.scss"
import { TypeInput } from "utils/new/input"
import { TypeButton } from "utils/new/button"
import { TypeSelect } from "utils/new/select"
import ReportTable, { ITableRecord } from "utils/new/report-table"
import { NoMediaComponent } from "../traffic"
import { IReport, IReports } from "interfaces/IReport"
import { MainView } from "../components"
import RightSection, {
  IRightSection,
  useRightSection,
} from "components/reusable/right-section"
import { PulseSVG, RefreshSVG } from "utils/new/svgs"

interface IReportData<T> {
  title: string
  data: T[]
}

const AdminReport = <T extends { [key: string]: any }>({
  data,
  reports,
  fetchReports,
  loadReports,
}: {
  data: IReportData<T>
  reports: IReports
  fetchReports: () => void
  loadReports: boolean
}) => {
  const rsProps = useRightSection<IReport>()

  const getTime = (date: string) => {
    const currentDate = new Date(date)
    const hours = currentDate.getHours()
    const minutes = currentDate.getMinutes()
    const seconds = currentDate.getSeconds()

    return `${hours}:${minutes}:${seconds}`
  }

  const getReportStatusBg = (status: string) => {
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

  const tableReport: ITableRecord[] = reports?.data?.map((report) => ({
    id: "1",
    row: [
      {
        value: getTime(report.updatedAt),
        isLink: false,
        action: () => {
          rsProps.callSection("custom", "report", report.id, report)
        },
      },
      {
        value: report.description,
        isLink: false,
        action: () => {
          rsProps.callSection("custom", "report", report.id, report)
        },
        textLength: 25,
        cellWidth: "180px",
        classProps: "pl-2 lh-base",
      },
      {
        value: report.nearestPlace,
        isLink: false,
        action: () => {
          rsProps.callSection("custom", "report", report.id, report)
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
    rowActions: [
      // {
      //   value: "Assign",
      //   isLink: true,
      // },
    ],
  }))

  useEffect(() => {
    fetchReports()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <RightSection rsProps={rsProps}>
        {rsProps.isView("custom", "report") ? <ViewReport /> : null}
      </RightSection>
      <div className="admin-report-section">
        <div className="admin-report-header">
          <div className="d-flex align-items-center" style={{ gap: "20px" }}>
            <h1>{data.title} Reports</h1>
            <div
              style={{ width: "max-content", height: "max-content" }}
              role="button"
              title="Refresh Reports"
              onClick={fetchReports}
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
                  reports?.data.map((report) => ({
                    location: {
                      latitude: parseFloat(report.latitude || "0"),
                      longitude: parseFloat(report.longitude || "0"),
                    },
                    map: report.map,
                    nearestPlace: report.nearestPlace,
                  })) || [{ latitude: 1, longitude: 1 }]
                }
                load={false}
                key={reports?.data?.length}
              />
            </div>
            <div className="admin-report-right">
              <div className="table-wrapper">
                <ReportTable
                  header={["Time", "Report", "Location", "Status"]}
                  record={tableReport}
                  hideNumbering
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
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
