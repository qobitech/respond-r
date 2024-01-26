import React, { useEffect } from "react"
import Table, { ITableRecord, useTableAction } from "utils/new/table"
import "../../../../utils/new/pagination.scss"
import "../../../../utils/new/page.scss"
import "./management.scss"
import { TypeSmallButton } from "../../../../utils/new/button"
import RightSection, { useRightSection } from "../../../reusable/right-section"
import { IStates } from "interfaces/IReducer"
import { IAction } from "interfaces/IAction"
import { PageHeader } from "components/dashboard/components"
import CreateAction from "./create-action"
import { IRoleAction } from "interfaces/IRoleActions"
import AssignToRole from "./assign-to-role"
import DeleteAction from "./delete-action"

interface IProps {
  states?: IStates
  actions?: IAction
}

export const getQuery = (query: string) => (query ? `/paged?${query}` : "")
export const PAGESIZE = `pageSize=10`
export const PAGENUMBER = `pageNumber=1`

const ActionPage: React.FC<IProps> = ({ states, actions }) => {
  const { callRightSection, getAllAction } = actions as IAction

  const rightSectionProps = states?.global.rightSection

  const actionState = states?.actions

  const rsProps = useRightSection<IRoleAction>(
    rightSectionProps,
    callRightSection
  )

  useEffect(() => {
    getAllAction(getQuery(`${PAGESIZE}&${PAGENUMBER}`))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const tableActionEnums = {
    REASSIGNROLE: "Assign selected actions to Role(s)",
    DELETE: "Delete selected actions",
  }

  const getTableActionEnums = (): { [key: string]: string } | null => {
    return tableActionEnums
  }

  const onPageChange = (selectedItem: { selected: number }) => {
    getAllAction(
      getQuery(`${PAGESIZE}&pageNumber=${selectedItem.selected + 1}`)
    )
  }

  const tableAction = useTableAction({
    actionEnums: getTableActionEnums(),
    paginationParams: {
      current: actionState?.getAllAction?.currentPage || 1,
      isPagination: true,
      total: actionState?.getAllAction?.totalPages || 1,
      onPageChange,
    },
    searchAction: (name: string) => {
      const nameQuery = name ? `&name=${name}` : ""
      getAllAction(getQuery(`${PAGESIZE}&${PAGENUMBER}${nameQuery}`))
    },
    searchPlaceHolder: "Search Actions",
  })

  const record = actionState?.getAllAction?.data?.map((i) => ({
    id: i.id,
    row: [
      {
        value: i.id,
        isLink: false,
      },
      {
        value: i.name,
        isLink: false,
      },
    ],
    rowActions: [
      {
        value: "Assign",
        isLink: true,
        action: () => {
          // tableAction.setSelectedItems([i.id])
          rsProps.callSection("custom", "assign-role", i.id, i)
        },
      },
      {
        value: "Edit",
        buttonType: "outlined",
        isLink: true,
        action: () => {
          rsProps.callSection("custom", "update-action", i.id, i)
        },
      },
      {
        value: "Delete",
        isLink: true,
        action: () => {
          rsProps.callSection("custom", "delete-action", i.id, i)
        },
        buttonType: "danger",
      },
    ],
  })) as ITableRecord[]

  const handleTableAction = () => {
    if (tableAction.selectedItems.length)
      switch (tableAction.action) {
        case tableActionEnums.REASSIGNROLE:
          rsProps.callSection("custom", "assign-role", undefined, undefined)
          break
        case tableActionEnums.DELETE:
          rsProps.callSection("custom", "delete-action", undefined, undefined)
          break
        default:
          break
      }
  }

  const getSelectedItems = () => {
    const allActions = actionState?.getAllAction?.data
    const allSelectedItems = !allActions
      ? []
      : allActions.filter((action) =>
          tableAction.selectedItems?.includes(action.id)
        )
    return allSelectedItems
  }

  const removeSelectedItems = (id: string) => {
    tableAction.setSelectedItems((prev) => {
      return prev.filter((i) => i.toString() !== id.toString())
    })
  }

  return (
    <>
      <RightSection rsProps={rsProps}>
        {rsProps.isView("custom", "create-action") ||
        rsProps.isView("custom", "update-action") ? (
          <CreateAction states={states!} actions={actions!} />
        ) : null}
        {rsProps.isView("custom", "delete-action") ? (
          <DeleteAction
            states={states!}
            actions={actions!}
            selectedItems={getSelectedItems()}
            onRemoveSelectedItems={removeSelectedItems}
          />
        ) : null}
        {rsProps.isView("custom", "assign-role") ? (
          <AssignToRole
            states={states!}
            actions={actions!}
            selectedItems={getSelectedItems()}
            onRemoveSelectedItems={removeSelectedItems}
          />
        ) : null}
      </RightSection>
      <div>
        <PageHeader
          title="Action Management"
          load={actionState?.getAllActionLoading!}
        />
        <div className="cta-header-section">
          <TypeSmallButton
            title="Add Action"
            onClick={() => {
              rsProps.callSection("custom", "create-action")
            }}
          />
        </div>
        <div className="table-section card-section">
          <Table
            header={["ID", "Title", "Action"]}
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

export default ActionPage
