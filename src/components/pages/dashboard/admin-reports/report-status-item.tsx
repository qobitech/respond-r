import { getReportStatusBg } from './helpers'

export const ReportStatusItem = ({ status }: { status: string }) => {
  return (
    <div className="d-flex align-items-center" style={{ gap: '5px' }}>
      <div
        style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          background: getReportStatusBg(status)
        }}
        title={status}
      ></div>
      <p className="m-0 text-color" style={{ fontSize: '0.7rem' }}>
        {status}
      </p>
    </div>
  )
}
