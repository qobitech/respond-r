import { IAction } from 'interfaces/IAction'
import { IStates } from 'interfaces/IReducer'
import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import 'utils/page.scss'
import { actionTypes } from 'store/types'
import { IRoleAction } from 'interfaces/IRoleActions'
import { PAGENUMBER, PAGESIZE, getQuery } from '.'
import { IRightSection } from 'components/reusable/right-section/utils'
import FormBuilder, { IFormComponent } from 'utils/form-builder'
import { useFormHook } from 'utils/hook'
import { TypeButton } from 'utils/button'
import TextPrompt from 'utils/text-prompt'

interface ICreateAction {
  name: string
}

const createActionSchema = {
  name: yup.string().required('input required')
}

const formComponent: IFormComponent[] = [
  {
    id: 'name',
    label: 'Title',
    placeHolder: 'Enter title',
    type: 'text',
    component: 'input'
  }
]

const CreateAction = ({
  states,
  actions,
  rsProps
}: {
  states: IStates
  actions: IAction
  rsProps?: IRightSection<IRoleAction>
}) => {
  const isUpdate = rsProps?.isView('custom', 'update-action')
  const [hookForm] = useFormHook<ICreateAction>(createActionSchema)
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

  const handleUser = (data: ICreateAction) => {
    actions.clearAction(actionTypes.createAction)
    setResponse(null)
    actions.createAction(
      !isUpdate ? data : { ...data, id: rsProps?.data?.id },
      isUpdate,
      (res) => {
        setResponse({
          message: `${data.name} action ${!isUpdate ? 'created' : 'updated'}`,
          isSuccessful: true
        })
        actions.getAllAction(getQuery(`${PAGESIZE}&${PAGENUMBER}`))
        hookForm.setValue('name', '')
      },
      () => {
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
        load={states.actions.createActionLoading}
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

export default CreateAction
