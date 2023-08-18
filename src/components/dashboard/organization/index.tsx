import React, { useEffect } from "react"
import "./index.scss"
import { IStates } from "interfaces/IReducer"
import "../../../utils/new/pagination.scss"
import "../../../utils/new/page.scss"
import CardTable from "components/reusable/card-table"
import RightSection, {
  actionComponent,
  useRightSection,
} from "components/reusable/right-section"
import { ITableRecord } from "../overview"
import FilterComponent, { IFilterData } from "components/reusable/filter"
import Switch, { Case, Default } from "components/reusable/switch"
import CreateOrganization from "./create"
import { IAction } from "interfaces/IAction"
import { IOrganization } from "interfaces/IOrganization"
import ViewOrganization from "./view"

interface IProps {
  states?: IStates
}

const getAllStates = (states?: IStates) => {
  const allOrg = states?.organization.getAllOrganizations
  const loadOrg = states?.organization.getAllOrganizationsLoading

  return {
    allOrg,
    load: loadOrg || false,
  }
}

const Organization: React.FC<IProps> = ({ states, ...props }) => {
  const rsProps = useRightSection<IOrganization>()
  const component: actionComponent = "organization"
  const componentState = getAllStates(states)
  const { getAllUsers } = props as unknown as IAction
  useEffect(() => {
    if (!componentState.allOrg) getAllUsers("")
    if (rsProps.queryAction === "create") {
      rsProps.callSectionOnQuery()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    if (componentState.allOrg && rsProps.queryAction !== "create") {
      const queryData = componentState.allOrg.organizations.filter(
        (i) => i.id === parseInt(rsProps.queryId as string)
      )?.[0]
      rsProps.callSectionOnQuery(queryData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [componentState.allOrg])
  const tableData: ITableRecord[] = componentState.allOrg?.organizations?.map(
    (i) => ({
      id: i.id + "",
      row: [
        {
          value: i.organizationName || "",
          isLink: false,
          url: "",
          action: () => {},
        },
        {
          value: i.email || "",
          isLink: false,
          url: "",
          action: () => {},
        },
        {
          value: new Date(i.createdAt).toDateString(),
          isLink: false,
          url: "",
          action: () => {},
        },
      ],
      rowActions: [
        {
          value: "View",
          isLink: true,
          url: "",
          action: () => {
            rsProps.callSection("view", component, i.id + "", i)
          },
          buttonType: "bold",
        },
        {
          value: "Edit",
          isLink: true,
          url: "",
          action: () => {
            rsProps.callSection("update", component, i.id + "", i)
          },
          buttonType: "bold",
        },
        {
          value: "Delete",
          isLink: true,
          url: "",
          action: () => {
            rsProps.callSection("delete", component, i.id + "", i)
          },
          buttonType: "danger",
        },
      ],
    })
  ) as ITableRecord[]
  const handlePagination = (selectedItem: { selected: number }) => {}
  const handleFilter = () => {}
  const handleFilterClear = () => {}
  const filterData: IFilterData[] = [
    {
      placeholder: "application name",
      type: "text",
      value: "",
    },
    {
      placeholder: "client id",
      type: "text",
      value: "",
    },
    {
      placeholder: "ennvironment type",
      type: "text",
      value: "",
    },
  ]
  const filterProps = {
    handleFilter,
    handleFilterClear,
    filterData,
  }
  return (
    <div className="main-page">
      <div className="pg-container">
        <CardTable
          cta={[
            {
              title: "CREATE NEW",
              action: () => {
                rsProps.callSection("create", component)
              },
            },
          ]}
          tableData={tableData}
          tableHeader={["Organization", "Email", "Date Created", "Action"]}
          tag="Lorem ipsum"
          title="Organizations"
          handlePagination={handlePagination}
          isFilter
        >
          <FilterComponent {...filterProps} />
        </CardTable>
        <RightSection rsProps={rsProps}>
          {(rsProps.isView("create", "organization") ||
            rsProps.isView("update", "organization")) && (
            <CreateOrganization
              states={states}
              actions={props as unknown as IAction}
            />
          )}
          {(rsProps.isView("view", "organization") ||
            rsProps.isView("delete", "organization")) && (
            <ViewOrganization
              states={states}
              actions={props as unknown as IAction}
            />
          )}
        </RightSection>
      </div>
    </div>
  )
}

export default Organization
