import React, { useEffect, useState } from "react"
import "./index.scss"
import { TypeButton } from "utils/new/button"
import { useNavigate, useSearchParams } from "react-router-dom"
import { ICallRightSection } from "store/actions/global"

export type actionType =
  | "create"
  | "view"
  | "update"
  | "delete"
  | "custom"
  | null
export type actionComponent =
  | "settings"
  | "create-admin"
  | "view-admin"
  | "update-admin"
  | "delete-admin"
  | "create-role"
  | "update-role"
  | "view-role"
  | "view-role-actions"
  | "assign-role"
  | "create-org"
  | "update-org"
  | "view-org"
  | "create-action"
  | "update-action"
  | "view-action"
  | "delete-action"
  | "asset"
  | "link-asset"
  | "report"
  | null
export type actionId = string | null

interface IRSAction {
  type: actionType
  component: actionComponent
  id?: actionId
}

export interface IRightSection<K> {
  closeSection: () => void
  openSection: boolean
  setAction: React.Dispatch<React.SetStateAction<IRSAction>>
  action: IRSAction
  setTitle: React.Dispatch<React.SetStateAction<string>>
  title: string
  setCtas: React.Dispatch<React.SetStateAction<ICTA[] | null>>
  ctas: ICTA[] | null
  callSection(
    action: actionType,
    component: actionComponent,
    id?: string,
    data?: K
  ): void
  isView: (type: actionType, component: actionComponent) => boolean
  data: K | null
  queryId: string | null
  queryAction: actionType
  queryComponent: actionComponent
  callSectionOnQuery(i?: K): void
  updateData(data: K | null): void
}

export const useRightSection = <K extends {}>(
  rightSectionProps?: ICallRightSection,
  callRightSection?: (props: ICallRightSection) => (dispatch: any) => void,
  onClose?: () => void
): IRightSection<K> => {
  const [searchParams] = useSearchParams()
  const queryId = searchParams.get("id")
  const queryAction = searchParams.get("action") as actionType
  const queryComponent = searchParams.get("component") as actionComponent
  const navigate = useNavigate()
  const [title, setTitle] = useState<string>("")
  const [ctas, setCtas] = useState<ICTA[] | null>(null)
  const [openSection, setOpenSection] = useState<boolean>(() => !!queryId)
  const [action, setAction] = useState<IRSAction>({
    type: null,
    component: null,
    id: null,
  })
  const [data, setData] = useState<K | null>(null)

  function updateData(data: K | null) {
    setData(data)
  }

  const getCTA = (
    action: actionType,
    component: actionComponent,
    id?: string
  ): ICTA[] | null => {
    switch (action) {
      case "view":
        return [
          {
            title: "Edit",
            action: () => {
              callSection("update", component, id)
            },
          },
          {
            title: "Delete",
            action: () => {
              callSection("delete", component, id)
            },
            type: "danger",
          },
        ]
      case "update":
        return [
          {
            title: "Delete",
            action: () => {
              callSection("delete", component, id)
            },
            type: "danger",
          },
        ]
      default:
        return null
    }
  }

  const isView = (type: actionType, component: actionComponent) => {
    return action.type === type && action.component === component
  }

  function callSection<T>(
    action: actionType,
    component: actionComponent,
    id?: string,
    data?: T
  ) {
    setAction({ type: action, component, id })
    setTitle(
      `${
        action === "custom" ? "" : action?.toUpperCase()
      } ${component?.toUpperCase()}`
    )
    setCtas(getCTA(action, component, id))
    setOpenSection(true)
    navigate(`?action=${action}&component=${component}${id ? "&id=" + id : ""}`)
    // if (data)
    setData(data as unknown as K)
  }

  function callSectionOnQuery(i?: K) {
    if (queryAction && queryComponent)
      callSection(queryAction, queryComponent, queryId ? queryId + "" : "", i)
  }

  const closeSection = () => {
    setOpenSection(false)
    navigate(`?`)
    callRightSection?.({ action: null, component: null })
    setAction({ type: null, component: null, id: null })
    onClose?.()
  }

  useEffect(() => {
    if (
      rightSectionProps &&
      rightSectionProps?.action !== null &&
      rightSectionProps?.component !== null
    ) {
      callSection(rightSectionProps.action, rightSectionProps.component)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rightSectionProps])

  return {
    closeSection,
    openSection,
    setAction,
    action,
    setTitle,
    title,
    setCtas,
    ctas,
    callSection,
    isView,
    data,
    queryId,
    queryAction,
    queryComponent,
    callSectionOnQuery,
    updateData,
  }
}

interface ICTA {
  title: string
  type?: "bold" | "outlined" | "disabled" | "danger"
  action?: () => void
}

interface IRSection<T> {
  children?: any
  rsProps: IRightSection<T>
}

const RightSection = <T extends {}>({ children, rsProps }: IRSection<T>) => {
  const handleClose = () => {
    rsProps.closeSection()
    rsProps.setAction({ component: null, type: null, id: null })
    rsProps.setCtas(null)
  }

  const matchChild: any = React.Children.map(children, (child) => {
    if (child) return (child = { ...child, props: { ...child.props, rsProps } })
    return child
  })

  return (
    <>
      {rsProps.openSection ? (
        <div className="back-drop" onClick={rsProps.closeSection} />
      ) : null}
      <div
        className={`right_container ${
          rsProps.openSection ? "menuopen" : "menuclose"
        }`}
      >
        <div className="rs-header">
          <h3>{rsProps.title}</h3>
          <div className="ctas">
            {rsProps.ctas?.map((i, index) => (
              <TypeButton
                buttonSize="small"
                title={i.title}
                buttonType={i.type}
                onClick={i.action}
                key={index}
              />
            ))}
            <TypeButton
              buttonSize="small"
              title=""
              close
              buttonType="danger"
              onClick={handleClose}
            />
          </div>
        </div>
        <div className="rs-body">{matchChild}</div>
      </div>
    </>
  )
}

export default RightSection
