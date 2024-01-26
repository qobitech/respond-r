import React, { useEffect } from "react"
import Table, { ICell, ICellAction, useTableAction } from "utils/new/table"
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
import { IUser } from "interfaces/IUser"
import { ROLE } from "utils/new/constants"
import { GODUSER } from "utils/new/constants/roles"
import { PageHeader } from "components/dashboard/components"

interface IProps {
  states?: IStates
  actions?: IAction
}

const ManagementPage: React.FC<IProps> = ({ states, actions }) => {
  const { callRightSection, getAllUsers, getAllOrganization, getAllRoles } =
    actions as IAction

  const rightSectionProps = states?.global.rightSection

  const userState = states?.user

  const rsProps = useRightSection<IUser>(rightSectionProps, callRightSection)

  useEffect(() => {
    getAllOrganization("")
    getAllRoles("")
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
        value: i.organisation.name,
        isLink: false,
      },
      {
        value: i.roleForReturn?.[0]?.name,
        isLink: false,
      },
      {
        value: i.phoneNumber,
        isLink: false,
      },
    ],
    rowActions: [
      {
        value: "Edit Details",
        isLink: true,
        action: () => {
          rsProps.callSection("custom", "update-admin", i.email, i)
        },
      },
      {
        value: "Delete User",
        isLink: true,
        action: () => {
          rsProps.callSection("custom", "update-admin", i.email, i)
        },
        buttonType: "danger",
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

  const tableActionEnums = {
    REASSIGNROLE: "Re-assign Role",
    DELETE: "Delete",
  }

  const getTableActionEnums = (): { [key: string]: string } | null => {
    return tableActionEnums
  }

  const tableAction = useTableAction({ actionEnums: getTableActionEnums() })

  const reAssignRole = (data: string[]) => {}
  const deleteRole = (data: string[]) => {}

  const handleTableAction = () => {
    if (tableAction.selectedItems)
      switch (tableAction.action) {
        case tableActionEnums.REASSIGNROLE:
          reAssignRole(tableAction.selectedItems)
          break
        case tableActionEnums.DELETE:
          deleteRole(tableAction.selectedItems)
          break
        default:
          break
      }
  }

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
        <PageHeader
          title="User Management"
          load={userState?.getAllUsersLoading!}
        />
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
            {ROLE === "super-admin" ||
              (ROLE === "respondR-admin" && (
                <TypeSelect
                  initoption={{ label: "All", value: "" }}
                  label="Filter by Role"
                  optionsdata={roleOptionData}
                  customwidth={"300px"}
                />
              ))}
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
            header={[
              "Name",
              "Email",
              "Organization",
              "Role",
              "Phone",
              "Action",
            ]}
            record={record}
            hideNumbering
            handleTableAction={handleTableAction}
            tableAction={tableAction}
          />
        </div>
      </div>
    </>
  )
}

export default ManagementPage
