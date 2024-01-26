import React, { useEffect } from "react"
import Table, { ICell, ICellAction, useTableAction } from "utils/new/table"
import "../../../../utils/new/pagination.scss"
import "../../../../utils/new/page.scss"
import "./management.scss"
import { TypeSmallButton } from "../../../../utils/new/button"
import RightSection, { useRightSection } from "../../../reusable/right-section"
import { IStates } from "interfaces/IReducer"
import { IAction } from "interfaces/IAction"
import { PageHeader } from "components/dashboard/components"
import CreateRole from "./create-organization"
import { IOrganization } from "interfaces/IOrganization"

interface IProps {
  states?: IStates
  actions?: IAction
}

const OrganizationPage: React.FC<IProps> = ({ states, actions }) => {
  const { callRightSection, getAllOrganization } = actions as IAction

  const rightSectionProps = states?.global.rightSection

  const organizationState = states?.organization

  const rsProps = useRightSection<IOrganization>(
    rightSectionProps,
    callRightSection
  )

  useEffect(() => {
    getAllOrganization("")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  interface ITable {
    id: string
    row: ICell[]
    rowActions: ICellAction[]
  }

  console.log(organizationState?.getAllOrganization?.data, "juju")

  const record: ITable[] = organizationState?.getAllOrganization?.data?.map(
    (i) => ({
      id: "1",
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
            rsProps.callSection("custom", "update-org", i.id.toString(), i)
          },
        },
        {
          value: "Delete",
          isLink: true,
          buttonType: "danger",
          action: () => {},
        },
      ],
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
        {rsProps.isView("custom", "create-org") ||
        rsProps.isView("custom", "update-org") ? (
          <CreateRole states={states!} actions={actions!} />
        ) : null}
        {rsProps.isView("custom", "view-org") ? <></> : null}
        {rsProps.isView("custom", "update-org") ? <></> : null}
      </RightSection>
      <div>
        <PageHeader
          title="Organization Management"
          load={organizationState?.getAllOrganizationLoading!}
        />
        <div className="cta-header-section">
          <TypeSmallButton
            title="Add Organization"
            onClick={() => {
              rsProps.callSection("custom", "create-org")
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
            header={["ID", "Organization", "Action"]}
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
