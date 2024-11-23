import { IFormComponent } from 'utils/form-builder'
import * as yup from 'yup'

export interface ICAF {
  assetName: string
  type: string
  category: string
  latitude: number
  longitude: number
  city: string
  state: string
  country: string
  map: string
  words: string
  nearestPlace: string
  name: string
  phoneNumber: string
  role: string
}

export const icafSchema = {
  assetName: yup.string().required(),
  type: yup.string().required(),
  category: yup.string().required(),
  latitude: yup.string().required(),
  longitude: yup.string().required(),
  city: yup.string().required(),
  state: yup.string().required(),
  country: yup.string().required(),
  map: yup.string().required(),
  words: yup.string().required(),
  nearestPlace: yup.string().required(),
  name: yup.string().required(),
  phoneNumber: yup.string().required(),
  role: yup.string().required()
}

export const typeOptionsData = [
  {
    id: 1,
    label: 'Police Vehicle',
    value: 'police-vehicle'
  }
]

export const categoryOptionsData = [
  {
    id: 1,
    label: 'fixed',
    value: 'Fixed'
  }
]

export const formComponent: IFormComponent[] = [
  {
    id: 'assetName',
    label: 'Asset Name',
    component: 'input',
    type: 'text',
    placeHolder: ''
  },
  {
    id: 'type',
    label: 'Type',
    initOptions: { id: 1, label: 'Select Label', value: '' },
    optionData: typeOptionsData,
    component: 'select',
    placeHolder: '',
    type: 'text'
  },
  {
    id: 'category',
    label: 'Category',
    initOptions: { id: 1, label: 'Select Category', value: '' },
    optionData: categoryOptionsData,
    component: 'select',
    placeHolder: '',
    type: 'text'
  },
  {
    id: 'latitude',
    label: 'Latitude',
    component: 'input',
    type: 'text',
    placeHolder: 'Enter latitude'
  },
  {
    id: 'longitude',
    label: 'Longitude',
    component: 'input',
    type: 'text',
    placeHolder: 'Enter longitude'
  },
  {
    id: 'country',
    label: 'Country',
    initOptions: { id: 1, label: 'Select Country', value: '' },
    component: 'select',
    placeHolder: '',
    type: 'text'
  },
  {
    id: 'state',
    label: 'State',
    initOptions: { id: 1, label: 'Select State', value: '' },
    component: 'select',
    placeHolder: '',
    type: 'text'
  },
  {
    id: 'city',
    label: 'City',
    initOptions: { id: 1, label: 'Select City', value: '' },
    component: 'select',
    placeHolder: '',
    type: 'text'
  },
  {
    id: 'map',
    label: 'Map',
    component: 'input',
    type: 'text',
    placeHolder: 'Enter map'
  },
  {
    id: 'words',
    label: 'Words',
    component: 'input',
    type: 'text',
    placeHolder: 'Enter words'
  },
  {
    id: 'nearestPlace',
    label: 'Nearest Place',
    component: 'input',
    type: 'text',
    placeHolder: 'Enter nearest place'
  },
  {
    id: 'name',
    label: 'Contact Name',
    component: 'input',
    type: 'text',
    placeHolder: 'Enter contact name'
  },
  {
    id: 'phoneNumber',
    label: 'Contact Phone',
    component: 'phone',
    type: 'text',
    placeHolder: 'Enter contact phone'
  },
  {
    id: 'role',
    label: 'Contact Role',
    initOptions: { id: 1, label: 'Select Role', value: '' },
    component: 'select',
    placeHolder: '',
    type: 'text'
  }
]
