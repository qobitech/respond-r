import { IAction } from 'interfaces/IAction'
import { IStates } from 'interfaces/IReducer'
import { useEffect, useState } from 'react'
import { userTypes } from 'store/types'

import 'utils/page.scss'
import { IUser } from 'interfaces/IUser'
import { IRightSection } from 'utils/right-section/utils'
import { useGlobalContext } from 'context/hooks'
import FormBuilder from 'utils/form-builder'
import { GODUSER } from 'app-constants/roles'
import { useFormHook } from 'utils/hook'
import { TypeButton } from 'utils/button'
import TextPrompt from 'utils/text-prompt'
import { USERTOKEN } from 'app-constants'
import { createAdminSchema, getFormComponent, ICreateAdmin } from './utils'

const CreateAdmin = ({
  states,
  actions,
  rsProps
}: {
  states: IStates
  actions: IAction
  rsProps?: IRightSection<IUser>
}) => {
  const { getRole, getOrganization } = useGlobalContext()
  const isUpdate = rsProps?.isView('custom', 'update-admin')
  const [hookForm] = useFormHook<ICreateAdmin>(createAdminSchema(isUpdate))
  const [response, setResponse] = useState<{
    message: string
    isSuccessful: boolean
  } | null>(null)

  useEffect(() => {
    if (isUpdate) {
      hookForm.setValue('email', rsProps?.data?.email || '')
      hookForm.setValue(
        'organisationId',
        rsProps?.data?.organisation.id + '' || ''
      )
      hookForm.setValue('phoneNumber', '+' + rsProps?.data?.phoneNumber || '')
      hookForm.setValue('userName', rsProps?.data?.userName || '')
      hookForm.setValue('role', [
        rsProps?.data?.roleForReturn?.[0]?.id.toString() || ''
      ])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdate])

  const handleUser = (data: ICreateAdmin) => {
    setResponse(null)
    if (!isUpdate) {
      actions.clearAction(userTypes.createUser)
      actions.createUser(
        {
          ...data,
          role: data.role.map((i) => getRole?.(parseInt(i))?.name),
          organizationId: GODUSER
            ? data.organisationId
            : getOrganization?.('name', USERTOKEN.Organisation)?.id
        },
        () => {
          setResponse({
            message: 'User created successfully',
            isSuccessful: true
          })
          actions.getAllUsers('')
        },
        () => {
          setResponse({ message: 'Something went wrong', isSuccessful: false })
        }
      )
    } else {
      actions.clearAction(userTypes.updateUser)
    }
  }

  const formComponent = getFormComponent(states, actions)

  return (
    <div className="card-section px-4 py-4">
      <FormBuilder formComponent={formComponent} hookForm={hookForm} />
      <TypeButton
        title={isUpdate ? 'Update' : 'Create'}
        onClick={hookForm.handleSubmit(handleUser)}
        load={states.user.createUserLoading}
      />
      <div className="my-3" />
      {response !== null ? (
        <TextPrompt
          prompt={response?.message || ''}
          status={response?.isSuccessful}
        />
      ) : null}
    </div>
  )
}

export default CreateAdmin
