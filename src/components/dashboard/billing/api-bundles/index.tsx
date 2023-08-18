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
const APIBundles: React.FC<IProps> = ({ states, ...props }) => {
  const rsProps = useRightSection()
  const component: actionComponent = "api bundle"
  const tableData: ITableRecord[] = [
    {
      id: "1",
      row: [
        {
          value: "PLAT",
          isLink: false,
          url: "",
          action: () => {},
        },
        {
          value: "Platinum",
          isLink: false,
          url: "",
          action: () => {},
        },
        {
          value: "#5,000",
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
      id: "2",
      row: [
        {
          value: "DIA",
          isLink: false,
          url: "",
          action: () => {},
        },

        {
          value: "Diamond",
          isLink: false,
          url: "",
          action: () => {},
        },
        {
          value: "#6,500",
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
            title: "CREATE API BUNDLE",
            action: () => {
              rsProps.callSection("create", component)
            },
          },
        ]}
        tableData={tableData}
        tableHeader={["Title", "Bundle Type", "Amount", "Action"]}
        tag="Lorem ipsum"
        title="API Bundles"
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

export default APIBundles
