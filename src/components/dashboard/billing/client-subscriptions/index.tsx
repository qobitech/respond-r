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
const ClientSubscription: React.FC<IProps> = ({ states, ...props }) => {
  const rsProps = useRightSection()
  const component: actionComponent = "client subscription"
  const tableData: ITableRecord[] = [
    {
      id: "1",
      row: [
        {
          value: "Demo Org",
          isLink: false,
          url: "",
          action: () => {},
        },
        {
          value: "DIA",
          isLink: false,
          url: "",
          action: () => {},
        },
        {
          value: "sirmikky@gmail.com",
          isLink: false,
          url: "",
          action: () => {},
        },
        {
          value: "Active",
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
        tableData={tableData}
        tableHeader={[
          "Organization",
          "Bundle Code",
          "Email",
          "Status",
          "Action",
        ]}
        tag="Lorem ipsum"
        title="Client Subscriptions"
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

export default ClientSubscription
