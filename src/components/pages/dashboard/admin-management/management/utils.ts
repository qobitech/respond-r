import { GODUSER } from 'app-constants/roles'
import { IAction } from 'interfaces/IAction'
import { IStates } from 'interfaces/IReducer'
import { IFormComponent } from 'utils/form-builder'
import * as yup from 'yup'

export interface ICreateAdmin {
  email: string
  organisationId: string
  userName: string
  phoneNumber: string
  password: string
  confirmPassword: string
  role: string[]
}

export const createAdminSchema = (update: boolean) => ({
  email: yup.string().required('input required'),
  organisationId: yup.string().required('input required'),
  userName: yup.string().required('input required'),
  phoneNumber: yup.string().required('input required'),
  password: update ? yup.string() : yup.string().required('input required'),
  confirmPassword: update
    ? yup.string()
    : yup
        .string()
        .required('input required')
        .oneOf([yup.ref('password'), null], 'Passwords must match')
})

export const getFormComponent = (
  states?: IStates,
  actions?: IAction
): IFormComponent[] => {
  const allRoles = states?.logged.getLoggedRoles?.data
  const organizations = states?.organization.getAllOrganization?.data

  return [
    {
      id: 'email',
      label: 'Email',
      placeHolder: 'Enter your email address',
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
      optionData: organizations?.map((i, index) => ({
        id: index + 1,
        label: i.name,
        value: i.id
      })),
      onChange: (value: string) => {
        actions?.getRolesForOrganisation?.(value)
      }
    },
    {
      id: 'role',
      label: 'Role',
      placeHolder: '',
      type: 'text',
      component: 'select',
      initOptions: { id: 2, label: 'Select Role', value: '' },
      optionData: allRoles?.map((i, index) => ({
        id: index + 1,
        label: i.name,
        value: i.id
      }))
    },
    {
      id: 'userName',
      label: 'User Name',
      placeHolder: 'Enter your user name',
      type: 'text',
      component: 'input'
    },
    {
      id: 'phoneNumber',
      label: 'Phone Number',
      placeHolder: 'Enter your phone number',
      type: 'phone',
      component: 'phone'
    },
    {
      id: 'password',
      label: 'Password',
      placeHolder: 'Enter your password',
      type: 'password',
      component: 'input'
    },
    {
      id: 'confirmPassword',
      label: 'Confirm Password',
      placeHolder: 'Re-enter your password',
      type: 'password',
      component: 'input'
    }
  ].filter((i) => (GODUSER ? i : i.id !== 'organisationId')) as IFormComponent[]
}
