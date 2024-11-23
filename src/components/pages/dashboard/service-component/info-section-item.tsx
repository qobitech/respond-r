import { getStatus } from './helpers'

export const InfoSectionItem = ({
  label,
  value,
  values,
  status,
  icon,
  iconPosition
}: {
  label: string
  value: string | undefined
  values?: Array<string | undefined>
  status?: boolean
  icon?: JSX.Element
  iconPosition?: 'left' | 'right'
}) => {
  const isStatus = typeof status !== 'undefined'
  return (
    <div className="vehicle-info-section-item">
      <p className="vehicle-info-label">{label}</p>
      <div className="vehicle-row-item">
        {!values?.length ? (
          <div className="d-flex align-items-center gap-10">
            {iconPosition === 'left' ? icon : null}
            <p
              className={`vehicle-info-value overflow ${
                label.includes('Reg') ? 'reg-number' : ''
              } ${isStatus ? 'status-text' : ''}`}
            >
              {value || '...'}
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            {values.map((i, index) => (
              <div
                key={index}
                style={{ display: 'flex', alignItems: 'center', gap: '15px' }}
              >
                <p
                  className={`vehicle-info-value overflow ${
                    label.includes('Reg') ? 'reg-number' : ''
                  } ${isStatus ? 'status-text' : ''}`}
                >
                  {i || '...'}
                </p>
                {index !== values.length - 1 ? (
                  <div className="lf-text-separator" />
                ) : null}
              </div>
            ))}
            {iconPosition !== 'left' ? icon : null}
          </div>
        )}
        {isStatus ? (
          <p className={`p-btn-status no-btn ${status ? 'success' : 'danger'}`}>
            {getStatus(status || false)}
          </p>
        ) : null}
      </div>
    </div>
  )
}
