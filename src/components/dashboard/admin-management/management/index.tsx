import React, { useEffect } from "react"
import Table, { ICell, ICellAction } from "utils/new/table"
import "../../../../utils/new/pagination.scss"
import "../../../../utils/new/page.scss"
import "./management.scss"
import { TypeSmallButton } from "../../../../utils/new/button"
import { TypeSelect } from "../../../../utils/new/select"
import RightSection, {
  useRightSection,
} from "../../../../components/reusable/right-section"
import { IStates } from "interfaces/IReducer"
import { IAction } from "interfaces/IAction"
import CreateAdmin from "./create-admin"
import { PulseSVG } from "utils/new/svgs"
import { IUser } from "interfaces/IUser"
import { ORGANIZATION, ROLE } from "utils/new/constants"

interface IProps {
  states?: IStates
  actions?: IAction
}

const ManagementPage: React.FC<IProps> = ({ states, actions }) => {
  const GODUSER = ROLE === "super-admin" && ORGANIZATION === "all"
  const { callRightSection, getAllUsers } = actions as IAction

  const rightSectionProps = states?.global.rightSection

  const userState = states?.user

  const rsProps = useRightSection<IUser>(rightSectionProps, callRightSection)

  useEffect(() => {
    getAllUsers("")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  interface ITable {
    id: string
    row: ICell[]
    rowActions: ICellAction[]
  }

  const record: ITable[] = userState?.getAllUsers?.data?.map((i) => ({
    id: "1",
    row: [
      {
        value: i.userName,
        isLink: false,
      },
      {
        value: i.email,
        isLink: false,
      },
      {
        value: i.organisationName,
        isLink: false,
      },
      {
        value: i.phoneNumber,
        isLink: false,
      },
    ],
    rowActions: [
      // {
      //   value: "View User",
      //   isLink: true,
      //   action: () => {
      //     rsProps.callSection("custom", "view-admin")
      //   },
      // },
      {
        value: "Edit Details",
        isLink: true,
        action: () => {
          rsProps.callSection("custom", "update-admin", i.email, i)
        },
      },
    ],
  })) as ITable[]

  const roleOptionData = [
    {
      id: 1,
      label: "Super-Admin",
      value: "Super-Admin",
    },
    {
      id: 2,
      label: "Admin",
      value: "Admin",
    },
    {
      id: 3,
      label: "Moderator",
      value: "Moderator",
    },
    {
      id: 4,
      label: "Field Officer",
      value: "Field Officer",
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
        {rsProps.isView("custom", "create-admin") ||
        rsProps.isView("custom", "update-admin") ? (
          <CreateAdmin states={states!} actions={actions!} />
        ) : null}
        {rsProps.isView("custom", "view-admin") ? <></> : null}
        {rsProps.isView("custom", "update-admin") ? <></> : null}
      </RightSection>
      <div>
        <div className="header-management">
          <h1>User Management {!GODUSER ? "(" + ORGANIZATION + ")" : ""}</h1>
          {userState?.getAllUsersLoading ? <PulseSVG /> : null}
        </div>
        <div className="cta-header-section">
          <TypeSmallButton
            title="Create User"
            onClick={() => {
              rsProps.callSection("custom", "create-admin")
            }}
          />
        </div>
        <div className="table-section card-section">
          <div className="filter-management-section">
            {ROLE === "super-admin" && (
              <TypeSelect
                initoption={{ label: "All", value: "" }}
                label="Filter by Role"
                optionsdata={roleOptionData}
                customwidth={"300px"}
              />
            )}
            {GODUSER && (
              <TypeSelect
                initoption={{ label: "All", value: "" }}
                label="Filter by Organization"
                optionsdata={orgOptionData}
                customwidth={"300px"}
              />
            )}
          </div>
          <Table
            header={["Name", "Email", "Organization", "Phone", "Action"]}
            record={record}
            hideCheck
            hideNumbering
          />
        </div>
      </div>
    </>
  )
}

export default ManagementPage
