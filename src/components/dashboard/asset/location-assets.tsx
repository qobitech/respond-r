import { ILocation } from "components/map/new-map"
import { IAsset } from "interfaces/IAsset"
import React, { useState, useEffect } from "react"
import { ITableRecord, TableSection } from "../traffic"
import "./style.scss"
import { TypeButton } from "utils/new/button"

const LocationAssets = ({
  allAssets,
  radius,
  location,
}: {
  location: ILocation
  allAssets: IAsset[]
  radius: number
}) => {
  const [nearbyAssets, setNearbyAssets] = useState<IAsset[]>([])
  const [selectedAsset, setSelectedAsset] = useState<IAsset | null>(null)

  useEffect(() => {
    // Calculate distance and filter nearby assets
    const filteredAssets = allAssets.filter((asset) => {
      const distance = calculateDistance(
        location.latitude,
        location.longitude,
        parseFloat(asset.location.latitude),
        parseFloat(asset.location.longitude)
      )
      return distance <= radius
    })

    setNearbyAssets(filteredAssets)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, allAssets, radius])

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371 // Radius of the Earth in kilometers
    const dLat = deg2rad(lat2 - lat1)
    const dLon = deg2rad(lon2 - lon1)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const d = R * c // Distance in kilometers
    return d
  }

  const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180)
  }

  const tableRecord: ITableRecord[] = nearbyAssets.map((asset) => ({
    id: asset.id,
    row: [
      {
        value: asset.type,
        isLink: true,
        action: () => {
          setSelectedAsset(asset)
        },
      },
      {
        value:
          calculateDistance(
            location.latitude,
            location.longitude,
            parseFloat(asset.location.latitude),
            parseFloat(asset.location.longitude)
          ).toFixed(2) + " km",
        isLink: false,
      },
      {
        value: asset.contact.name,
        isLink: false,
      },
    ],
    rowActions: [
      {
        value: "Link asset",
        isLink: false,
        buttonType: "outlined",
      },
    ],
  }))

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h2 className="text-little m-0 text-color" style={{ fontSize: "16px" }}>
          Assets within {radius} km from report location
        </h2>
        <p className="m-0">{nearbyAssets.length}</p>
      </div>

      {selectedAsset !== null ? (
        <div className="pb-2">
          <TypeButton
            buttonType="outlined"
            buttonSize="small"
            title="Back"
            onClick={() => setSelectedAsset(null)}
          />
        </div>
      ) : null}

      <div
        style={{ height: "250px", overflow: "auto" }}
        className="border-line rounded blats"
      >
        {!selectedAsset ? (
          <TableSection
            header={["Asset", "Distance (km)", "Contact", "Action"]}
            record={tableRecord}
            hideTableAction
          />
        ) : (
          <ViewAsset asset={selectedAsset} />
        )}
      </div>
    </div>
  )
}

const ViewAsset = ({ asset }: { asset: IAsset }) => {
  const ase: { [key: string]: any } = asset
  return (
    <div className="vehicle-info-section p-3">
      {Object.keys(ase).map((i, index) => (
        <div key={index}>
          {typeof ase[i] === "string" || typeof ase[i] === "number" ? (
            <AssetItem label={i} value={ase[i]} />
          ) : null}
        </div>
      ))}
    </div>
  )
}

const AssetItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <div>
      <p className="text-color-label">{label}</p>
      <p className="text-color">{value}</p>
    </div>
  )
}

export default LocationAssets
