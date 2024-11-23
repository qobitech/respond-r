import { PulseSVG } from 'utils/svgs'
import { ILocationDetails } from './utils'
import { MapChart } from 'utils/map'

export const NoMediaComponent = ({
  load,
  locationDetails,
  defaultZoom
}: {
  load: boolean
  locationDetails: ILocationDetails[]
  defaultZoom?: number
}) => {
  const locationContent = locationDetails?.map((i) => ({
    location: i.location,
    markerContent: i.markerContent,
    iconUrl: i.iconUrl,
    iconSize: i.iconSize,

    // markerContent: (
    //   <a href={i.map} target="_blank" rel="noreferrer">
    //     <p className="d-flex">
    //       {i.nearestPlace}
    //       <span>
    //         <i
    //           className="fa fa-external-link ml-2"
    //           style={{ fontSize: "9px" }}
    //         />
    //       </span>
    //     </p>
    //   </a>
    // ),
    markerColor: i.markerColor
  }))

  return (
    <div className="no-video-selected-section">
      {load ? (
        <PulseSVG />
      ) : (
        <MapChart
          locationContents={locationContent}
          defaultZoom={defaultZoom}
        />
      )}
    </div>
  )
}
