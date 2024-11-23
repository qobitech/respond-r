import { IFeedFormHK, IUS } from './utils'
import * as yup from 'yup'
import { useEffect } from 'react'
import { getUrl, setUrls } from './helpers'
import { useFormHook } from 'utils/hook'
import { TypeInput } from 'utils/input'
import { TypeButton } from 'utils/button'

export const FeedForm = ({ signalRProps }: { signalRProps: IUS }) => {
  const [hookForm] = useFormHook<IFeedFormHK>({
    connectionUrl: yup.string().required('connection url is required'),
    filePath: yup.string().required('file path is required')
  })

  useEffect(() => {
    const storedData = getUrl('connectionUrl')
    if (storedData) {
      hookForm.setValue('connectionUrl', storedData)
    }
    const filePath = getUrl('filePath')
    if (filePath) {
      hookForm.setValue('filePath', filePath)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const btnTitle =
    signalRProps.connectionStatus === 'connected' &&
    !!hookForm.watch().connectionUrl
      ? 'Refresh Feed'
      : 'Request Feed'

  const handleSubmit = (data: IFeedFormHK) => {
    signalRProps.startConnection(data.connectionUrl)
    setUrls(data)
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <TypeInput
        placeholder="Enter url"
        label="Connection URL"
        {...hookForm.register('connectionUrl')}
        error={hookForm.formState.errors.connectionUrl?.message}
      />
      <TypeInput
        placeholder="Enter url"
        label="File Path"
        {...hookForm.register('filePath')}
        error={hookForm.formState.errors.filePath?.message}
      />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          marginBottom: '30px'
        }}
      >
        <TypeButton
          title={btnTitle}
          onClick={hookForm.handleSubmit(handleSubmit)}
        />
      </div>
    </form>
  )
}
