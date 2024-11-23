import { useEffect, useState } from 'react'
import './style.scss'
import { ActionComponent } from '../components'
import { clearAction } from 'store/actions/global'
import { IReport } from 'interfaces/IReport'
import { IRightSection } from 'components/reusable/right-section/utils'
import { useGlobalContext } from 'context/hooks'
import { TypeInput } from 'utils/input'
import { TypeButton } from 'utils/button'
import { PulseSVG } from 'utils/svgs'
import { assetsTypes } from 'store/types'

const LinkAsset = ({
  assetId,
  rsProps
}: {
  assetId: string | null
  rsProps?: IRightSection<IReport>
}) => {
  const { action, state } = useGlobalContext()
  const [formValue, setFormValue] = useState<string | null>(null)

  const getAssetByIdLoading = state?.asset?.getAssetByIdLoading
  const getAssetById = state?.asset?.getAssetById?.data

  useEffect(() => {
    if (assetId !== null) {
      if (assetId !== formValue) {
        action?.getAssetById(assetId)
        setFormValue(assetId)
      }
    }
    return () => {
      clearAction(assetsTypes.getAssetById)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assetId])

  const assetProps = [
    {
      label: 'Asset name',
      value: getAssetById?.name
    },
    { label: 'Type', value: getAssetById?.type },
    { label: 'Short code', value: getAssetById?.shortCode },
    { label: 'Category', value: getAssetById?.category },
    { label: 'Longitude', value: getAssetById?.location.longitude },
    { label: 'Latitude', value: getAssetById?.location.latitude },
    { label: 'Contact Name', value: getAssetById?.contact.name },
    { label: 'Contact Phone', value: getAssetById?.contact.phone },
    { label: 'Contact Role', value: getAssetById?.contact.role }
  ]

  return (
    <div>
      <form
        className="w-100"
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <TypeInput
          label="Asset ID"
          type="search"
          placeholder="Search asset"
          value={formValue || ''}
          onChange={({ target }) => {
            const { value } = target
            setFormValue(value)
          }}
        />
        <TypeButton
          title="Search Asset"
          load={getAssetByIdLoading}
          onClick={() => action?.getAssetById(assetId)}
          buttonSize="small"
        />
      </form>
      <div className="separator my-4" />
      {!getAssetByIdLoading && getAssetById ? (
        <>
          <div className="d-flex align-items-center justify-content-between w-100">
            <p className="m-0 text-color text-medium">Asset Info</p>
            <ActionComponent
              title="Action"
              actions={[
                {
                  label: 'Update asset',
                  action: () => {
                    rsProps?.callSection('update', 'asset')
                  }
                }
                // { label: "Delete asset" },
              ]}
            />
          </div>
          <div className="link-assets-information form-body px-4 pt-4">
            {assetProps.map((asset, index) => (
              <TypeInput
                readOnly
                value={asset.value || 'no info'}
                label={asset.label}
                isonlyview
                key={index}
              />
            ))}
          </div>
        </>
      ) : (
        <div>
          {getAssetByIdLoading ? (
            <PulseSVG />
          ) : (
            <p className="text-color-label m-0 text-small">No data</p>
          )}
        </div>
      )}
    </div>
  )
}

export default LinkAsset
