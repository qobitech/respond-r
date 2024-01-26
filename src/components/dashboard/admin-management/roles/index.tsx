import React, { useEffect, useState } from "react"
import Table, {
  ICell,
  ICellAction,
  ITableRecord,
  useTableAction,
} from "utils/new/table"
import "../../../../utils/new/pagination.scss"
import "../../../../utils/new/page.scss"
import "./management.scss"
import { TypeSmallButton } from "../../../../utils/new/button"
import { TypeSelect } from "../../../../utils/new/select"
import RightSection, { useRightSection } from "../../../reusable/right-section"
import { IStates } from "interfaces/IReducer"
import { IAction } from "interfaces/IAction"
import { IUser } from "interfaces/IUser"
import { ROLE, getOrgName, organizationIdEnumsType } from "utils/new/constants"
import { GODUSER } from "utils/new/constants/roles"
import { PageHeader } from "components/dashboard/components"
import CreateRole from "./create-role"
import { IRole } from "interfaces/IRole"
import AssignToRole from "./assign-to-role"
import { PAGENUMBER, PAGESIZE, getQuery } from "../action"

interface IProps {
  states?: IStates
  actions?: IAction
}

const RolePage: React.FC<IProps> = ({ states, actions }) => {
  const { callRightSection, getAllRoles } = actions as IAction

  const rightSectionProps = states?.global.rightSection

  const roleState = states?.role

  const rsProps = useRightSection<IRole>(rightSectionProps, callRightSection)

  useEffect(() => {
    getAllRoles("")
    // getAllRoles(getQuery(`${PAGESIZE}&${PAGENUMBER}`))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log(roleState?.getAllRoles?.data, "juju")

  const record = roleState?.getAllRoles?.data?.map((i) => ({
    id: "1",
    row: [
      {
        value: i.name,
        isLink: false,
      },
      {
        value: getOrgName(i.organisationId as organizationIdEnumsType),
        isLink: false,
      },
    ],
    rowActions: [
      {
        value: "Assign Actions",
        isLink: true,
        action: () => {
          rsProps.callSection("custom", "assign-role", i.id.toString(), i)
        },
      },
      {
        value: "View Actions",
        isLink: true,
        action: () => {
          rsProps.callSection("custom", "view-admin", i.id.toString(), i)
        },
      },
      {
        value: "Edit",
        buttonType: "outlined",
        isLink: true,
        action: () => {
          rsProps.callSection("custom", "update-action", i.id.toString(), i)
        },
      },

      {
        value: "Delete",
        buttonType: "danger",
        isLink: true,
        action: () => {
          rsProps.callSection("custom", "update-role", i.id.toString(), i)
        },
      },
    ],
  })) as ITableRecord[]

  // const roleOptionData = [
  //   {
  //     id: 1,
  //     label: "Super-Admin",
  //     value: "Super-Admin",
  //   },
  //   {
  //     id: 2,
  //     label: "Admin",
  //     value: "Admin",
  //   },
  //   {
  //     id: 3,
  //     label: "Moderator",
  //     value: "Moderator",
  //   },
  //   {
  //     id: 4,
  //     label: "Field Officer",
  //     value: "Field Officer",
  //   },
  // ]

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

  const [selectedRoles, setSelectedRoles] = useState<
    Array<{ id: string; label: string }>
  >([])

  const handleSelectedRoles = (id: string) => {
    setSelectedRoles((prev) => {
      if (prev.map((i) => i.id).includes(id))
        return prev.filter((i) => i.id !== id)
      return prev
    })
  }

  const tableActionEnums = {
    REASSIGNROLE: "Assign action(s) to selected roles",
    DELETE: "Delete",
  }

  const getTableActionEnums = (): { [key: string]: string } | null => {
    return tableActionEnums
  }

  const tableAction = useTableAction({ actionEnums: getTableActionEnums() })

  const deleteRole = (data: string[]) => {}

  const handleTableAction = () => {
    if (tableAction.selectedItems)
      switch (tableAction.action) {
        case tableActionEnums.REASSIGNROLE:
          rsProps.callSection("custom", "assign-role")
          break
        case tableActionEnums.DELETE:
          deleteRole(tableAction.selectedItems)
          break
        default:
          break
      }
  }

  const getSelectedItems = () => {
    const allActions = roleState?.getAllRoles?.data
    const allSelectedItems = !allActions
      ? []
      : allActions.filter((action) =>
          tableAction.selectedItems?.includes(action.id.toString())
        )
    return allSelectedItems.map((i) => ({ id: i.id + "", name: i.name }))
  }

  const removeSelectedItems = (id: string) => {
    tableAction.setSelectedItems((prev) => {
      if (!prev) return []
      return prev.filter((i) => i.toString() !== id.toString())
    })
  }

  return (
    <>
      <RightSection rsProps={rsProps}>
        {rsProps.isView("custom", "create-role") ||
        rsProps.isView("custom", "update-role") ? (
          <CreateRole states={states!} actions={actions!} />
        ) : null}
        {rsProps.isView("custom", "assign-role") ? (
          <AssignToRole
            states={states!}
            actions={actions!}
            selectedItems={getSelectedItems()}
            onRemoveSelectedItems={removeSelectedItems}
          />
        ) : null}
        {rsProps.isView("custom", "update-role") ? <></> : null}
      </RightSection>
      <div>
        <PageHeader
          title="Roles Management"
          load={roleState?.getAllRolesLoading!}
        />
        <div className="cta-header-section">
          <TypeSmallButton
            title="Add Role"
            onClick={() => {
              rsProps.callSection("custom", "create-role")
            }}
          />
        </div>
        <div className="table-section card-section">
          <div className="filter-management-section">
            {/* {ROLE === "super-admin" ||
              (ROLE === "respondR-admin" && (
                <TypeSelect
                  initoption={{ label: "All", value: "" }}
                  label="Filter by Role"
                  optionsdata={roleOptionData}
                  customwidth={"300px"}
                />
              ))} */}
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
            header={["Role", "Organization", "Action"]}
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

export default RolePage
