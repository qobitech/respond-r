import React, { useEffect } from "react"
import Table, { ITableRecord, useTableAction } from "utils/new/table"
import "../../../../utils/new/pagination.scss"
import "../../../../utils/new/page.scss"
import "./management.scss"
import { TypeButton } from "../../../../utils/new/button"
import { TypeSelect } from "../../../../utils/new/select"
import RightSection, { useRightSection } from "../../../reusable/right-section"
import { IStates } from "interfaces/IReducer"
import { IAction } from "interfaces/IAction"
import { GODUSER } from "utils/new/constants/roles"
import { PageHeader } from "components/dashboard/components"
import CreateRole from "./create-role"
import { IRole } from "interfaces/IRole"
import AssignToRole from "./assign-to-role"
import ViewActions from "./view-actions"
import { ActionWrapper, useGlobalContext } from "components/layout"
import { PAGENUMBER, PAGESIZE, getQuery } from "../action"
import { ISSUPERADMIN, USERTOKEN } from "utils/new/constants"

interface IProps {
  states?: IStates
  actions?: IAction
}

const RolePage: React.FC<IProps> = ({ states, actions }) => {
  const { getOrganization, organizations } = useGlobalContext()
  const query = (sign: string) =>
    GODUSER
      ? ""
      : `${sign}OrganisationId=${
          getOrganization?.("name", USERTOKEN.Organisation)?.id || ""
        }`
  const { callRightSection, getAllRoles } = actions as IAction

  const rightSectionProps = states?.global.rightSection

  const roleState = states?.role.getAllRoles
  const resLoading = states?.role.getAllRolesLoading

  const rsProps = useRightSection<IRole>(rightSectionProps, callRightSection)

  const getAllUserRoles = (query: string) => {
    if (GODUSER) getAllRoles(query)
    if (organizations?.length) getAllRoles(query)
  }

  useEffect(() => {
    if (organizations?.length) getAllUserRoles(query("?"))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organizations])

  const record = roleState?.data?.map((i) => ({
    id: "1",
    row: [
      {
        value: i.name,
        isLink: false,
      },
      {
        value: getOrganization?.("id", i.organisationId)?.name,
        isLink: false,
      },
    ].filter((_, index) =>
      GODUSER ? true : ISSUPERADMIN ? index === 0 : false
    ),
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
          rsProps.callSection("custom", "view-role-actions", i.id.toString(), i)
        },
      },
      {
        value: "Edit",
        buttonType: "outlined",
        isLink: true,
        action: () => {
          rsProps.callSection("custom", "update-role", i.id.toString(), i)
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
    ].filter((action) =>
      GODUSER
        ? action
        : ISSUPERADMIN
        ? action.value === "View Actions" || action.value === "Delete"
        : false
    ),
  })) as ITableRecord[]

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
    REASSIGNROLE: "Assign action(s) to selected roles",
    DELETE: "Delete",
  }

  const getTableActionEnums = (): { [key: string]: string } | null => {
    return tableActionEnums
  }

  const tableAction = useTableAction({
    actionEnums: getTableActionEnums(),
    paginationParams: {
      current: roleState?.currentPage || 1,
      isPagination: true,
      load: resLoading!,
      total: roleState?.totalPages || 1,
      onPageChange: (selectedItem: { selected: number }) => {
        getAllUserRoles(
          getQuery(`${PAGESIZE}&pageNumber=${selectedItem.selected + 1}`) +
            query("&")
        )
      },
    },
    searchAction: (name: string) => {
      const nameQuery = name ? `&name=${name}` : ""
      getAllUserRoles(
        getQuery(`${PAGESIZE}&${PAGENUMBER}${nameQuery}`) + query("&")
      )
    },
    searchPlaceHolder: "Search Roles",
  })

  const handleTableAction = () => {
    if (tableAction.selectedItems)
      switch (tableAction.action) {
        case tableActionEnums.REASSIGNROLE:
          rsProps.callSection("custom", "assign-role")
          break
        case tableActionEnums.DELETE:
          break
        default:
          break
      }
  }

  const getSelectedItems = () => {
    const allActions = roleState?.data
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
        {rsProps.isView("custom", "view-role-actions") ? (
          <ViewActions states={states!} actions={actions!} />
        ) : null}
      </RightSection>
      <div>
        <PageHeader title="Roles Management" load={resLoading!} />
        <ActionWrapper action="create role">
          <div className="cta-header-section">
            <TypeButton
              buttonSize="small"
              title="Add Role"
              onClick={() => {
                rsProps.callSection("custom", "create-role")
              }}
            />
          </div>
        </ActionWrapper>
        <ActionWrapper action="read role">
          <div className="table-section card-section">
            <div className="filter-management-section">
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
              header={["Role", "Organization", "Action"].filter((_, index) =>
                GODUSER ? true : ISSUPERADMIN ? index !== 1 : false
              )}
              record={record}
              hideNumbering
              handleTableAction={handleTableAction}
              tableAction={tableAction}
            />
          </div>
        </ActionWrapper>
      </div>
    </>
  )
}

export default RolePage
