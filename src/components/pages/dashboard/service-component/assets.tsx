import { useGlobalContext } from 'context/hooks'
import { useState } from 'react'
import { TypeInput } from 'utils/input'
import { ILocation } from 'utils/map'
import LocationAssets from '../asset/location-assets'

export const Assets = ({ location }: { location: ILocation }) => {
  const { state } = useGlobalContext()

  const allAssets = state?.asset?.getAllAssets?.data || []
  const [radius, setRadius] = useState<number>(0)

  return (
    <div>
      <TypeInput
        type="range"
        onChange={({ target }) => {
          const { value } = target
          setRadius(parseInt(value))
        }}
        min={1}
        max={2000}
        value={radius}
      />
      <LocationAssets
        allAssets={allAssets}
        location={location}
        radius={radius}
      />
    </div>
  )
}
