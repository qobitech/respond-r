import React from "react"
import "./index.scss"
import { IStates } from "interfaces/IReducer"
import "../../../../utils/new/pagination.scss"
import "../../../../utils/new/page.scss"
import CardTable from "components/reusable/card-table"
import RightSection, {
  actionComponent,
  useRightSection,
} from "components/reusable/right-section"
import FilterComponent, { IFilterData } from "components/reusable/filter"
import { ITableRecord } from "components/dashboard/overview"

interface IProps {
  states?: IStates
}
const APIConfiguration: React.FC<IProps> = ({ states, ...props }) => {
  const rsProps = useRightSection()
  const component: actionComponent = "api configuration"
  const tableData: ITableRecord[] = [
    {
      id: "1",
      row: [
        {
          value: "001",
          isLink: false,
          url: "",
          action: () => {},
        },
        {
          value: "POST",
          isLink: false,
          url: "",
          action: () => {},
        },
        {
          value: "GET vehicle details",
          isLink: false,
          url: "",
          action: () => {},
        },
        {
          value: "/api/vehicle/plate",
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
    <div className="pg-container">
      <CardTable
        cta={[
          {
            title: "CREATE API CONFIGURATION",
            action: () => {
              rsProps.callSection("create", component)
            },
          },
        ]}
        tableData={tableData}
        tableHeader={[
          "Group Code",
          "Category",
          "API Name",
          "API Route",
          "Action",
        ]}
        tag="Lorem ipsum"
        title="API Configurations"
        handlePagination={handlePagination}
        isFilter
        inner
      >
        <FilterComponent {...filterProps} />
      </CardTable>
      <RightSection {...rsProps}>
        <div>
          {rsProps.action.type === "create" && <></>}
          {rsProps.action.type === "view" && <></>}
        </div>
      </RightSection>
    </div>
  )
}

export default APIConfiguration
