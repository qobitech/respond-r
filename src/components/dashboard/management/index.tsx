import React from "react"
import Table, { ICell, ICellAction } from "utils/new/table"
import "../../../utils/new/pagination.scss"
import "../../../utils/new/page.scss"
import "./management.scss"
import { TypeSmallButton } from "utils/new/button"
import { TypeSelect } from "utils/new/select"
import RightSection, {
  useRightSection,
} from "components/reusable/right-section"
import { IStates } from "interfaces/IReducer"
import { IAction } from "interfaces/IAction"
import CreateAdmin from "./create-admin"

interface IProps {
  states?: IStates
}

const ManagementPage: React.FC<IProps> = ({ states, ...props }) => {
  const actions = props as unknown as IAction
  const { callRightSection } = actions

  const rightSectionProps = states?.global.rightSection

  const rsProps = useRightSection(rightSectionProps, callRightSection)

  const record: Array<{
    id: string
    row: ICell[]
    rowActions: ICellAction[]
  }> = [
    {
      id: "1",
      row: [
        {
          value: "John",
          isLink: false,
        },
        {
          value: "edekobifrank@gmail.com",
          isLink: false,
        },
        {
          value: "Police",
          isLink: false,
        },
        {
          value: "Admin",
          isLink: false,
        },
      ],
      rowActions: [
        {
          value: "View User",
          isLink: true,
          action: () => {
            rsProps.callSection("custom", "view-admin")
          },
        },
        {
          value: "Update Role",
          isLink: true,
          action: () => {
            rsProps.callSection("custom", "update-admin-role")
          },
        },
      ],
    },
  ]

  const roleOptionData = [
    {
      id: 1,
      label: "Super-Admin",
      value: "Super-Admin",
    },
    {
      id: 2,
      label: "Moderator",
      value: "Moderator",
    },
  ]

  const orgOptionData = [
    {
      id: 1,
      label: "Traffic",
      value: "Traffic",
    },
    {
      id: 2,
      label: "E-Police",
      value: "E-Police",
    },
    {
      id: 3,
      label: "Fire Service",
      value: "Fire Service",
    },
    {
      id: 4,
      label: "E-Medical",
      value: "E-Medical",
    },
  ]

  return (
    <>
      <RightSection rsProps={rsProps}>
        {rsProps.isView("custom", "create-admin") ? (
          <CreateAdmin states={states!} actions={actions} />
        ) : null}
        {rsProps.isView("custom", "view-admin") ? <></> : null}
        {rsProps.isView("custom", "update-admin-role") ? <></> : null}
      </RightSection>
      <div className="main-page">
        <div className="pg-container">
          <div className="header-management">
            <h1>Management</h1>
          </div>
          <div className="cta-header-section">
            <TypeSmallButton
              title="Create Admin"
              onClick={() => {
                rsProps.callSection("custom", "create-admin")
              }}
            />
          </div>
          <div className="table-section card-section">
            <div className="filter-management-section">
              <TypeSelect
                initoption={{ label: "All", value: "" }}
                label="Filter by Role"
                optionsdata={roleOptionData}
                customwidth={"300px"}
              />
              <TypeSelect
                initoption={{ label: "All", value: "" }}
                label="Filter by Organization"
                optionsdata={orgOptionData}
                customwidth={"300px"}
              />
            </div>
            <Table
              header={["Name", "Email", "Organization", "Role", "Action"]}
              record={record}
              hideCheck
              hideNumbering
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default ManagementPage
