import { useGlobalContext } from 'components/layout'
import { getStatus } from './helpers'
import { PasteSVG } from 'utils/new/svgs'

export const VehicleInfoSectionItem = ({
  label,
  value,
  status
}: // onClick,
{
  label: string
  value: string | undefined
  status?: boolean
  // onClick?: () => void
}) => {
  const { setSearch: setSearchValue } = useGlobalContext()
  const isStatus = typeof status !== 'undefined'
  const isReg = label.includes('Reg') && label.includes('Number')
  return (
    <div
      className="vehicle-info-section-item"
      onClick={() => {
        if (isReg) setSearchValue?.(value || '')
      }}
    >
      <p className="vehicle-info-label">{label}</p>
      <div className="vehicle-row-item">
        <div className="vehicle-reg-number-info">
          <p
            className={`vehicle-info-value overflow ${
              isReg ? 'reg-number' : ''
            } ${isStatus ? 'status-text' : ''}`}
          >
            {value || '...'}
          </p>
          {isReg ? <PasteSVG /> : null}
        </div>
        {isStatus ? (
          <p className={`p-btn-status no-btn ${status ? 'success' : 'danger'}`}>
            {getStatus(status || false)}
          </p>
        ) : null}
      </div>
    </div>
  )
}
