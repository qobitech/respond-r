import { IFormComponent } from 'utils/form-builder'
import * as yup from 'yup'

export interface ICreateAction {
  name: string
}

export const createActionSchema = {
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

export const PAGESIZE = `pageSize=10`

export const PAGENUMBER = `pageNumber=1`
