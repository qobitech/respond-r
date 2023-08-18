import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./index.scss"
import { IStates } from "interfaces/IReducer"
import { ICell, ICellAction } from "utils/new/table"
import "../../../utils/new/pagination.scss"
import "../../../utils/new/page.scss"
import CardTable from "components/reusable/card-table"
import RightSection, {
  useRightSection,
} from "components/reusable/right-section"
import { url } from "enums/Route"
import CreateApplication from "../application/create"
import ViewApplication from "../application/view"
import {
  ApplicationsSVG,
  CalendarSVG,
  IntegrationSVG,
  UsersSVG,
} from "utils/new/svgs"
import { IAction } from "interfaces/IAction"
import { Loader } from "utils/new/components"
import { IApplication } from "interfaces/IApplication"

interface IProps {
  states?: IStates
}

const getAllStates = (states?: IStates) => {
  const allApplications = states?.application.getAllApplications
  const loadApplications = states?.application.getAllApplicationsLoading
  const allUsers = states?.user.getAllUsers
  const loadUsers = states?.user.getAllUsersLoading
  const allOrganizations = states?.organization.getAllOrganizations

  return {
    allApplications,
    allUsers,
    allOrganizations,
    load: (loadApplications && loadUsers) || false,
  }
}

export interface ITableRecord {
  id: string
  row: ICell[]
  rowActions: ICellAction[]
}

const Overview: React.FC<IProps> = ({ states, ...props }) => {
  const navigate = useNavigate()
  const { getAllApplications, getAllUsers } = props as unknown as IAction

  const componentState = getAllStates(states)

  useEffect(() => {
    if (!componentState.allApplications) getAllApplications("")
    if (!componentState.allUsers) getAllUsers("")
    if (rsProps.queryAction === "create") rsProps.callSectionOnQuery()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (rsProps.queryAction !== "create" && componentState.allApplications) {
      const queryData = componentState.allApplications.applications.filter(
        (i) => i.id === parseInt(rsProps.queryId as string)
      )?.[0]
      rsProps.callSectionOnQuery(queryData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [componentState.allApplications])

  const statsData = [
    {
      icon: <UsersSVG />,
      title: "Active Users",
      stats: componentState.allUsers?.users?.length || 0,
    },
    {
      icon: <ApplicationsSVG />,
      title: "Applications",
      stats: componentState.allApplications?.applications?.length || 0,
    },
    {
      icon: <IntegrationSVG />,
      title: "Integrations",
      stats: 0,
    },
  ]

  const rsProps = useRightSection<IApplication>()

  const tableData = componentState.allApplications?.applications
    ?.map((i, index) => ({
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
    }))
    .slice(0, 3) as ITableRecord[]

  return (
    <div className="main-page">
      <div className="pg-container">
        <div className="stats-card">
          <div className="stats-header">
            <div className="stats-title">
              <h1 className="title">Hello Admin</h1>
              <p className="description">Track progress</p>
            </div>
            <div className="stats-date">
              <div className="date-content">
                <p className="last">Last login</p>
                <p>28th July, 2023</p>
              </div>
              <CalendarSVG />
            </div>
          </div>
          <div className="stats">
            {statsData.map((i, index) => (
              <div className="stats-item" key={index}>
                {i.icon}
                <div className="stats-data">
                  <p>{i.title}</p>
                  <h5>{i.stats}</h5>
                </div>
              </div>
            ))}
          </div>
        </div>
        <CardTable
          cta={[
            {
              title: "CREATE NEW",
              action: () => {
                rsProps.callSection("create", "application")
              },
            },
            {
              title: "VIEW ALL",
              action: () => {
                navigate(url.APPLICATIONS)
              },
            },
          ]}
          tableData={tableData}
          tableHeader={["Name", "Date", "Description", "Action"]}
          tag="Recently added"
          title="Applications"
        />
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

export default Overview
