import { baseurlEPoliceTest } from 'app-constants'
import * as utils from '../../services/new/utils'
import { demoActionTypes } from 'store/types'

export const getDemoEPoliceNotifications = () => {
  return utils.httpGetMethod({
    apiData: {
      url: '',
      customurl: `${baseurlEPoliceTest}/Police`,
      header: utils.header('')
    },
    actionType: demoActionTypes.getDemoEPoliceNotifications
  })
}
