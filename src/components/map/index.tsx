import React, { useMemo } from "react"
import {
  GoogleMap,
  useLoadScript,
  // MarkerF,
  // InfoWindow,
  Marker,
} from "@react-google-maps/api"
import "./index.scss"

export default function GoogleMaps({ lat, lng }: Coordinates) {
  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_API_KEY
  if (!googleMapsApiKey) {
    return <div>Error</div>
  }
  return <Map googleMapsApiKey={googleMapsApiKey} lat={lat} lng={lng} />
}

interface Coordinates {
  lat: number
  lng: number
}
interface MapProps extends Coordinates {
  googleMapsApiKey: string
}

const Map = ({ googleMapsApiKey, lat, lng }: MapProps) => {
  const center = useMemo(() => ({ lat, lng }), [lat, lng])

  // infers type from default value
  // const [selectedMarker, setSelectedMarker] = useState<Coordinates | null>(
  //   center
  // )

  const { isLoaded } = useLoadScript({
    googleMapsApiKey,
  })
  if (!isLoaded) return <div>Loading...</div>

  return (
    <>
      <div className="my-8 mx-20 md:my-10 border w-100 h-100">
        <GoogleMap
          zoom={17}
          center={center}
          mapContainerClassName="map-container"
        >
          {/* <MarkerF
            position={center}
            onClick={() => {
              setSelectedMarker(center)
            }}
          >
            {selectedMarker && (
              <InfoWindow
                onCloseClick={() => {
                  setSelectedMarker(null)
                }}
                position={center}
              >
                <a
                  href={`http://www.google.com/maps/place/${lat},${lng}`}
                  target="_blank"
                  aria-label="open link to directions to cool gym hwy 49"
                  className="underline hover:text-blue-750"
                  rel="noreferrer"
                >
                  Directions
                </a>
              </InfoWindow>
            )}
          </MarkerF> */}
          <Marker
            position={center as unknown as google.maps.LatLng}
            // onClick={() => {
            //   window.open(
            //     `http://www.google.com/maps/place/${lat},${lng}`,
            //     'blank'
            //   )
            // }}
          />
        </GoogleMap>
      </div>
    </>
  )
}
