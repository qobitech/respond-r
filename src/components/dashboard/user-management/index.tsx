import React, { useEffect } from "react"
import "./index.scss"
import "../../../utils/new/pagination.scss"
import "../../../utils/new/page.scss"
import { IStates } from "interfaces/IReducer"
import CardTable from "components/reusable/card-table"
import RightSection, {
  useRightSection,
} from "components/reusable/right-section"
import { ITableRecord } from "../overview"
import CreateUser from "./create"
import ViewUser from "./view"
import FilterComponent, { IFilterData } from "components/reusable/filter"
import { IAction } from "interfaces/IAction"
import { Loader } from "utils/new/components"
import Switch, { Case, Default } from "components/reusable/switch"
import { IUser } from "interfaces/IUser"

interface IProps {
  states?: IStates
}

const getAllStates = (states?: IStates) => {
  const allUsers = states?.user.getAllUsers
  const loadUsers = states?.user.getAllUsersLoading

  return {
    allUsers,
    load: loadUsers || false,
  }
}

const UserManagement: React.FC<IProps> = ({ states, ...props }) => {
  const rsProps = useRightSection<IUser>()
  const componentState = getAllStates(states)
  const { getAllUsers } = props as unknown as IAction
  useEffect(() => {
    if (!componentState.allUsers) getAllUsers("")
    if (rsProps.queryAction === "create") {
      rsProps.callSectionOnQuery()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    if (componentState.allUsers && rsProps.queryAction !== "create") {
      const queryData = componentState.allUsers.users.filter(
        (i) => i.id === (rsProps.queryId as string)
      )?.[0]
      rsProps.callSectionOnQuery(queryData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [componentState.allUsers])
  const tableData = componentState.allUsers?.users?.map((i, index) => ({
    id: index + "",
    row: [
      {
        value: i.email,
        isLink: false,
        url: "",
        action: () => {},
      },
      {
        value: i.firstName + " " + i.lastName?.[0]?.toUpperCase() + ".",
        isLink: false,
        url: "",
        action: () => {},
      },
      {
        value: i.employeeId,
        isLink: false,
        url: "",
        action: () => {},
      },
      {
        value: i.userType,
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
          rsProps.callSection("view", "user", i.id + "", i)
        },
        buttonType: "bold",
      },
      {
        value: "Edit",
        isLink: true,
        url: "",
        action: () => {
          rsProps.callSection("update", "user", i.id + "", i)
        },
        buttonType: "bold",
      },
      {
        value: "Delete",
        isLink: true,
        url: "",
        action: () => {
          rsProps.callSection("delete", "user", i.id + "", i)
        },
        buttonType: "danger",
      },
    ],
  })) as ITableRecord[]

  const handlePagination = (selectedItem: { selected: number }) => {}
  const handleFilter = () => {}
  const handleFilterClear = () => {}
  const filterData: IFilterData[] = [
    {
      placeholder: "first name",
      type: "text",
      value: "",
    },
    {
      placeholder: "middle name",
      type: "text",
      value: "",
    },
    {
      placeholder: "last name",
      type: "text",
      value: "",
    },
    {
      placeholder: "employee id",
      type: "text",
      value: "",
    },
    {
      placeholder: "organization name",
      type: "text",
      value: "",
    },
    {
      placeholder: "state",
      type: "text",
      value: "",
    },
    {
      placeholder: "user type",
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
                rsProps.callSection("create", "user")
              },
            },
          ]}
          tableData={tableData}
          tableHeader={["Username", "Name", "Employee ID", "Status", "Action"]}
          tag="Lorem ipsum"
          title="User Management"
          handlePagination={handlePagination}
          isFilter
        >
          <FilterComponent {...filterProps} />
        </CardTable>
        <RightSection {...rsProps}>
          <Switch>
            <Case
              condition={
                rsProps.isView("create", "user") ||
                rsProps.isView("update", "user")
              }
            >
              <CreateUser
                states={states}
                actions={props as unknown as IAction}
                update={rsProps.isView("update", "user")}
                user={rsProps.data}
              />
            </Case>
            <Case
              condition={
                rsProps.isView("view", "user") ||
                rsProps.isView("delete", "user")
              }
            >
              <ViewUser
                states={states}
                actions={props as unknown as IAction}
                rsProps={rsProps}
              />
            </Case>
            <Default>
              <></>
            </Default>
          </Switch>
        </RightSection>
      </div>
      <Loader loader={componentState.load} />
    </div>
  )
}

export default UserManagement
