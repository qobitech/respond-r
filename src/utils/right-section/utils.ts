export type actionType =
  | 'create'
  | 'view'
  | 'update'
  | 'delete'
  | 'custom'
  | null
export type actionComponent =
  | 'settings'
  | 'create-admin'
  | 'view-admin'
  | 'update-admin'
  | 'delete-admin'
  | 'create-role'
  | 'update-role'
  | 'view-role'
  | 'view-role-actions'
  | 'assign-role'
  | 'create-org'
  | 'update-org'
  | 'view-org'
  | 'create-action'
  | 'update-action'
  | 'view-action'
  | 'delete-action'
  | 'asset'
  | 'link-asset'
  | 'report'
  | null
export type actionId = string | null

export interface IRSAction {
  type: actionType
  component: actionComponent
  id?: actionId
}

export interface IRightSection<K> {
  closeSection: () => void
  openSection: boolean
  setAction: React.Dispatch<React.SetStateAction<IRSAction>>
  action: IRSAction
  setTitle: React.Dispatch<React.SetStateAction<string>>
  title: string
  setCtas: React.Dispatch<React.SetStateAction<ICTA[] | null>>
  ctas: ICTA[] | null
  callSection: (
    action: actionType,
    component: actionComponent,
    id?: string,
    data?: K
  ) => void
  isView: (type: actionType, component: actionComponent) => boolean
  data: K | null
  queryId: string | null
  queryAction: actionType
  queryComponent: actionComponent
  callSectionOnQuery: (i?: K) => void
  updateData: (data: K | null) => void
}

export interface ICTA {
  title: string
  type?: 'bold' | 'outlined' | 'disabled' | 'danger'
  action?: () => void
}

export interface IRSection<T> {
  children?: any
  rsProps: IRightSection<T>
}
