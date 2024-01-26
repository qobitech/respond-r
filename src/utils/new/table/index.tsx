import React, { FC, useState } from "react"
import "./table.scss"
import { TypeCheckbox } from "../checkbox"
import { PAGE_SIZE } from "../constants"
import { TypeSmallButton } from "../button"
import { useNavigate } from "react-router-dom"
import { TypeSelect } from "../select"
import { TypeInput } from "../input"
import ReactPaginate from "react-paginate"
import { CloseSVG } from "../svgs"

export interface ITableAction {
  action: string
  setAction: React.Dispatch<React.SetStateAction<string>>
  selectedItems: string[]
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>
  actionEnums?: {
    [key: string]: string
  } | null
  handleSelectAll: (
    { target }: React.ChangeEvent<HTMLInputElement>,
    record: ITableRecord[]
  ) => void
  handleSelect: (
    { target }: React.ChangeEvent<HTMLInputElement>,
    record: ITableRecord
  ) => void
  searchAction?: (req: any) => void
  setSearchValue: React.Dispatch<React.SetStateAction<string>>
  searchValue: string
  searchPlaceHolder?: string
  paginationParams?: IPaginationParams
}

interface IPaginationParams {
  current: number
  total: number
  onPageChange?(selectedItem: { selected: number }): void
  isPagination: boolean
}

interface ITableArgs {
  actionEnums?: { [key: string]: string } | null
  searchAction?: (req: any) => void
  paginationParams?: IPaginationParams
  searchPlaceHolder?: string
}

export const useTableAction = (tableArg?: ITableArgs): ITableAction => {
  const [action, setAction] = useState<string>("")
  const [searchValue, setSearchValue] = useState<string>("")
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const handleSelectAll = (
    { target }: React.ChangeEvent<HTMLInputElement>,
    record: ITableRecord[]
  ) => {
    const { checked } = target
    setSelectedItems(() => {
      if (checked) {
        return [...record.map((i) => i.id)]
      }
      return []
    })
  }

  const handleSelect = (
    { target }: React.ChangeEvent<HTMLInputElement>,
    record: ITableRecord
  ) => {
    const { checked } = target
    setSelectedItems((prev) => {
      if (checked) {
        return [record.id, ...prev]
      } else {
        return prev.filter((v) => v !== record.id)
      }
    })
  }

  return {
    action,
    setAction,
    selectedItems,
    setSelectedItems,
    actionEnums: tableArg?.actionEnums,
    handleSelect,
    handleSelectAll,
    searchValue,
    setSearchValue,
    searchAction: tableArg?.searchAction,
    paginationParams: tableArg?.paginationParams,
    searchPlaceHolder: tableArg?.searchPlaceHolder,
  }
}

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

export interface ITableRecord {
  id: string
  row: ICell[]
  rowActions: ICellAction[]
}

interface IResultTable {
  header: string[]
  record: ITableRecord[]
  currentPage?: number
  hideNumbering?: boolean
  tableAction?: ITableAction
  handleTableAction?: () => void
}

const Table: React.FC<IResultTable> = ({
  header,
  record,
  currentPage,
  hideNumbering,
  tableAction,
  handleTableAction,
}) => {
  const isRecord = record?.length > 0
  const isCheckedRow = (id: string) => {
    return !!tableAction?.selectedItems?.includes?.(id)
  }

  const hideCheck =
    !Object.keys(tableAction?.actionEnums || {})?.[0] || !record?.[0]

  const selectedAll =
    tableAction?.selectedItems !== null &&
    tableAction?.selectedItems?.length === record?.length

  return (
    <div className="table-container">
      <TableActionComponent
        tableAction={tableAction}
        handleTableAction={handleTableAction}
        isCTA={isRecord}
      />
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
                          onChange={(e) =>
                            tableAction?.handleSelectAll(e, record)
                          }
                          checked={selectedAll}
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
                                onChange={(e) =>
                                  tableAction?.handleSelect(e, i)
                                }
                                checked={selectedAll || isCheckedRow(i.id)}
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
      {!isRecord ? (
        <p className="margin-auto text-center py-4 font-small no-data">
          No Data
        </p>
      ) : (
        <>
          {tableAction?.paginationParams?.isPagination ? (
            <div className="d-flex align-items-center justify-content-center">
              <ReactPaginate
                breakLabel="..."
                previousLabel="<<"
                nextLabel=">>"
                pageCount={tableAction?.paginationParams?.total || 0}
                onPageChange={tableAction?.paginationParams?.onPageChange}
                containerClassName={"pagination"}
                activeClassName={"active"}
                forcePage={
                  tableAction?.paginationParams?.current
                    ? tableAction?.paginationParams?.current - 1
                    : 0
                }
              />
            </div>
          ) : null}
        </>
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

interface ITableActionComponent {
  tableAction: ITableAction | undefined
  handleTableAction: (() => void) | undefined
  isCTA: boolean
}

const TableActionComponent: FC<ITableActionComponent> = ({
  tableAction,
  handleTableAction,
  isCTA,
}) => {
  const isTableAction = !!tableAction?.selectedItems?.[0]
  return (
    <div
      style={{
        position: "sticky",
        left: 0,
      }}
      className={`pb-3 d-flex align-items-center justify-content-between table-action`}
    >
      <div
        className="d-flex align-items-center bulk-action"
        style={{ gap: "20px" }}
      >
        <TypeSelect
          initoption={{ label: "Select action", value: "" }}
          optionsdata={Object.values(tableAction?.actionEnums || {}).map(
            (i, index) => ({
              id: index,
              label: i,
              value: i,
            })
          )}
          disabled={!isTableAction}
          value={tableAction?.action || ""}
          style={{
            width: "150px",
            height: "40px",
            fontSize: "13px",
            outline: "0",
          }}
          onChange={({ target }) => {
            const { value } = target
            tableAction?.setAction?.(value)
          }}
        />
        <TypeSmallButton
          title="Proceed"
          buttonType={isTableAction && isCTA ? "outlined" : "disabled"}
          onClick={handleTableAction}
          disabled={!isTableAction || !isCTA}
        />
      </div>
      <div
        className="d-flex align-items-center bulk-action"
        style={{ gap: "20px" }}
      >
        <div className="position-relative w-100">
          <TypeInput
            value={tableAction?.searchValue}
            style={{
              minWidth: "250px",
              height: "40px",
              fontSize: "13px",
              outline: "0",
              paddingRight: tableAction?.searchValue ? "40px" : "",
            }}
            placeholder={tableAction?.searchPlaceHolder || "Search here"}
            onChange={({ target }) => {
              const { value } = target
              tableAction?.setSearchValue(value)
            }}
          />
          {tableAction?.searchValue ? (
            <div
              className="position-absolute d-flex align-items-center h-100 px-3"
              style={{ right: 0, top: 0, cursor: "pointer" }}
              onClick={() => {
                tableAction?.setSearchValue("")
                tableAction?.searchAction?.("")
              }}
            >
              <CloseSVG />
            </div>
          ) : null}
        </div>
        <TypeSmallButton
          title="Search"
          buttonType={
            tableAction?.searchValue && isCTA ? "outlined" : "disabled"
          }
          onClick={() => {
            tableAction?.searchAction?.(tableAction.searchValue)
          }}
          disabled={!tableAction?.searchValue || !isCTA}
        />
      </div>
    </div>
  )
}
