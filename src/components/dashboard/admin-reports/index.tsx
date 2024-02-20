import React from "react"
import "./index.scss"
import { TypeInput } from "utils/new/input"
import { TypeButton } from "utils/new/button"
import { TypeSelect } from "utils/new/select"
import ReportTable, { ITableRecord } from "utils/new/report-table"
import { NoMediaComponent } from "../traffic"
import { IReport, IReports } from "interfaces/IReport"
import { MainView } from "../e-medical"
import RightSection, {
  IRightSection,
  useRightSection,
} from "components/reusable/right-section"

interface IReportData<T> {
  title: string
  data: T[]
}

const AdminReport = <T extends { [key: string]: any }>({
  data,
  reports,
}: {
  data: IReportData<T>
  reports: IReports
}) => {
  const rsProps = useRightSection<IReport>()

  const tableReport: ITableRecord[] = reports?.data?.map((report) => ({
    id: "1",
    row: [
      {
        value: new Date(report.updatedAt)
          .toDateString()
          .split(" ")
          .filter((_, index) => index !== 0 && index !== 3)
          .join(" "),
        isLink: false,
        action: () => {
          rsProps.callSection("custom", "report", report.id, report)
        },
      },
      {
        value:
          report.description.substring(0, 25) +
          (report.description.length > 25 ? "..." : ""),
        isLink: false,
        action: () => {
          rsProps.callSection("custom", "report", report.id, report)
        },
      },
      {
        value: report.nearestPlace,
        isLink: false,
        action: () => {
          rsProps.callSection("custom", "report", report.id, report)
        },
      },
    ],
    rowActions: [
      // {
      //   value: "Assign",
      //   isLink: true,
      // },
    ],
  }))

  return (
    <>
      <RightSection rsProps={rsProps}>
        {rsProps.isView("custom", "report") ? <ViewReport /> : null}
      </RightSection>
      <div className="admin-report-section">
        <div className="admin-report-header">
          <h1>{data.title} Reports</h1>
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
                  header={["Time", "Report", "Location"]}
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
