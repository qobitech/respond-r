import React from "react"
import "./index.scss"
import { IStates } from "interfaces/IReducer"
import "../../../utils/new/pagination.scss"
import "../../../utils/new/page.scss"
import CardTable from "components/reusable/card-table"
import RightSection, {
  actionComponent,
  useRightSection,
} from "components/reusable/right-section"
import { ITableRecord } from "../overview"
import CreateApplication from "./create"
import ViewApplication from "./view"
import FilterComponent, { IFilterData } from "components/reusable/filter"

interface IProps {
  states?: IStates
}
const AppSecurity: React.FC<IProps> = ({ states, ...props }) => {
  const rsProps = useRightSection()
  const component: actionComponent = "role"
  const tableData: ITableRecord[] = [
    {
      id: "1",
      row: [
        {
          value: "Admin",
          isLink: false,
          url: "",
          action: () => {},
        },
        {
          value: "eChithub",
          isLink: false,
          url: "",
          action: () => {},
        },
        {
          value: "All privileges",
          isLink: false,
          url: "",
          action: () => {},
        },
      ],
      rowActions: [
        {
          value: "View",
          isLink: true,
          url: "",
          action: () => {
            rsProps.callSection("view", component)
          },
          buttonType: "bold",
        },
        {
          value: "Edit",
          isLink: true,
          url: "",
          action: () => {
            rsProps.callSection("update", component)
          },
          buttonType: "bold",
        },
        {
          value: "Delete",
          isLink: true,
          url: "",
          action: () => {
            rsProps.callSection("delete", component)
          },
          buttonType: "danger",
        },
      ],
    },
    {
      id: "1",
      row: [
        {
          value: "Testing BD",
          isLink: false,
          url: "",
          action: () => {},
        },

        {
          value: "12 May, 2023",
          isLink: false,
          url: "",
          action: () => {},
        },
        {
          value: "Preparing end user manual",
          isLink: false,
          url: "",
          action: () => {},
        },
      ],
      rowActions: [
        {
          value: "View",
          isLink: true,
          url: "",
          action: () => {
            rsProps.callSection("view", component)
          },
          buttonType: "bold",
        },
        {
          value: "Edit",
          isLink: true,
          url: "",
          action: () => {
            rsProps.callSection("update", component)
          },
          buttonType: "bold",
        },
        {
          value: "Delete",
          isLink: true,
          url: "",
          action: () => {
            rsProps.callSection("delete", component)
          },
          buttonType: "danger",
        },
      ],
    },
  ]
  const handlePagination = (selectedItem: { selected: number }) => {}
  const handleFilter = () => {}
  const handleFilterClear = () => {}
  const filterData: IFilterData[] = [
    {
      placeholder: "application name",
      type: "text",
      value: "",
    },
    {
      placeholder: "client id",
      type: "text",
      value: "",
    },
    {
      placeholder: "ennvironment type",
      type: "text",
      value: "",
    },
  ]
  const filterProps = {
    handleFilter,
    handleFilterClear,
    filterData,
  }
  return (
    <div className="main-page">
      <div className="pg-container">
        <CardTable
          cta={[
            {
              title: "CREATE ROLE",
              action: () => {
                rsProps.callSection("create", component)
              },
            },
          ]}
          tableData={tableData}
          tableHeader={["Name", "Category", "Description", "Action"]}
          tag="Lorem ipsum"
          title="Roles"
          handlePagination={handlePagination}
          isFilter
        >
          <FilterComponent {...filterProps} />
        </CardTable>
        <RightSection rsProps={rsProps}>
          <>
            {(rsProps.isView("create", "role") ||
              rsProps.isView("update", "role")) && <CreateApplication />}
            {(rsProps.isView("view", "role") ||
              rsProps.isView("delete", "role")) && <ViewApplication />}
          </>
        </RightSection>
      </div>
    </div>
  )
}

export default AppSecurity
