import { baseurlReport, isBaseURL } from 'utils/constants'
import * as utils from '../../services/new/utils'
import { report } from 'store/types'

export const getAllReports = (
  organization: string,
  query?: string,
  onSuccess?: (res: any) => void,
  onFailure?: (err: any) => void
) => {
  return utils.httpGetMethod({
    apiData: {
      url: '',
      customurl: `${baseurlReport}${organization}/get-all-paged${query || ''}`,
      header: utils.header('')
    },
    actionType: report.getAllReports,
    onSuccess,
    onFailure
  })
}

export interface IURS {
  assignedBy: {
    id: number
    userName: string
  }
  emergency: {
    emergencyType: string
    emergencyId: string
  }
  status: string
}

export const updateReportStatus = (
  data: IURS,
  onSuccess?: (res: any) => void,
  onFailure?: (err: any) => void
) => {
  return utils.httpPostMethod({
    apiData: {
      url: '',
      customurl: `${
        isBaseURL('commandURL') + '/api/v1/'
      }AllocationManager/update-event-status`,
      header: utils.header(''),
      data
    },
    actionType: report.updateReportStatus,
    onSuccess,
    onFailure
  })
}
