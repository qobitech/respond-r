import { FC } from 'react'
import { IVIS } from './utils'
import { VehicleInfoSectionItem } from './vehicle-info-section-item'
import { getDate } from './helpers'
import { VehicleInfoSectionColorItem } from './vehicle-info-section-color-item'

export const VehicleInfoSection: FC<IVIS> = ({ vehicleData }) => {
  const sot = vehicleData?.sotDetails?.[0]
  return (
    <div className="vehicle-info-section" style={{ marginTop: '40px' }}>
      <VehicleInfoSectionItem
        label="License"
        value={getDate(sot?.service?.license?.expiryDate || '')}
        status={sot?.service?.license?.isActive}
      />
      <VehicleInfoSectionItem
        label="Insurance"
        value={getDate(vehicleData?.vehicleInsurance?.expiryDate || '')}
        status={vehicleData?.vehicleInsurance?.isValid}
      />
      <VehicleInfoSectionItem
        label="Road Worthiness"
        value={getDate(sot?.service?.roadWorthiness?.expiryDate || '')}
        status={sot?.service?.roadWorthiness?.isActive}
      />
      <VehicleInfoSectionItem
        label="Vehicle Reg Number"
        value={vehicleData?.regNumber}
      />
      <VehicleInfoSectionItem label="Code" value={vehicleData?.code} />
      <VehicleInfoSectionItem label="Vehicle Type" value={vehicleData?.code} />
      <VehicleInfoSectionColorItem
        label="Vehicle Color"
        value={vehicleData?.color}
      />
      <VehicleInfoSectionItem label="Vehicle Make" value={vehicleData?.make} />
      <VehicleInfoSectionItem
        label="Vehicle Model"
        value={vehicleData?.model}
      />
    </div>
  )
}
