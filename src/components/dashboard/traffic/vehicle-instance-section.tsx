import { FC } from 'react'
import { ITableRecord, IVIS } from './utils'
import { TableSection } from './table-section'

export const VehicleInstanceSection: FC<IVIS> = ({ vehicleData }) => {
  const tableData = vehicleData?.instances?.map((i, index) => ({
    id: index + '',
    row: [
      {
        value: i.camera,
        isLink: false,
        url: '',
        action: () => {}
      },
      {
        value: new Date(i.createdAt).toDateString(),
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
        action: () => {},
        buttonType: 'bold'
      }
    ]
  })) as ITableRecord[]

  return (
    <div className="table-container-section">
      <TableSection header={['Camera', 'Date', 'Action']} record={tableData} />
    </div>
  )
}
