import { ISSUPERADMIN } from 'app-constants'
import { GODUSER } from 'app-constants/roles'
import { IOrganization } from 'interfaces/IOrganization'
import { IFormComponent } from 'utils/form-builder'
import * as yup from 'yup'

export interface ICreateRole {
  name: string
  organisationId: number
}

export const createRoleSchema = {
  name: yup.string().required('input required'),
  organisationId: GODUSER
    ? yup.number().required('input required')
    : yup.number()
}

export const getFormComponent = (organizations: IOrganization[]) =>
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
