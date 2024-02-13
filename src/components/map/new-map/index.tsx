import { ReactNode } from "react"
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet"
import L, { LatLngTuple } from "leaflet"
import "./index.scss"
import "leaflet/dist/leaflet.css"
import React from "react"

const ResizeMap = () => {
  const map = useMap()
  map.getCenter()
  return null
}

interface ILocation {
  latitude: number
  longitude: number
}

export type LocationContent = {
  location: ILocation | undefined
  markerContent: ReactNode
  markerColor?: string
}

interface MapChartProps {
  locationContents: LocationContent[]
  style?: React.CSSProperties
  defaultZoom?: number
}

const getLatLngFromLocation = (location: ILocation | undefined) => {
  if (!location) return [0, 0] as LatLngTuple
  return [Number(location.latitude), Number(location.longitude)] as LatLngTuple
}

export const MapChart = ({
  locationContents,
  style,
  defaultZoom,
}: MapChartProps) => {
  if (!locationContents || !locationContents.length) return null
  const centerLocation = getLatLngFromLocation(locationContents[0].location)

  const icon = (color: string) =>
    L.icon({
      iconUrl: `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    })

  return (
    <div
      data-testid="map_container"
      className="map_container_wrapper"
      style={style}
    >
      <MapContainer
        className="map_container"
        center={centerLocation}
        zoom={defaultZoom || 7}
        scrollWheelZoom={false}
      >
        <ResizeMap />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locationContents.map((lC, index) => {
          return (
            <Marker
              icon={icon(lC.markerColor || "black")}
              position={getLatLngFromLocation(lC.location)}
              key={`${lC.location?.latitude}-${index}`}
            >
              <Popup>{lC.markerContent}</Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </div>
  )
}
