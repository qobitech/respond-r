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
import FilterComponent, { IFilterData } from "components/reusable/filter"

interface IProps {
  states?: IStates
}
const Notification: React.FC<IProps> = ({ states, ...props }) => {
  const rsProps = useRightSection()
  const component: actionComponent = "notification"
  const tableData: ITableRecord[] = [
    {
      id: "1",
      row: [
        {
          value: "johnevans@gmail.com",
          isLink: false,
          url: "",
          action: () => {},
        },
        {
          value: "Renew subscription",
          isLink: false,
          url: "",
          action: () => {},
        },
        {
          value: "Jan 17 2023",
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
          value: "johnevans@gmail.com",
          isLink: false,
          url: "",
          action: () => {},
        },
        {
          value: "Renew subscription",
          isLink: false,
          url: "",
          action: () => {},
        },
        {
          value: "Jan 17 2023",
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
      placeholder: "sender",
      type: "text",
      value: "",
    },
    {
      placeholder: "subject",
      type: "text",
      value: "",
    },
    {
      placeholder: "date",
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
              title: "COMPOSE NEW",
              action: () => {
                rsProps.callSection("create", component)
              },
            },
          ]}
          tableData={tableData}
          tableHeader={["Sender", "Subject", "Date", "Action"]}
          tag="Lorem ipsum"
          title="Notifications"
          handlePagination={handlePagination}
          isFilter
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
    </div>
  )
}

export default Notification
