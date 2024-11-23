import { IAction } from 'interfaces/IAction'
import { IStates } from 'interfaces/IReducer'
import { useEffect, useState } from 'react'

import 'utils/page.scss'
import { organizationTypes } from 'store/types'
import { IOrganization } from 'interfaces/IOrganization'
import { IRightSection } from 'utils/right-section/utils'
import FormBuilder from 'utils/form-builder'
import { useFormHook } from 'utils/hook'
import { TypeButton } from 'utils/button'
import TextPrompt from 'utils/text-prompt'
import { createOrgSchema, formComponent, ICreateOrg } from './utils'

const CreateOrganization = ({
  states,
  actions,
  rsProps
}: {
  states: IStates
  actions: IAction
  rsProps?: IRightSection<IOrganization>
}) => {
  const isUpdate = rsProps?.isView('custom', 'update-org')
  const [hookForm] = useFormHook<ICreateOrg>(createOrgSchema)
  const [response, setResponse] = useState<{
    message: string
    isSuccessful: boolean
  } | null>(null)

  useEffect(() => {
    if (isUpdate) {
      hookForm.setValue('name', rsProps?.data?.name || '')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdate])

  const handleUser = (data: ICreateOrg) => {
    actions.clearAction(organizationTypes.createOrganization)
    setResponse(null)
    actions.createOrganization(
      data,
      isUpdate,
      (res) => {
        setResponse({
          message: states?.organization?.createOrganization?.message || '',
          isSuccessful: states?.organization?.createOrganization?.isSuccessful!
        })
        console.log(res)
      },
      (err) => {
        console.log(err)
        setResponse({ message: 'Something went wrong', isSuccessful: false })
      }
    )
  }
  return (
    <div className="card-section px-4 py-4">
      <FormBuilder formComponent={formComponent} hookForm={hookForm} />
      <TypeButton
        title={isUpdate ? 'Update' : 'Create'}
        onClick={hookForm.handleSubmit(handleUser)}
        load={states.organization.createOrganizationLoading}
      />
      <div className="my-3" />
      {response ? (
        <TextPrompt
          prompt={response?.message || ''}
          status={response?.isSuccessful}
        />
      ) : null}
    </div>
  )
}

export default CreateOrganization
