import { FC } from 'react'
import { IVIS } from './utils'
import { VehicleInfoSectionItem } from './vehicle-info-section-item'

export const VehicleOwnerInfoSection: FC<IVIS> = ({ vehicleData }) => {
  return (
    <div className="vehicle-info-section">
      <VehicleInfoSectionItem
        label="Full Name"
        value={vehicleData?.currentOwner?.fullName}
      />
      <VehicleInfoSectionItem
        label="Address"
        value={vehicleData?.currentOwner?.address}
      />
      <VehicleInfoSectionItem
        label="Email"
        value={vehicleData?.currentOwner?.email}
      />
      <VehicleInfoSectionItem
        label="Phone"
        value={vehicleData?.currentOwner?.phone}
      />
    </div>
  )
}
