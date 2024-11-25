import { RESPONDR_CM_BASE_URL } from 'app-constants'
import * as utils from '../../services/new/utils'
import { organizationTypes } from 'store/types'

export const getAllOrganization = (query: string) => {
  return utils.httpGetMethod({
    apiData: {
      url: '',
      customurl: `${RESPONDR_CM_BASE_URL}/Organisation/${query || ''}`,
      header: utils.header('')
    },
    actionType: organizationTypes.getAllOrganization
  })
}

export const createOrganization = (
  data: object,
  update?: boolean,
  onSuccess?: (res: any) => void,
  onFailure?: (err: any) => void
) => {
  return utils.httpPostMethod({
    apiData: {
      url: '',
      customurl: `${RESPONDR_CM_BASE_URL}/Organisation/${
        update ? 'update' : 'add'
      }`,
      header: utils.header(''),
      data
    },
    actionType: update
      ? organizationTypes.updateOrganization
      : organizationTypes.createOrganization,
    onSuccess: (res) => {
      onSuccess?.(res)
    },
    onFailure: (err) => {
      onFailure?.(err)
    }
  })
}

export const deleteOrganization = (id: string) => {
  return utils.httpDeleteMethod({
    apiData: {
      url: '',
      customurl: `${RESPONDR_CM_BASE_URL}/Organisation/delete?id=${id}`,
      header: utils.header('')
    },
    actionType: organizationTypes.deleteOrganization
  })
}
