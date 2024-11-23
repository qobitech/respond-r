import * as yup from 'yup'
import { IFormComponent } from 'utils/form-builder'

export interface ICreateOrg {
  name: string
  organisationId: number
}

export const createOrgSchema = {
  name: yup.string().required('input required')
}

export const formComponent: IFormComponent[] = [
  {
    id: 'name',
    label: 'Title',
    placeHolder: 'Enter title',
    type: 'text',
    component: 'input'
  }
]
