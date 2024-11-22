import { FlagSVG } from 'utils/new/svgs'

export const CarFlags = ({ flags }: { flags: string[] }) => {
  if (!flags?.[0]) return <></>

  return (
    <div className="vehicle-car-flags-container">
      <div className="no-flags">
        <FlagSVG color="#f56e9d" />
        <p>Flags ({flags?.length})</p>
      </div>
      <div className="vehicle-car-flags">
        {flags.map((i, index) => (
          <div key={index} className="vehicle-car-flag-item">
            <p>{i}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
