import { getBaseUrl, isBaseURL } from 'app-constants'
import { useEffect } from 'react'
import { TypeButton } from 'utils/button'
import { useFormHook } from 'utils/hook'
import { TypeInput } from 'utils/input'
import * as yup from 'yup'

export const ENVForm = () => {
  const [commandhookForm] = useFormHook<{ commandURL: string }>({
    commandURL: yup.string().required('command url is required')
  })
  const [queryhookForm] = useFormHook<{ queryURL: string }>({
    queryURL: yup.string().required('query url is required')
  })

  const saveCommandURL = ({ commandURL }: { commandURL: string }) => {
    localStorage.setItem('commandURL', commandURL.trim())
  }

  const saveQueryURL = ({ queryURL }: { queryURL: string }) => {
    localStorage.setItem('queryURL', queryURL.trim())
  }

  useEffect(() => {
    if (isBaseURL('commandURL'))
      commandhookForm.setValue('commandURL', getBaseUrl('commandURL'))
    if (isBaseURL('queryURL'))
      queryhookForm.setValue('queryURL', getBaseUrl('queryURL'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function clearBaseUrl(arg0: string) {
    throw new Error('Function not implemented.')
  }

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <TypeInput
          placeholder="Enter url"
          label="Query URL"
          {...queryhookForm.register('queryURL')}
          error={queryhookForm.formState.errors.queryURL?.message}
        />
        <div className="d-flex align-items-center" style={{ gap: '20px' }}>
          <TypeButton
            title="Save"
            onClick={queryhookForm.handleSubmit(saveQueryURL)}
            buttonSize="small"
          />
          <TypeButton
            title="Clear"
            onClick={() => {
              queryhookForm.reset()
              clearBaseUrl('queryURL')
            }}
            buttonSize="small"
            buttonType="outlined"
          />
        </div>
      </form>
      <div className="my-5 separator" />
      <form onSubmit={(e) => e.preventDefault()}>
        <TypeInput
          placeholder="Enter url"
          label="Command URL"
          {...commandhookForm.register('commandURL')}
          error={commandhookForm.formState.errors.commandURL?.message}
        />
        <div className="d-flex align-items-center" style={{ gap: '20px' }}>
          <TypeButton
            title="Save"
            onClick={commandhookForm.handleSubmit(saveCommandURL)}
            buttonSize="small"
          />
          <TypeButton
            title="Clear"
            onClick={() => {
              commandhookForm.reset()
              clearBaseUrl('commandURL')
            }}
            buttonSize="small"
            buttonType="outlined"
          />
        </div>
      </form>
    </>
  )
}
