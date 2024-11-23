import React, { FC, useEffect } from 'react'
import 'utils/pagination.scss'
import 'utils/page.scss'
import './management.scss'
import CreateAdmin from './create-admin'
import { IUser } from 'interfaces/IUser'
import { ActionWrapper } from 'components/layout'
import { PAGENUMBER, PAGESIZE, getQuery } from '../action'
import { useRightSection } from 'components/reusable/right-section/hooks'
import { useGlobalContext } from 'context/hooks'
import { GODUSER } from 'app-constants/roles'
import { ISSUPERADMIN, ROLE, USERTOKEN } from 'app-constants'
import { ICell, ICellAction, useTableAction } from 'utils/report-table'
import { TypeButton } from 'utils/button'
import { TypeSelect } from 'utils/select'
import Table from 'utils/table'
import RightSection from 'components/reusable/right-section'
import { PageHeader } from '../../components'

const ManagementPage: FC = () => {
  const { isAction, getOrganization, organizations, state, action } =
    useGlobalContext()
  const { callRightSection, getAllUsers } = action

  const rightSectionProps = state?.global.rightSection

  const userState = state?.user

  const rsProps = useRightSection<IUser>(rightSectionProps, callRightSection)

  const query = (sign: string) =>
    GODUSER
      ? ''
      : `${sign}OrganisationId=${
          getOrganization?.('name', USERTOKEN.Organisation)?.id || ''
        }`

  const getAllUsersFn = (query: string) => {
    if (GODUSER) getAllUsers(query)
    if (organizations?.length) getAllUsers(query)
  }

  useEffect(() => {
    // if (!organizations?.length)
    getAllUsersFn(query('?'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  interface ITable {
    id: string
    row: ICell[]
    rowActions: ICellAction[]
  }

  const record: ITable[] = userState?.getAllUsers?.data?.map((i) => ({
    id: '1',
    row: [
      {
        value: i.userName,
        isLink: false
      },
      {
        value: i.email,
        isLink: false
      },
      {
        value: i.organisation.name,
        isLink: false
      },
      {
        value: i.roleForReturn?.[0]?.name,
        isLink: false
      },
      {
        value: i.phoneNumber,
        isLink: false
      }
    ],
    rowActions: [
      {
        value: 'Edit Details',
        isLink: true,
        action: () => {
          rsProps.callSection('custom', 'update-admin', i.email, i)
        },
        hide: !isAction?.('update user')
      },
      {
        value: 'Delete User',
        isLink: true,
        action: () => {
          rsProps.callSection('custom', 'delete-admin', i.email, i)
        },
        buttonType: 'danger',
        hide: !isAction?.('delete user')
      }
    ]
  })) as ITable[]

  const roleOptionData = [
    {
      id: 1,
      label: 'Super-Admin',
      value: 'Super-Admin'
    },
    {
      id: 2,
      label: 'Admin',
      value: 'Admin'
    },
    {
      id: 3,
      label: 'Moderator',
      value: 'Moderator'
    },
    {
      id: 4,
      label: 'Field Officer',
      value: 'Field Officer'
    }
  ]

  const orgOptionData = [
    {
      id: 1,
      label: 'Traffic',
      value: 'Traffic'
    },
    {
      id: 2,
      label: 'E-Police',
      value: 'E-Police'
    },
    {
      id: 3,
      label: 'Fire Service',
      value: 'Fire Service'
    },
    {
      id: 4,
      label: 'E-Medical',
      value: 'E-Medical'
    }
  ]

  const tableActionEnums = {
    REASSIGNROLE: 'Re-assign Role',
    DELETE: 'Delete'
  }

  const getTableActionEnums = (): { [key: string]: string } | null => {
    return tableActionEnums
  }

  const tableAction = useTableAction({
    actionEnums: getTableActionEnums(),
    paginationParams: {
      current: userState?.getAllUsers?.currentPage || 1,
      isPagination: true,
      load: userState?.getAllUsersLoading,
      total: userState?.getAllUsers?.totalPages || 1,
      onPageChange: (selectedItem: { selected: number }) => {
        getAllUsersFn(
          getQuery(`${PAGESIZE}&pageNumber=${selectedItem.selected + 1}`)
        )
      }
    },
    searchAction: (name: string) => {
      const nameQuery = name ? `&name=${name}` : ''
      getAllUsersFn(
        getQuery(`${PAGESIZE}&${PAGENUMBER}${nameQuery}`) + `${query('&')}`
      )
    },
    searchPlaceHolder: 'Search Users'
  })

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
        {rsProps.isView('custom', 'create-admin') ||
        rsProps.isView('custom', 'update-admin') ? (
          <CreateAdmin states={state} actions={action} />
        ) : null}
        {rsProps.isView('custom', 'view-admin') ? <></> : null}
        {rsProps.isView('custom', 'update-admin') ? <></> : null}
      </RightSection>
      <div>
        <PageHeader
          title="User Management"
          load={userState?.getAllUsersLoading}
        />
        <ActionWrapper action="create user">
          <div className="cta-header-section">
            <TypeButton
              buttonSize="small"
              title="Create User"
              onClick={() => {
                rsProps.callSection('custom', 'create-admin')
              }}
            />
          </div>
        </ActionWrapper>
        <ActionWrapper action="read user">
          <div className="table-section card-section">
            <div className="filter-management-section">
              {ROLE === 'super-admin' && (
                <TypeSelect
                  initoption={{ label: 'All', value: '' }}
                  label="Filter by Role"
                  optionsdata={roleOptionData}
                  customwidth={'300px'}
                />
              )}
              {GODUSER && (
                <TypeSelect
                  initoption={{ label: 'All', value: '' }}
                  label="Filter by Organization"
                  optionsdata={orgOptionData}
                  customwidth={'300px'}
                />
              )}
            </div>
            <Table
              header={[
                'Name',
                'Email',
                'Organization',
                'Role',
                'Phone',
                'Action'
              ].filter((_, index) =>
                GODUSER ? true : ISSUPERADMIN ? index !== 2 : false
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

export default ManagementPage
