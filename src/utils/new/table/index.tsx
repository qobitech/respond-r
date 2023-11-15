import React from "react"
import "./table.scss"
import { TypeCheckbox } from "../checkbox"
import { PAGE_SIZE } from "../constants"
import { TypeSmallButton } from "../button"
import { useNavigate } from "react-router-dom"

export interface ICell {
  value?: string | number
  isLink: boolean
  position?: number
  status?: boolean
  rating?: number
  lastPosition?: number
  icon?: string
  url?: string
  action?: () => void
}

export interface ICellAction extends ICell {
  icon?: string
  color?: string
  view?: "text" | "icon" | "both"
  background?: string
  buttonType?: "bold" | "outlined" | "disabled" | "danger" | undefined
}

interface IResultTable {
  header: string[]
  record: Array<{ id: string; row: ICell[]; rowActions: ICellAction[] }>
  checkedRows?: { [key: string]: any }
  handleCheckedRows?: ({ target }: { target: any }) => void
  clearCheckedRows?: () => void
  addAllCheckedRows?: () => void
  setCheckAll?: React.Dispatch<React.SetStateAction<boolean>>
  checkAll?: boolean
  currentPage?: number
  hideCheck?: boolean
  hideNumbering?: boolean
}

const Table: React.FC<IResultTable> = ({
  header,
  record,
  checkedRows,
  handleCheckedRows,
  clearCheckedRows,
  addAllCheckedRows,
  setCheckAll,
  checkAll,
  currentPage,
  hideCheck,
  hideNumbering,
}) => {
  const isRecord = record?.length > 0
  const isCheckedRow = (id: string) => {
    if (!checkedRows) return false
    return !!checkedRows[id]
  }

  return (
    <div className="table-container">
      <table className="resultTable">
        <thead className="thead_blue">
          <tr>
            {!hideNumbering && <th></th>}
            {header.map((i, index) => {
              if (index === 0) {
                return (
                  <th
                    key={index}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    {!hideCheck && (
                      <div style={{ marginRight: 25 }}>
                        <TypeCheckbox
                          onChange={({ target }) => {
                            const { checked } = target || {}
                            if (typeof setCheckAll === "function")
                              setCheckAll(checked)
                            if (!checked) {
                              if (typeof clearCheckedRows === "function")
                                clearCheckedRows()
                            } else {
                              if (typeof addAllCheckedRows === "function")
                                addAllCheckedRows()
                            }
                          }}
                          checked={checkAll}
                        />
                      </div>
                    )}
                    {i}
                  </th>
                )
              } else {
                return <th key={index}>{i}</th>
              }
            })}
          </tr>
        </thead>
        <tbody>
          {isRecord &&
            record.map((i, jindex) => (
              <tr key={jindex}>
                {!hideNumbering && (
                  <td
                    style={{ padding: "10px 0px 10px 10px" }}
                    width={`${100 / header.length}%`}
                  >
                    <p style={{ margin: 0 }}>
                      {jindex + 1 + ((currentPage || 0) - 1) * PAGE_SIZE}
                    </p>
                  </td>
                )}
                {i?.row?.map((j, index) => {
                  if (index === 0) {
                    return (
                      <td key={index} width={`${100 / header.length}%`}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          {!hideCheck && (
                            <div style={{ marginRight: 25 }}>
                              <TypeCheckbox
                                onChange={handleCheckedRows}
                                checked={checkAll || isCheckedRow(i?.id)}
                                id={i.id}
                              />
                            </div>
                          )}
                          <CellValueComponent {...j} />
                        </div>
                      </td>
                    )
                  } else {
                    return (
                      <td key={index} width={`${100 / header.length}%`}>
                        <CellValueComponent {...j} />
                      </td>
                    )
                  }
                })}
                <td width={`${100 / header.length}%`}>
                  <div className="table-cell-action">
                    {
                      i?.rowActions?.map((j, index) => (
                        <CellValueActionComponent
                          key={index}
                          {...j}
                          nomargin={
                            index === i?.rowActions.length - 1
                              ? "true"
                              : "false"
                          }
                        />
                      ))
                      // )
                    }
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {!isRecord && (
        <p className="margin-auto text-center py-4 font-small no-data">
          No Data
        </p>
      )}
    </div>
  )
}

const CellValueComponent: React.FC<ICell> = ({ value, action }) => {
  return <TDContent action={action} value={value} />
}

interface ITDC {
  action: (() => void) | undefined
  value: string | number | undefined
}

const TDContent: React.FC<ITDC> = ({ action, value }) => {
  return (
    <p className="m-0 d-flex align-items-center text-small" onClick={action}>
      <span className="d-block" style={{ width: "120px" }}>
        {value}
      </span>
    </p>
  )
}

interface ICVAC extends ICellAction {
  nomargin?: "true" | "false"
}

const CellValueActionComponent: React.FC<ICVAC> = ({
  isLink,
  value,
  url,
  action,
  color,
  buttonType,
  view,
}) => {
  const navigate = useNavigate()
  return (
    <TypeSmallButton
      color={color}
      title={view !== "icon" ? value + "" : ""}
      buttonType={buttonType}
      style={{ height: "35px", fontSize: "12px" }}
      onClick={() => (isLink ? action?.() : navigate(url || ""))}
      className="mr-2"
    />
  )
}

export default Table
