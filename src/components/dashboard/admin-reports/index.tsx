import React from "react"
import "./index.scss"
import { TypeInput } from "utils/new/input"
import { TypeButton } from "utils/new/button"
import { TypeSelect } from "utils/new/select"
import ReportTable, { ITableRecord } from "utils/new/report-table"
import { NoMediaComponent } from "../traffic"

interface IReportData<T> {
  title: string
  data: T[]
}

const AdminReport = <T extends { [key: string]: any }>({
  data,
}: {
  data: IReportData<T>
}) => {
  const tableReport: ITableRecord[] = new Array(20).fill({
    id: "1",
    row: [
      {
        value: "17:59",
        isLink: false,
      },
      {
        value: "Bandit attack!",
        isLink: false,
      },
      {
        value: "Lagos - Surulere",
        isLink: false,
      },
    ],
    rowActions: [
      {
        value: "Assign",
        isLink: true,
      },
    ],
  })

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
              lat={8.955007553100586}
              lng={7.371120452880859}
              load={false}
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

// const AdminReportItem = <T extends { [key: string]: any }>({
//   data,
// }: {
//   data: T
// }) => {
//   return (
//     <div className="admin-report-item">
//       <div className="admin-report-item-media">
//         <img src={data.imgsrc || ""} alt="" />
//       </div>
//       <div className="admin-report-item-title">
//         <p>Title</p>
//       </div>
//       <div className="admin-report-item-location">
//         <LocationSVG />
//         <p>Location</p>
//       </div>
//       {/* <div className="admin-report-item-info">
//         <TypeSmallButton title="Assign" />
//       </div> */}
//     </div>
//   )
// }

const FilterSection = () => {
  return (
    <div className="admin-filter-section">
      <TypeSelect
        initoption={{ label: "All reports", value: "" }}
        optionsdata={[
          { id: 1, label: "Un-assigned reports", value: "unassigned" },
          { id: 2, label: "Assigned reports", value: "assigned" },
          { id: 2, label: "Rejected reports", value: "rejected" },
        ]}
      />
      <TypeInput placeholder="Search report or location" />
      <TypeButton buttonSize="small" title="Search" />
    </div>
  )
}
