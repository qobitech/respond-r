import { IVehicleOffense } from 'interfaces/IVehicle'
import { TypeButton } from 'utils/new/button'
import { VehicleInfoSectionItem } from './vehicle-info-section-item'

export const VehicleOffenseItem = ({
  vehicleOffense,
  handlePrev
}: {
  vehicleOffense: IVehicleOffense | null
  handlePrev: () => void
}) => {
  return (
    <div>
      <div className="vehicle-cta-back">
        <TypeButton buttonSize="small" title="Go back" onClick={handlePrev} />
      </div>
      <div className="vehicle-info-section">
        <VehicleInfoSectionItem
          label="Title"
          value={vehicleOffense?.offense?.name}
        />
        <VehicleInfoSectionItem
          label="Description"
          value={vehicleOffense?.offense?.description}
        />
        <VehicleInfoSectionItem
          label="Fine"
          value={vehicleOffense?.offense?.fineAmount?.toLocaleString()}
        />
        <VehicleInfoSectionItem
          label="Point"
          value={vehicleOffense?.offense?.finePoint?.toString()}
        />
        <VehicleInfoSectionItem
          label="Code"
          value={vehicleOffense?.offense?.code}
        />
        <VehicleInfoSectionItem
          label="Additional"
          value={vehicleOffense?.offense?.additional ?? 'None'}
        />
        <VehicleInfoSectionItem
          label="Status"
          value={vehicleOffense?.status?.name ?? '...'}
        />
        <VehicleInfoSectionItem
          label="Device"
          value={vehicleOffense?.devise?.name ?? ''}
        />
        <VehicleInfoSectionItem
          label="Longitude"
          value={vehicleOffense?.longitude ?? '0'}
        />
        <VehicleInfoSectionItem
          label="Latitude"
          value={vehicleOffense?.latitude ?? '0'}
        />
        <VehicleInfoSectionItem
          label="Address"
          value={vehicleOffense?.address ?? ''}
        />
        <VehicleInfoSectionItem
          label="User"
          value={vehicleOffense?.user?.userName ?? ''}
        />
      </div>
    </div>
  )
}
