import { FC } from 'react'
import { IReportSection } from './utils'
import { TableWrapper } from './table-wrapper'
import ReportTable from 'utils/report-table'

export const ReportSection: FC<IReportSection> = ({
  reportsGroupedByDate,
  getTableReport,
  lastCardElementRef,
  hide
}) => {
  return (
    <div className={hide ? 'hide-prop' : ''}>
      {reportsGroupedByDate ? (
        <div className="table-wrapper">
          {Object.values(reportsGroupedByDate)?.map((report, index) => (
            <TableWrapper
              title={Object.keys(reportsGroupedByDate)[index]}
              key={index}
            >
              <ReportTable
                header={['Time', 'Report', 'Location', 'Status']}
                record={getTableReport(report)}
                hideNumbering
                lastCardElementRef={lastCardElementRef}
              />
            </TableWrapper>
          ))}
        </div>
      ) : null}
    </div>
  )
}
