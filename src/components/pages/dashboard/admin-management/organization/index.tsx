import { FC, useEffect } from 'react'
import 'utils/pagination.scss'
import 'utils/page.scss'
import './management.scss'
import CreateRole from './create-organization'
import { IOrganization } from 'interfaces/IOrganization'
import { useRightSection } from 'utils/right-section/hooks'
import { useGlobalContext } from 'context/hooks'
import { ICell, ICellAction, useTableAction } from 'utils/report-table'
import { TypeButton } from 'utils/button'
import Table from 'utils/table'
import RightSection from 'utils/right-section'
import { PageHeader } from '../../service-component/page-header'

const OrganizationPage: FC = () => {
  const { state, action } = useGlobalContext()
  const { callRightSection, getAllOrganization } = action

  const rightSectionProps = state?.global.rightSection

  const organizationState = state?.organization

  const rsProps = useRightSection<IOrganization>(
    rightSectionProps,
    callRightSection
  )

  useEffect(() => {
    getAllOrganization('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  interface ITable {
    id: string
    row: ICell[]
    rowActions: ICellAction[]
  }

  console.log(organizationState?.getAllOrganization?.data, 'juju')

  const record: ITable[] = organizationState?.getAllOrganization?.data?.map(
    (i) => ({
      id: '1',
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
        // {
        //   value: "View User",
        //   isLink: true,
        //   action: () => {
        //     rsProps.callSection("custom", "view-admin")
        //   },
        // },
        {
          value: 'Edit Details',
          isLink: true,
          action: () => {
            rsProps.callSection('custom', 'update-org', i.id.toString(), i)
          }
        },
        {
          value: 'Delete',
          isLink: true,
          buttonType: 'danger',
          action: () => {}
        }
      ]
    })
  ) as ITable[]

  // const orgOptionData = [
  //   {
  //     id: 1,
  //     label: "Traffic",
  //     value: "Traffic",
  //   },
  //   {
  //     id: 2,
  //     label: "E-Police",
  //     value: "E-Police",
  //   },
  //   {
  //     id: 3,
  //     label: "Fire Service",
  //     value: "Fire Service",
  //   },
  //   {
  //     id: 4,
  //     label: "E-Medical",
  //     value: "E-Medical",
  //   },
  // ]

  const tableActionEnums = {
    DELETE: 'Delete'
  }

  const getTableActionEnums = (): { [key: string]: string } | null => {
    return tableActionEnums
  }

  const tableAction = useTableAction({ actionEnums: getTableActionEnums() })

  const deleteRole = (data: string[]) => {}

  const handleTableAction = () => {
    if (tableAction.selectedItems)
      switch (tableAction.action) {
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
        {rsProps.isView('custom', 'create-org') ||
        rsProps.isView('custom', 'update-org') ? (
          <CreateRole states={state} actions={action} />
        ) : null}
        {rsProps.isView('custom', 'view-org') ? <></> : null}
        {rsProps.isView('custom', 'update-org') ? <></> : null}
      </RightSection>
      <div>
        <PageHeader
          title="Organization Management"
          load={organizationState?.getAllOrganizationLoading}
        />
        <div className="cta-header-section">
          <TypeButton
            buttonSize="small"
            title="Add Organization"
            onClick={() => {
              rsProps.callSection('custom', 'create-org')
            }}
          />
        </div>
        <div className="table-section card-section">
          <div className="filter-management-section">
            {/* {ROLE === "super-admin" ||
              (ROLE === "super-admin" && (
                <TypeSelect
                  initoption={{ label: "All", value: "" }}
                  label="Filter by Role"
                  optionsdata={roleOptionData}
                  customwidth={"300px"}
                />
              ))} */}
            {/* {GODUSER && (
              <TypeSelect
                initoption={{ label: "All", value: "" }}
                label="Filter by Organization"
                optionsdata={orgOptionData}
                customwidth={"300px"}
              />
            )} */}
          </div>
          <Table
            header={['ID', 'Organization', 'Action']}
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

export default OrganizationPage
