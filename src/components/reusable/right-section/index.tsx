import React, { useState } from "react"
import "./index.scss"
import { TypeSmallButton } from "utils/new/button"
import { useNavigate, useSearchParams } from "react-router-dom"

export type actionType = "create" | "view" | "update" | "delete" | null
export type actionComponent =
  | "application"
  | "user"
  | "notification"
  | "organization"
  | "api bundle"
  | "api configuration"
  | "configuration group"
  | "client subscription"
  | "role"
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

export const useRightSection = <K extends {}>(): IRightSection<K> => {
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
    setTitle(`${action?.toUpperCase()} ${component?.toUpperCase()}`)
    setCtas(getCTA(action, component, id))
    setOpenSection(true)
    navigate(`?action=${action}&component=${component}${id ? "&id=" + id : ""}`)
    if (data) setData(data as unknown as K)
  }

  function callSectionOnQuery(i?: K) {
    if (queryAction && queryComponent)
      callSection(queryAction, queryComponent, queryId ? queryId + "" : "", i)
  }

  const closeSection = () => {
    setOpenSection(false)
    navigate(`?`)
  }

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

interface IRSection {
  children?: any
  openSection: boolean
  closeSection: () => void
  setAction: React.Dispatch<React.SetStateAction<IRSAction>>
  action: IRSAction
  title: string
  ctas?: ICTA[] | null
  setCtas: React.Dispatch<React.SetStateAction<ICTA[] | null>>
}

const RightSection: React.FC<IRSection> = ({
  children,
  openSection,
  closeSection,
  setAction,
  action,
  title,
  ctas,
  setCtas,
}) => {
  const handleClose = () => {
    closeSection()
    setAction({ component: null, type: null, id: null })
    setCtas(null)
  }
  return (
    <div
      className={`right_container ${openSection ? "menuopen" : "menuclose"}`}
    >
      <div className="rs-header">
        <h3>{title}</h3>
        <div className="ctas">
          {ctas?.map((i, index) => (
            <TypeSmallButton
              title={i.title}
              buttonType={i.type}
              onClick={i.action}
              key={index}
            />
          ))}
          <TypeSmallButton
            title=""
            close
            buttonType="danger"
            onClick={handleClose}
          />
        </div>
      </div>
      <div className="rs-body">
        {React.cloneElement(children, {
          openSection,
          closeSection,
          setAction,
          action,
        })}
      </div>
    </div>
  )
}

export default RightSection
