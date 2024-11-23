import { IRightSection } from 'utils/right-section/utils'
import { IPHUS } from './utils'
import { chkType } from '../traffic/utils'
import { useFormHook } from 'utils/hook'
import * as yup from 'yup'
import { useEffect } from 'react'
import { isBaseURL } from 'app-constants'
import { getUrl, setUrl } from '../traffic/helpers'
import { TypeInput } from 'utils/input'
import { TypeButton } from 'utils/button'

export const FeedForm = <T extends {}>({
  signalR,
  rsProps,
  urlKey
}: {
  signalR: IPHUS<T>
  rsProps?: IRightSection<{}>
  urlKey: chkType
}) => {
  const [hookForm] = useFormHook<{ signalR: string }>({
    signalR: yup.string().required('connection url is required')
  })

  useEffect(() => {
    const commandURL = isBaseURL('commandURL')
      ? isBaseURL('commandURL') + '/notificationHub'
      : ''
    const rtspUrl = commandURL || getUrl(urlKey)
    if (rtspUrl) {
      hookForm.setValue('signalR', rtspUrl)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // useEffect(() => {
  //   if (signalR.connectionStatus === "connected") {
  //     rsProps?.closeSection()
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [signalR.connectionStatus])

  const btnTitle =
    signalR.connectionStatus === 'connected' && !!hookForm.watch('signalR')
      ? 'Refresh Feed'
      : 'Request Feed'

  const handleRTSPFeed = (data: { signalR: string }) => {
    signalR.startConnection(data.signalR)
    setUrl(urlKey, data.signalR)
  }

  const resetRTSPFeed = () => {
    signalR.stopConnection()
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <TypeInput
        placeholder="Enter url"
        label="Connection URL"
        {...hookForm.register('signalR')}
        error={hookForm.formState.errors.signalR?.message}
      />
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <TypeButton
          title={btnTitle}
          onClick={hookForm.handleSubmit(handleRTSPFeed)}
          load={signalR.connectionStatus === 'connecting'}
          buttonSize="small"
        />
        <TypeButton
          title="Stop Feed"
          onClick={resetRTSPFeed}
          buttonType={
            signalR.connectionStatus === null ? 'disabled' : 'outlined'
          }
          buttonSize="small"
        />
      </div>
    </form>
  )
}
