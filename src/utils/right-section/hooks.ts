import { ICallRightSection } from 'store/actions/global'
import {
  actionComponent,
  actionType,
  ICTA,
  IRightSection,
  IRSAction
} from './utils'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

export const useRightSection = <K extends {}>(
  rightSectionProps?: ICallRightSection,
  callRightSection?: (props: ICallRightSection) => (dispatch: any) => void,
  onClose?: () => void
): IRightSection<K> => {
  const [searchParams] = useSearchParams()
  const queryId = searchParams.get('id')
  const queryAction = searchParams.get('action') as actionType
  const queryComponent = searchParams.get('component') as actionComponent
  const navigate = useNavigate()
  const [title, setTitle] = useState<string>('')
  const [ctas, setCtas] = useState<ICTA[] | null>(null)
  const [openSection, setOpenSection] = useState<boolean>(() => !!queryId)
  const [action, setAction] = useState<IRSAction>({
    type: null,
    component: null,
    id: null
  })
  const [data, setData] = useState<K | null>(null)

  function updateData(data: K | null) {
    setData(data)
  }

  const getCTA = (
    action: actionType,
    component: actionComponent,
    id?: string
  ): ICTA[] | null => {
    switch (action) {
      case 'view':
        return [
          {
            title: 'Edit',
            action: () => {
              callSection('update', component, id)
            }
          },
          {
            title: 'Delete',
            action: () => {
              callSection('delete', component, id)
            },
            type: 'danger'
          }
        ]
      case 'update':
        return [
          {
            title: 'Delete',
            action: () => {
              callSection('delete', component, id)
            },
            type: 'danger'
          }
        ]
      default:
        return null
    }
  }

  const isView = (type: actionType, component: actionComponent) => {
    return action.type === type && action.component === component
  }

  function callSection<T>(
    action: actionType,
    component: actionComponent,
    id?: string,
    data?: T
  ) {
    setAction({ type: action, component, id })
    setTitle(
      `${
        action === 'custom' ? '' : action?.toUpperCase()
      } ${component?.toUpperCase()}`
    )
    setCtas(getCTA(action, component, id))
    setOpenSection(true)
    navigate(`?action=${action}&component=${component}${id ? '&id=' + id : ''}`)
    // if (data)
    setData(data as unknown as K)
  }

  function callSectionOnQuery(i?: K) {
    if (queryAction && queryComponent)
      callSection(queryAction, queryComponent, queryId ? queryId + '' : '', i)
  }

  const closeSection = () => {
    setOpenSection(false)
    navigate(`?`)
    callRightSection?.({ action: null, component: null })
    setAction({ type: null, component: null, id: null })
    onClose?.()
  }

  useEffect(() => {
    if (
      rightSectionProps &&
      rightSectionProps?.action !== null &&
      rightSectionProps?.component !== null
    ) {
      callSection(rightSectionProps.action, rightSectionProps.component)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rightSectionProps])

  return {
    closeSection,
    openSection,
    setAction,
    action,
    setTitle,
    title,
    setCtas,
    ctas,
    callSection,
    isView,
    data,
    queryId,
    queryAction,
    queryComponent,
    callSectionOnQuery,
    updateData
  }
}
