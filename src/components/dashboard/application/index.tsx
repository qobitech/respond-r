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
import CreateApplication from "./create"
import ViewApplication from "./view"
import FilterComponent, { IFilterData } from "components/reusable/filter"
import { Loader } from "utils/new/components"
import { IAction } from "interfaces/IAction"
import { IApplication } from "interfaces/IApplication"

interface IProps {
  states?: IStates
}

const getAllStates = (states?: IStates) => {
  const allApplications = states?.application.getAllApplications
  const loadApplications = states?.application.getAllApplicationsLoading

  return {
    allApplications,
    load: loadApplications || false,
  }
}

const Application: React.FC<IProps> = ({ states, ...props }) => {
  const rsProps = useRightSection<IApplication>()
  const component: actionComponent = "application"
  const componentState = getAllStates(states)
  const { getAllApplications } = props as unknown as IAction

  useEffect(() => {
    if (!componentState.allApplications) getAllApplications("")
    if (rsProps.queryAction === "create") {
      rsProps.callSectionOnQuery()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (componentState.allApplications && rsProps.queryAction !== "create") {
      const queryData = componentState.allApplications.applications.filter(
        (i) => i.id === parseInt(rsProps.queryId as string)
      )?.[0]
      rsProps.callSectionOnQuery(queryData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [componentState.allApplications])

  const tableData = componentState.allApplications?.applications?.map(
    (i, index) => ({
      id: index + "",
      row: [
        {
          value: i.applicationName,
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
        {
          value: i.description,
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
            rsProps.callSection("view", "application", i.id + "", i)
          },
          buttonType: "bold",
        },
        {
          value: "Edit",
          isLink: true,
          url: "",
          action: () => {
            rsProps.callSection("update", "application", i.id + "", i)
          },
          buttonType: "bold",
        },
        {
          value: "Delete",
          isLink: true,
          url: "",
          action: () => {
            rsProps.callSection("delete", "application", i.id + "", i)
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
          tableHeader={["Name", "Date", "Description", "Action"]}
          tag="Lorem ipsum"
          title="Applications"
          handlePagination={handlePagination}
          isFilter
        >
          <FilterComponent {...filterProps} />
        </CardTable>
        <RightSection rsProps={rsProps}>
          {(rsProps.isView("create", "application") ||
            rsProps.isView("update", "application")) && (
            <CreateApplication
              states={states}
              actions={props as unknown as IAction}
            />
          )}
          {(rsProps.isView("view", "application") ||
            rsProps.isView("delete", "application")) && (
            <ViewApplication
              states={states}
              actions={props as unknown as IAction}
            />
          )}
        </RightSection>
      </div>
      <Loader loader={componentState.load} />
    </div>
  )
}

export default Application
