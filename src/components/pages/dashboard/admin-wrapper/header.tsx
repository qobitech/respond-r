import { FC } from 'react'
import { IHeader, tabEnums } from './utils'
import { PlusSVG, PulseSVG, RefreshSVG } from 'utils/svgs'
import { ReportStatus } from '../admin-reports/report-status'

export const Header: FC<IHeader> = ({
  setTab,
  tab,
  createAssetLoading,
  setShowHeader,
  showHeader,
  loadReports,
  fetchAssets,
  fetchReports,
  addAsset
}) => {
  return (
    <>
      {Object.values(tabEnums).map((i, index) => (
        <div
          className={`tab-item ${i === tab ? 'active' : ''}`}
          key={index}
          onClick={() => setTab(i)}
        >
          <p>{i}</p>
        </div>
      ))}

      <div
        className={`ml-auto pr-4 align-items-center ${
          tab !== tabEnums.REPORTS ? 'd-none' : 'd-flex'
        }`}
        style={{ gap: '50px' }}
      >
        <div className="video-section-header-tab">
          <button onClick={() => addAsset()} className="border-0">
            ADD ASSET&nbsp;&nbsp;&nbsp;
            {createAssetLoading ? <PulseSVG /> : <PlusSVG />}
          </button>
          <button
            onClick={() => {
              fetchReports?.(1)
              fetchAssets?.()
            }}
          >
            REFRESH&nbsp;&nbsp;&nbsp;
            {loadReports ? <PulseSVG /> : <RefreshSVG />}
          </button>
          <button
            className={showHeader ? 'active' : ''}
            onClick={() => {
              setShowHeader(!showHeader)
            }}
          >
            {showHeader ? 'HIDE' : 'SHOW'} FILTER
          </button>
        </div>
        <ReportStatus
          reportStatus={['New', 'Assigned', 'Accepted', 'Closed', 'Rejected']}
        />
      </div>
    </>
  )
}
