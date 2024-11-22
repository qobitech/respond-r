import Table from 'utils/new/table'
import { ITableRecord } from './utils'
import ReactPaginate from 'react-paginate'

export const TableSection = ({
  header,
  record,
  handlePagination,
  hideTableAction
}: {
  header: string[]
  record: ITableRecord[]
  handlePagination?: (selectedItem: { selected: number }) => void
  hideTableAction?: boolean
}) => {
  const isPagination = typeof handlePagination === 'function'
  return (
    <div>
      <div className="table-section">
        <Table
          header={header}
          record={record}
          hideNumbering
          hideTableAction={hideTableAction}
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
            containerClassName={'pagination'}
            activeClassName={'active'}
            renderOnZeroPageCount={undefined}
            forcePage={1}
          />
        </div>
      )}
    </div>
  )
}
