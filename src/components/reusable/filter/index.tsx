import React from "react"
import { TypeButton, TypeSmallButton } from "utils/new/button"
import { TypeInput } from "utils/new/input"
import "./index.scss"

export type filterType = "text" | "date" | "select"

export interface IFilterData {
  placeholder: string
  type: filterType
  value: string
}

export interface IFilter {
  filterData: IFilterData[]
  handleFilter: () => void
  handleFilterClear: () => void
}

const FilterComponent: React.FC<IFilter> = ({
  filterData,
  handleFilter,
  handleFilterClear,
}) => {
  return (
    <div className="filter-container">
      <div className="filter-items">
        {filterData.map((i, index) => {
          if (i.type !== "select") {
            return <TypeInput {...i} key={index} />
          }
          return <div key={index}></div>
        })}
      </div>
      <div className="cta-filter">
        <TypeButton title="FILTER" onClick={handleFilter} />
        <TypeSmallButton
          title="Clear"
          buttonType="danger"
          onClick={handleFilterClear}
        />
      </div>
    </div>
  )
}

export default FilterComponent
