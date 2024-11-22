import { IVehicleNote } from 'interfaces/IVehicle'
import { NoteSVG } from 'utils/new/svgs'
import { tabEnum } from './utils'

export const CarNotes = ({
  notes,
  setTab,
  isViewAll,
  title
}: {
  notes: IVehicleNote[] | undefined | null
  setTab: React.Dispatch<React.SetStateAction<string>>
  isViewAll: boolean
  title: string
}) => {
  if (!notes?.[0])
    return (
      // <div className="no-flags">
      //   <NoteSVG color="#f56e9d" />
      //   <p>No Notes</p>
      // </div>
      <></>
    )

  return (
    <div className="vehicle-car-flags-container">
      <div className="no-flags">
        <NoteSVG color="#f56e9d" />
        <p>{title}</p>
        {isViewAll ? (
          <p className="view-all-notes" onClick={() => setTab(tabEnum.NOTES)}>
            View all
          </p>
        ) : null}
      </div>
      {notes?.map((i, index) => (
        <div className="vehicle-car-notes" key={index}>
          <p className="author">
            {i.createdBy.userName}&nbsp;&nbsp;&nbsp;
            <span className="date-authored">
              {new Date(i.createdAt).toDateString()}
            </span>
          </p>
          <p>{i.message}</p>
        </div>
      ))}
    </div>
  )
}
