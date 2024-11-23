import { IUSIO } from './utils'
import * as yup from 'yup'
import { useEffect } from 'react'
import { getUrl, setUrl } from './helpers'
import { useFormHook } from 'utils/hook'
import { TypeInput } from 'utils/input'
import { TypeButton } from 'utils/button'

export const RTSPForm = ({ rtspProps }: { rtspProps: IUSIO }) => {
  const [hookForm] = useFormHook<{ rtspUrl: string }>({
    rtspUrl: yup.string().required('rstp url is required')
  })

  useEffect(() => {
    const rtspUrl = getUrl('rtspUrl')
    if (rtspUrl) {
      hookForm.setValue('rtspUrl', rtspUrl)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const btnTitle =
    rtspProps.streamStatus === 'started' && !!hookForm.watch('rtspUrl')
      ? 'Refresh RTSP Feed'
      : 'Request RTSP Feed'

  const handleRTSPFeed = (data: { rtspUrl: string }) => {
    if (hookForm.watch('rtspUrl')) {
      rtspProps.sendRTSPURL(data.rtspUrl)
      setUrl('rtspUrl', data.rtspUrl)
    }
  }

  const resetRTSPFeed = () => {
    rtspProps.stopRTSPFeed()
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <TypeInput
        placeholder="Enter url"
        label="RTSP URL"
        {...hookForm.register('rtspUrl')}
        error={hookForm.formState.errors.rtspUrl?.message}
      />
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <TypeButton
          title={btnTitle}
          onClick={hookForm.handleSubmit(handleRTSPFeed)}
          load={rtspProps.streamStatus === 'loading'}
        />
        <TypeButton
          title="Stop RTSP Feed"
          onClick={resetRTSPFeed}
          buttonType={rtspProps.streamStatus === null ? 'disabled' : 'outlined'}
        />
      </div>
    </form>
  )
}
