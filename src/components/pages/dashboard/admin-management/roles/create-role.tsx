import React, { useEffect, useState } from 'react'
import 'utils/page.scss'
import { IRole } from 'interfaces/IRole'
import { useGlobalContext } from 'context/hooks'
import FormBuilder from 'utils/form-builder'
import { useFormHook } from 'utils/hook'
import { TypeButton } from 'utils/button'
import TextPrompt from 'utils/text-prompt'
import { roleTypes } from 'store/types'
import { createRoleSchema, getFormComponent, ICreateRole } from './utils'

const CreateRole = () => {
  const { organizations, userOrganization, state, action, rsProps } =
    useGlobalContext()
  const formComponent = getFormComponent(organizations || [])
  const isUpdate = rsProps?.isView('custom', 'update-role')
  const [hookForm] = useFormHook<ICreateRole>(createRoleSchema)
  const [response, setResponse] = useState<{
    message: string
    isSuccessful: boolean
  } | null>(null)

  const data = rsProps.data as IRole

  useEffect(() => {
    if (isUpdate) {
      hookForm.setValue('name', data?.name || '')
      hookForm.setValue('organisationId', data?.organisationId || 0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdate])

  const handleUser = (data: ICreateRole) => {
    action.clearAction(roleTypes.createRole)
    setResponse(null)
    action.createRole(
      !isUpdate
        ? { ...data, organizationId: userOrganization?.id }
        : { oldName: data?.name || '', newName: data.name },
      isUpdate,
      () => {
        setResponse({
          message: 'role updated successfully',
          isSuccessful: true
        })
        action.getAllRoles('')
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
        title={isUpdate ? 'Update Role' : 'Add Role'}
        onClick={hookForm.handleSubmit(handleUser)}
        load={state.role.createRoleLoading}
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

export default CreateRole
