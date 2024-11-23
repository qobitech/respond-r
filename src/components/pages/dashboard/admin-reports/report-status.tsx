import { ReportStatusItem } from './report-status-item'

export const ReportStatus = ({ reportStatus }: { reportStatus: string[] }) => {
  return (
    <div className="d-flex align-items-center" style={{ gap: '20px' }}>
      {reportStatus.map((i, index) => (
        <ReportStatusItem status={i} key={index} />
      ))}
    </div>
  )
}
