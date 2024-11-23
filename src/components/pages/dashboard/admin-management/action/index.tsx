import React, { FC, useEffect } from 'react'
import 'utils/pagination.scss'
import 'utils/page.scss'
import './management.scss'
import CreateAction from './create-action'
import { IRoleAction } from 'interfaces/IRoleActions'
import AssignToRole from './assign-to-role'
import DeleteAction from './delete-action'
import { useRightSection } from 'utils/right-section/hooks'
import { useGlobalContext } from 'context/hooks'
import { ITableRecord, useTableAction } from 'utils/report-table'
import { TypeButton } from 'utils/button'
import Table from 'utils/table'
import RightSection from 'utils/right-section'
import { getQuery } from './helpers'
import { PAGENUMBER, PAGESIZE } from './utils'
import { PageHeader } from '../../service-component/page-header'

const ActionPage: FC = () => {
  const { state, action } = useGlobalContext()
  const { callRightSection, getAllAction } = action

  const rightSectionProps = state?.global.rightSection

  const actionState = state?.actions

  const rsProps = useRightSection<IRoleAction>(
    rightSectionProps,
    callRightSection
  )

  useEffect(() => {
    getAllAction(getQuery(`${PAGESIZE}&${PAGENUMBER}`))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const tableActionEnums = {
    REASSIGNROLE: 'Assign selected actions to Role(s)',
    DELETE: 'Delete selected actions'
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
      load: actionState?.getAllActionLoading
    },
    searchAction: (name: string) => {
      const nameQuery = name ? `&name=${name}` : ''
      getAllAction(getQuery(`${PAGESIZE}&${PAGENUMBER}${nameQuery}`))
    },
    searchPlaceHolder: 'Search Actions'
  })

  const record = actionState?.getAllAction?.data?.map((i) => ({
    id: i.id,
    row: [
      {
        value: i.id,
        isLink: false
      },
      {
        value: i.name,
        isLink: false
      }
    ],
    rowActions: [
      {
        value: 'Assign',
        isLink: true,
        action: () => {
          // tableAction.setSelectedItems([i.id])
          rsProps.callSection('custom', 'assign-role', i.id, i)
        }
      },
      {
        value: 'Edit',
        buttonType: 'outlined',
        isLink: true,
        action: () => {
          rsProps.callSection('custom', 'update-action', i.id, i)
        }
      },
      {
        value: 'Delete',
        isLink: true,
        action: () => {
          rsProps.callSection('custom', 'delete-action', i.id, i)
        },
        buttonType: 'danger'
      }
    ]
  })) as ITableRecord[]

  const handleTableAction = () => {
    if (tableAction.selectedItems.length)
      switch (tableAction.action) {
        case tableActionEnums.REASSIGNROLE:
          rsProps.callSection('custom', 'assign-role', undefined, undefined)
          break
        case tableActionEnums.DELETE:
          rsProps.callSection('custom', 'delete-action', undefined, undefined)
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
        {rsProps.isView('custom', 'create-action') ||
        rsProps.isView('custom', 'update-action') ? (
          <CreateAction states={state} actions={action} />
        ) : null}
        {rsProps.isView('custom', 'delete-action') ? (
          <DeleteAction
            states={state}
            actions={action}
            selectedItems={getSelectedItems()}
            onRemoveSelectedItems={removeSelectedItems}
          />
        ) : null}
        {rsProps.isView('custom', 'assign-role') ? (
          <AssignToRole
            states={state}
            actions={action}
            selectedItems={getSelectedItems()}
            onRemoveSelectedItems={removeSelectedItems}
          />
        ) : null}
      </RightSection>
      <div>
        <PageHeader
          title="Action Management"
          load={actionState?.getAllActionLoading}
        />
        <div className="cta-header-section">
          <TypeButton
            buttonSize="small"
            title="Add Action"
            onClick={() => {
              rsProps.callSection('custom', 'create-action')
            }}
          />
        </div>
        <div className="table-section card-section">
          <Table
            header={['ID', 'Title', 'Action']}
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
