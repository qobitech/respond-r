import { IAction } from "interfaces/IAction"
import { IStates } from "interfaces/IReducer"
import React, { useEffect, useState } from "react"
import { TypeButton } from "utils/new/button"
import { TypeInput } from "utils/new/input"
import "./style.scss"
import { PulseSVG } from "utils/new/svgs"
import { ActionComponent } from "../components"
import { clearAction } from "store/actions/global"
import { assets } from "../../../store/types"

const LinkAsset = ({
  assetId,
  actions,
  state,
}: {
  assetId: string | null
  actions?: IAction
  state?: IStates
}) => {
  const [formValue, setFormValue] = useState<string | null>(null)

  const getAssetByIdLoading = state?.asset.getAssetByIdLoading
  const getAssetById = state?.asset.getAssetById.data

  useEffect(() => {
    if (assetId !== null) {
      if (assetId !== formValue) {
        actions?.getAssetById(assetId)
        setFormValue(assetId)
      }
    }
    return () => {
      clearAction(assets.getAssetById)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assetId])

  const assetProps = [
    {
      label: "Asset name",
      value: getAssetById?.name,
    },
    { label: "Type", value: getAssetById?.type },
    { label: "Short code", value: getAssetById?.shortCode },
    { label: "Category", value: getAssetById?.category },
    { label: "Longitude", value: getAssetById?.location.longitude },
    { label: "Latitude", value: getAssetById?.location.latitude },
    { label: "Contact Name", value: getAssetById?.contact.name },
    { label: "Contact Phone", value: getAssetById?.contact.phone },
    { label: "Contact Role", value: getAssetById?.contact.role },
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
          value={formValue || ""}
          onChange={({ target }) => {
            const { value } = target
            setFormValue(value)
          }}
        />
        <TypeButton
          title="Search Asset"
          load={getAssetByIdLoading}
          onClick={() => actions?.getAssetById(assetId!)}
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
                { label: "Link asset" },
                { label: "Action 2" },
                { label: "Action 3" },
              ]}
            />
          </div>
          <div className="link-assets-information form-body px-4 pt-4">
            {assetProps.map((asset) => (
              <TypeInput
                readOnly
                value={asset.value || "no info"}
                label={asset.label}
                isonlyview
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
