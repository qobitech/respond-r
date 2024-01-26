import React, { useEffect } from "react"
import Table, { ICell, ICellAction } from "utils/new/table"
import "../../../../utils/new/pagination.scss"
import "../../../../utils/new/page.scss"
import "./management.scss"
import { TypeSmallButton } from "../../../../utils/new/button"
import { TypeSelect } from "../../../../utils/new/select"
import RightSection, { useRightSection } from "../../../reusable/right-section"
import { IStates } from "interfaces/IReducer"
import { IAction } from "interfaces/IAction"
import CreateAction from "./create"
import { IUser } from "interfaces/IUser"
import { GODUSER } from "utils/new/constants/roles"
import { PageHeader } from "components/dashboard/components"

interface IProps {
  states?: IStates
  actions?: IAction
}

const ActionPage: React.FC<IProps> = ({ states, actions }) => {
  const { callRightSection, getAllUsers } = actions as IAction

  const rightSectionProps = states?.global.rightSection

  const userState = states?.user

  const rsProps = useRightSection<IUser>(rightSectionProps, callRightSection)

  useEffect(() => {
    getAllUsers("")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  interface ITable {
    id: string
    row: ICell[]
    rowActions: ICellAction[]
  }

  const demoAction = [
    {
      action: "create user",
      description: "can create user",
    },
    {
      action: "view user",
      description: "can view user",
    },
    {
      action: "modify user",
      description: "can modify user",
    },
    {
      action: "delete user",
      description: "can delete user",
    },
  ]

  const record: ITable[] = demoAction?.map((i) => ({
    id: "1",
    row: [
      {
        value: i.action,
        isLink: false,
      },
      {
        value: i.description,
        isLink: false,
      },
    ],
    rowActions: [
      {
        value: "Assign Role",
        isLink: true,
        action: () => {
          // rsProps.callSection("custom", "update-admin", i.email, i)
        },
      },
      {
        value: "Update Action",
        isLink: true,
        action: () => {
          // rsProps.callSection("custom", "update-admin", i.email, i)
        },
      },
      {
        value: "Delete Action",
        isLink: true,
        action: () => {
          // rsProps.callSection("custom", "update-admin", i.email, i)
        },
        buttonType: "danger",
      },
    ],
  })) as ITable[]

  const roleOptionData = [
    {
      id: 1,
      label: "Super-Admin",
      value: "Super-Admin",
    },
    {
      id: 2,
      label: "Admin",
      value: "Admin",
    },
    {
      id: 3,
      label: "Moderator",
      value: "Moderator",
    },
    {
      id: 4,
      label: "Field Officer",
      value: "Field Officer",
    },
  ]

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

  return (
    <>
      <RightSection rsProps={rsProps}>
        {rsProps.isView("custom", "create-admin") ||
        rsProps.isView("custom", "update-admin") ? (
          <CreateAction states={states!} actions={actions!} />
        ) : null}
        {rsProps.isView("custom", "view-admin") ? <></> : null}
        {rsProps.isView("custom", "update-admin") ? <></> : null}
      </RightSection>
      <div>
        <PageHeader
          title="Action Management"
          load={userState?.getAllUsersLoading!}
        />

        <div className="cta-header-section">
          <TypeSmallButton
            title="Add Action"
            onClick={() => {
              rsProps.callSection("custom", "create-admin")
            }}
          />
        </div>
        <div className="table-section card-section">
          <div className="filter-management-section">
            <TypeSelect
              initoption={{ label: "All", value: "" }}
              label="Filter by Role"
              optionsdata={roleOptionData}
              customwidth={"300px"}
            />
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
            header={["Title", "Description", "Actions"]}
            record={record}
            hideNumbering
          />
        </div>
      </div>
    </>
  )
}

export default ActionPage
