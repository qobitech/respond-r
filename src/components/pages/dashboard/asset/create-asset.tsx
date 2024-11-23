import { USERTOKEN } from 'app-constants'
import { useGlobalContext } from 'context/hooks'
import { TypeButton } from 'utils/button'
import FormBuilder from 'utils/form-builder'
import { useFormHook } from 'utils/hook'
import { formComponent, ICAF, icafSchema } from './utils'

const CreateAsset = () => {
  const { action, state } = useGlobalContext()
  const [hookForm] = useFormHook<ICAF>(icafSchema)

  const stateLoading = state?.asset.createAssetLoading

  const handleSubmit = (data: ICAF) => {
    const req = {
      name: data.assetName,
      type: data.type,
      category: data.category,
      location: {
        longitude: data.longitude,
        latitude: data.latitude
      },
      contact: {
        name: data.name,
        phone: data.phoneNumber,
        role: data.role
      },
      createdBy: {
        id: USERTOKEN.UserId,
        userName: USERTOKEN.Username
      }
    }
    action?.createAction(req, false, () => {})
  }

  return (
    <div className="form-body py-5 px-4">
      <form
        className="d-flex flex-column"
        style={{ gap: '10px' }}
        onSubmit={hookForm.handleSubmit(handleSubmit)}
      >
        <FormBuilder formComponent={formComponent} hookForm={hookForm} />
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
