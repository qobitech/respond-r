import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import 'utils/page.scss'
import { IRole } from 'interfaces/IRole'
import { IOrganization } from 'interfaces/IOrganization'
import { useGlobalContext } from 'context/hooks'
import { GODUSER } from 'app-constants/roles'
import { ISSUPERADMIN } from 'app-constants'
import FormBuilder, { IFormComponent } from 'utils/form-builder'
import { useFormHook } from 'utils/hook'
import { TypeButton } from 'utils/button'
import TextPrompt from 'utils/text-prompt'
import { roleTypes } from 'store/types'

interface ICreateRole {
  name: string
  organisationId: number
}

const createRoleSchema = {
  name: yup.string().required('input required'),
  organisationId: GODUSER
    ? yup.number().required('input required')
    : yup.number()
}

const getFormComponent = (organizations: IOrganization[]) =>
  [
    {
      id: 'name',
      label: 'Title',
      placeHolder: 'Enter role title',
      type: 'text',
      component: 'input'
    },
    {
      id: 'organisationId',
      label: 'Organization',
      placeHolder: '',
      type: 'text',
      component: 'select',
      initOptions: { id: 2, label: 'Select Organziation', value: '' },
      optionData: organizations.map((i, index) => ({
        id: index + 1,
        label: i.name,
        value: i.id
      }))
    }
  ].filter((i) =>
    GODUSER ? i : ISSUPERADMIN ? i.id === 'name' : false
  ) as IFormComponent[]

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
