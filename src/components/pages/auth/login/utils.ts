import { IFormComponent } from 'utils/form-builder'

export const loginFC: IFormComponent[] = [
  {
    id: 'email',
    label: 'Email',
    placeHolder: 'Enter your email address',
    type: 'text',
    component: 'input'
  },
  {
    id: 'password',
    label: 'Password',
    placeHolder: 'Enter your password',
    type: 'password',
    component: 'input'
  }
]
