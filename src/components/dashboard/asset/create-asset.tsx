import { IAction } from "interfaces/IAction"
import { IStates } from "interfaces/IReducer"
import React from "react"
import { TypeButton } from "utils/new/button"
import { useFormHook } from "utils/new/hook"
import { TypeInput } from "utils/new/input"
import TypePhoneInput from "utils/new/phone-input"
import { TypeSelect } from "utils/new/select"
import * as yup from "yup"

interface ICAF {
  assetName: string
  icon: string
  type: string
  category: string
  latitude: number
  longitude: number
  name: string
  phoneNumber: string
  role: string
}

const icafSchema = {
  assetName: yup.string().required(),
  icon: yup.string().required(),
  type: yup.string().required(),
  category: yup.string().required(),
  latitude: yup.number().required(),
  longitude: yup.number().required(),
  name: yup.string().required(),
  phoneNumber: yup.string().required(),
  role: yup.string().required(),
}

const typeOptionsData = [
  {
    id: 1,
    label: "Police Vehicle",
    value: "police-vehicle",
  },
]
const categoryOptionsData = [
  {
    id: 1,
    label: "fixed",
    value: "Fixed",
  },
]
const roleOptionsData = [
  {
    id: 1,
    label: "",
    value: "",
  },
]

const CreateAsset = ({
  states,
  action,
}: {
  states?: IStates
  action?: IAction
}) => {
  const [hookForm] = useFormHook<ICAF>(icafSchema)

  const stateLoading = states?.asset.createAssetLoading

  const handleSubmit = (data: ICAF) => {
    const req = {
      name: data.assetName,
      type: data.type,
      category: data.category,
      location: {
        longitude: data.longitude,
        latitude: data.latitude,
      },
      contact: {
        name: data.name,
        phone: data.phoneNumber,
        role: data.role,
      },
      createdBy: {
        id: "",
        userName: "",
      },
    }
    action?.createAction(req, false, () => {})
  }

  return (
    <div className="form-body py-5 px-4">
      <form
        className="d-flex flex-column"
        style={{ gap: "10px" }}
        onSubmit={hookForm.handleSubmit(handleSubmit)}
      >
        <TypeInput
          placeholder="Enter name"
          {...hookForm.register("assetName")}
          label="Asset Name"
          error={hookForm.formState.errors.assetName?.message as string}
        />
        <TypeInput
          placeholder="Enter name"
          {...hookForm.register("icon")}
          label="Icon - png* jpg*"
          type="file"
          error={hookForm.formState.errors.icon?.message as string}
        />
        <TypeSelect
          initoption={{ label: "Select Type", value: "" }}
          optionsdata={typeOptionsData}
          {...hookForm.register("type")}
          label="Type"
          error={hookForm.formState.errors.type?.message as string}
        />
        <TypeSelect
          initoption={{ label: "Select Category", value: "" }}
          optionsdata={categoryOptionsData}
          {...hookForm.register("category")}
          label="Category"
          error={hookForm.formState.errors.category?.message as string}
        />
        <TypeInput
          placeholder="Latitude"
          {...hookForm.register("latitude")}
          label="Latitude"
          error={hookForm.formState.errors.latitude?.message as string}
        />
        <TypeInput
          placeholder="Longitude"
          {...hookForm.register("longitude")}
          label="Longitude"
          error={hookForm.formState.errors.longitude?.message as string}
        />
        <TypeInput
          placeholder="Enter contact name"
          {...hookForm.register("name")}
          label="Contact Name"
          error={hookForm.formState.errors.name?.message as string}
        />
        <TypePhoneInput
          {...hookForm.register("phoneNumber")}
          label="Contact phone number"
          placeholder="Enter contact phone number"
          handleOnChange={(phone) => {
            hookForm.setValue("phoneNumber", phone)
          }}
          error={hookForm.formState.errors.phoneNumber?.message as string}
          value={hookForm.watch("phoneNumber")}
        />
        <TypeSelect
          initoption={{ label: "Select Contact Role", value: "" }}
          optionsdata={roleOptionsData}
          {...hookForm.register("role")}
          label="Contact role"
          error={hookForm.formState.errors.role?.message as string}
        />
        <TypeButton
          title="Create Asset"
          type="submit"
          load={stateLoading}
          buttonSize="small"
        />
      </form>
    </div>
  )
}

export default CreateAsset
