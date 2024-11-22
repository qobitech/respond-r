import { FC, useState } from 'react'
import { ITableRecord, IVIS } from './utils'
import { ISOTDetails } from 'interfaces/IVehicle'
import { VehicleSOTItem } from './vehicle-sot-item'
import { TableSection } from './table-section'

export const VehicleSOTSection: FC<IVIS> = ({ vehicleData }) => {
  const [vehicleSOTItem, setVehicleSOTItem] = useState<ISOTDetails | null>(null)

  const tableData = vehicleData?.sotDetails?.map((i, index) => ({
    id: index + '',
    row: [
      {
        value: i.owner.fullName,
        isLink: false,
        url: '',
        action: () => {}
      },
      {
        value: i.regNumber,
        isLink: false,
        url: '',
        action: () => {}
      },
      {
        value: i.make,
        isLink: false,
        url: '',
        action: () => {}
      },
      {
        value: i.model,
        isLink: false,
        url: '',
        action: () => {}
      }
    ],
    rowActions: [
      {
        value: 'View',
        isLink: true,
        url: '',
        action: () => {
          setVehicleSOTItem(i)
        },
        buttonType: 'bold'
      }
    ]
  })) as ITableRecord[]

  const handlePrev = () => {
    setVehicleSOTItem(null)
  }

  return (
    <div className="table-container-section">
      {vehicleSOTItem ? (
        <VehicleSOTItem sot={vehicleSOTItem} handlePrev={handlePrev} />
      ) : (
        <TableSection
          header={['Owner', 'Reg Number', 'Make', 'Model', 'Action']}
          record={tableData}
        />
      )}
    </div>
  )
}
