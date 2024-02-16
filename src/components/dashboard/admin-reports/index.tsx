import React from "react"
import "./index.scss"
import { TypeInput } from "utils/new/input"
import { TypeButton } from "utils/new/button"
import { TypeSelect } from "utils/new/select"
import ReportTable, { ITableRecord } from "utils/new/report-table"
import { NoMediaComponent } from "../traffic"
import { IReports } from "interfaces/IReport"

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
  // const tableReport: ITableRecord[] = new Array(20).fill({
  //   id: "1",
  //   row: [
  //     {
  //       value: "17:59",
  //       isLink: false,
  //     },
  //     {
  //       value: "Bandit attack!",
  //       isLink: false,
  //     },
  //     {
  //       value: "Lagos - Surulere",
  //       isLink: false,
  //     },
  //   ],
  //   rowActions: [
  //     {
  //       value: "Assign",
  //       isLink: true,
  //     },
  //   ],
  // })

  const tableReport: ITableRecord[] = reports?.data?.map((report) => ({
    id: "1",
    row: [
      {
        value: new Date(report.updatedAt).toDateString(),
        isLink: false,
      },
      {
        value: report.description,
        isLink: false,
      },
      {
        value: report.state + " - " + report.nearestPlace,
        isLink: false,
      },
    ],
    rowActions: [
      {
        value: "Assign",
        isLink: true,
      },
    ],
  }))

  return (
    <div className="admin-report-section">
      <div className="admin-report-header">
        <h1>{data.title} Reports</h1>
        <FilterSection />
      </div>
      <div className="admin-report-body">
        <div className="admin-report">
          <div className="admin-report-left">
            <NoMediaComponent
              location={
                reports?.data.map((report) => ({
                  latitude: parseFloat(report.latitude || "0"),
                  longitude: parseFloat(report.longitude || "0"),
                })) || [{ latitude: 1, longitude: 1 }]
              }
              load={false}
              key={reports?.data?.length}
            />
          </div>
          <div className="admin-report-right">
            <div className="table-wrapper">
              <ReportTable
                header={["Time", "Report", "Location", "Action"]}
                record={tableReport}
                hideNumbering
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
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
