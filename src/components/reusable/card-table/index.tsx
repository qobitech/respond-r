import React, { useState } from "react"
import "./index.scss"
import { TypeButton, TypeSmallButton } from "utils/new/button"
import Table from "utils/new/table"
import ReactPaginate from "react-paginate"
import "../../../utils/new/pagination.scss"
import { ITableRecord } from "components/dashboard/traffic"

interface IProps {
  tableData: ITableRecord[]
  tableHeader: string[]
  handlePagination?: (selectedItem: { selected: number }) => void
  title: string
  tag: string
  cta?: Array<{
    title: string
    action?: () => void
  }>
  isFilter?: boolean
  children?: any
  inner?: boolean
}

const CardTable: React.FC<IProps> = ({
  tableData,
  tableHeader,
  title,
  tag,
  cta,
  isFilter,
  handlePagination,
  children,
  inner,
}) => {
  const isPagination = typeof handlePagination === "function"

  const [filter, setFilter] = useState<boolean>(false)

  const handleFilter = () => {
    setFilter(!filter)
  }

  const matchChild: any = React.Children.map(children, (child) => {
    if (child)
      return (child = {
        ...child,
        props: { ...child.props, closeFilter: handleFilter },
      })
    return child
  })

  return (
    <div className={`application-card ${inner ? "inner" : ""}`}>
      <div className="application-header">
        <div className="application-header-content">
          <h3 className={inner ? "inner" : ""}>{title}</h3>
          <p>{tag}</p>
        </div>
        <div className="application-cta">
          {cta?.map((i, index) => (
            <TypeButton title={i.title} onClick={i?.action} key={index} />
          ))}
        </div>
      </div>
      <div className="filter-section">
        {isFilter && <TypeSmallButton title="Filter" onClick={handleFilter} />}
        {filter && (
          <TypeSmallButton
            title=""
            close
            buttonType="danger"
            onClick={handleFilter}
          />
        )}
      </div>
      <div>
        <div className="table-filter">
          <div className={`filter-section ${filter ? "show" : ""}`}>
            {matchChild}
          </div>
          <div className={`table-containers ${filter ? "shrink" : ""}`}>
            <div className="table-section">
              <Table
                header={tableHeader}
                record={tableData}
                hideCheck
                hideNumbering
              />
            </div>
            {isPagination && (
              <div className="pagination-container">
                <ReactPaginate
                  breakLabel="..."
                  previousLabel="<<"
                  nextLabel=">>"
                  pageCount={1}
                  onPageChange={handlePagination}
                  containerClassName={"pagination"}
                  activeClassName={"active"}
                  renderOnZeroPageCount={undefined}
                  forcePage={1}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardTable
