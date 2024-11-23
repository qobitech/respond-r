import { FC } from 'react'
import { IVRI } from './utils'
import { MainViewLocal } from '../service-component/main-view-local'

export const ViewReportItem: FC<IVRI> = ({
  backToAllReports,
  feed,
  assignAssets,
  assets,
  updateReport,
  updateReportProps
}) => {
  return (
    <div className="view-report-item-container">
      <div className="back-btn-container">
        <button className="button-action danger" onClick={backToAllReports}>
          Back
        </button>
      </div>
      <div className="view-report-item">
        <MainViewLocal
          feed={feed}
          assignAssets={assignAssets}
          assets={assets}
          updateReport={updateReport}
          updateReportProps={updateReportProps}
        />
      </div>
    </div>
  )
}
