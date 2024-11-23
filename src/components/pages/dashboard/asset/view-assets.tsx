import { IAsset } from 'interfaces/IAsset'
import { AssetItem } from './asset-item'

export const ViewAsset = ({ asset }: { asset: IAsset }) => {
  const ase: { [key: string]: any } = asset
  return (
    <div className="vehicle-info-section p-3">
      {Object.keys(ase)?.map((i, index) => (
        <div key={index}>
          {typeof ase[i] === 'string' || typeof ase[i] === 'number' ? (
            <AssetItem label={i} value={ase[i] as string} />
          ) : null}
        </div>
      ))}
    </div>
  )
}
