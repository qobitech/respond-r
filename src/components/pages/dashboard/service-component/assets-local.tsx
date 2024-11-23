import { IAssets } from 'interfaces/IAsset'
import { IATE } from 'store/actions/admin-actions/assets'
import { ILocation } from 'utils/map'
import { statusType } from '../asset/location-assets'
import { IReport } from 'interfaces/IReport'
import { useState } from 'react'
import { TypeInput } from 'utils/input'
import { LocationLocalAssets } from '../asset/location-local-assets'

export const AssetsLocal = ({
  location,
  assets,
  assignAssets,
  feed
}: {
  location: ILocation
  assets: IAssets
  assignAssets: (
    data: IATE,
    callBack: (status: statusType, id: string) => void
  ) => void
  feed: IReport
}) => {
  const [radius, setRadius] = useState<number>(0)

  return (
    <div>
      <TypeInput
        type="range"
        onChange={({ target }) => {
          const { value } = target
          setRadius(parseInt(value))
        }}
        min={0}
        max={2000}
        value={radius}
      />
      <LocationLocalAssets
        location={location}
        radius={radius}
        assets={assets}
        assignAssets={assignAssets}
        feed={feed}
      />
    </div>
  )
}
