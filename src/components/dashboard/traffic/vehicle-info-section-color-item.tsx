export const VehicleInfoSectionColorItem = ({
  label,
  value
}: {
  label: string
  value: string | undefined
}) => {
  return (
    <div className="vehicle-info-section-item">
      <p className="vehicle-info-label">{label}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div
          className={`vehicle-info-color ${value === 'white' ? 'border' : ''}`}
          title={value}
          style={{ background: value }}
        />
        <p className={`vehicle-info-value`}>{value}</p>
      </div>
    </div>
  )
}
