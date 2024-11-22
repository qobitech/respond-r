import { FC, useState } from 'react'
import { ITableRecord, IVIS } from './utils'
import { IVehicleOffense } from 'interfaces/IVehicle'
import { VehicleOffenseItem } from './vehicle-offense-item'
import { TableSection } from './table-section'

export const VehicleOffensesSection: FC<IVIS> = ({ vehicleData }) => {
  const [vehicleOffenseItem, setVehicleOffenseItem] =
    useState<IVehicleOffense | null>(null)

  const tableData = vehicleData?.vehicleOffenses?.map((i, index) => ({
    id: index + '',
    row: [
      {
        value: i.offense.name,
        isLink: false,
        url: '',
        action: () => {
          setVehicleOffenseItem(i)
        }
      },
      {
        value: new Date(i.createdAt).toDateString(),
        isLink: false,
        url: '',
        action: () => {}
      },
      {
        value: i.offense.fineAmount,
        isLink: false,
        url: '',
        action: () => {}
      },
      {
        value: i.offense.code,
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
          setVehicleOffenseItem(i)
        },
        buttonType: 'bold'
      }
    ]
  })) as ITableRecord[]

  const handlePrev = () => {
    setVehicleOffenseItem(null)
  }

  return (
    <div className="table-container-section">
      {vehicleOffenseItem ? (
        <VehicleOffenseItem
          vehicleOffense={vehicleOffenseItem}
          handlePrev={handlePrev}
        />
      ) : (
        <TableSection
          header={['Title', 'Date', 'Fine', 'Code', 'Action']}
          record={tableData}
        />
      )}
    </div>
  )
}
