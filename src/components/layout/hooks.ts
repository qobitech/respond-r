import { themeType } from 'context'
import { useEffect, useState } from 'react'
import {
  IUseGlobalStartConnection,
  IUseSelectedReport,
  IUseTheme
} from './utils'
import { IReport, IReports } from 'interfaces/IReport'
import { useNavigate } from 'react-router-dom'
import { useQueryValuesHook } from 'utils/hooks'
import { IStates } from 'interfaces/IReducer'
import { IAction } from 'interfaces/IAction'
import { INotification } from 'interfaces/IGlobal'
import { GODUSER } from 'app-constants/roles'
import { isLogged, USERTOKEN } from 'app-constants'
import { IOrganization } from 'interfaces/IOrganization'
import { IRole } from 'interfaces/IRole'

export const useTheme = (): IUseTheme => {
  const isBrowserDefaultDark = () =>
    window.matchMedia('(prefers-color-scheme: dark)').matches

  const getDefaultTheme = (): themeType => {
    const localStorageTheme = localStorage.getItem('theme')
    const browserDefault = isBrowserDefaultDark() ? 'dark' : 'light'
    return (localStorageTheme || browserDefault) as themeType
  }

  const [theme, setTheme] = useState<themeType>(getDefaultTheme())

  return {
    theme,
    setTheme
  }
}

export const useGlobalStartConnection = (): IUseGlobalStartConnection => {
  const [globalStartConnection, setGlobalStartConnection] = useState<{
    action: boolean
    url: string
  }>({ action: false, url: '' })

  const activateGlobalStartConnection = (url: string) => {
    setGlobalStartConnection(() => ({
      action: true,
      url
    }))
  }

  const disableGlobalStartConnection = () => {
    setGlobalStartConnection((prev) => ({
      action: false,
      url: ''
    }))
  }

  return {
    globalStartConnection,
    activateGlobalStartConnection,
    disableGlobalStartConnection
  }
}

export const useSelectedReport = ({
  organization,
  states,
  action
}: {
  organization: 'Fire' | 'Medical' | 'Police'
  states: IStates
  action: IAction
}): IUseSelectedReport => {
  const navigate = useNavigate()
  const { reportId } = useQueryValuesHook()

  const [selectedReport, setSelectedReport] = useState<IReport | null>(null)

  const handleSelectReport = (report: IReport | null) => {
    setSelectedReport?.(report)
    navigate(report ? `?reportId=${report?.id}` : `?`)
  }

  const setReportById = (data: IReports) => {
    const reports = data.data
    if (reports?.length) {
      if (reportId) {
        const reportById = reports?.filter(
          (report) => report.id === reportId
        )?.[0]
        if (reportById) {
          handleSelectReport(reportById)
        } else {
          // fetch report by id
        }
      }
    }
  }

  const fetchReports = (page?: number) => {
    if (!organization) return
    const currentPage = states?.report?.getAllReports?.currentPage || 1

    action?.getAllReports(
      organization,
      `?sort=desc&pageNumber=${page || currentPage + 1}`,
      (data) => {
        setReportById?.(data as IReports)
      }
    )
  }

  return {
    fetchReports,
    selectedReport,
    handleSelectReport,
    setReportById
  }
}

export const useIsLogged = ({
  action,
  notifyUser,
  getOrganization,
  organizations,
  roles,
  actionsRoles
}: {
  action: IAction
  notifyUser: INotification
  getOrganization: (type: 'id' | 'name', key: string | number) => IOrganization
  organizations: IOrganization[]
  roles: IRole[]
  actionsRoles: string[]
}) => {
  const {
    setNotificationStatus,
    getLoggedActionsForRole,
    getLoggedOrganization,
    getLoggedRoles
  } = action

  useEffect(() => {
    let timeOut: NodeJS.Timeout
    if (notifyUser)
      timeOut = setTimeout(() => {
        setNotificationStatus('', false)
      }, 3000)

    return () => {
      clearTimeout(timeOut)
    }
  }, [notifyUser, setNotificationStatus])

  const query = (sign: string) =>
    GODUSER
      ? ''
      : `${sign}OrganisationId=${
          getOrganization?.('name', USERTOKEN.Organisation)?.id || ''
        }`

  const getAllLoggedRoles = (query: string) => {
    if (GODUSER) getLoggedRoles(query)
    if (organizations?.length) getLoggedRoles(query)
  }

  useEffect(() => {
    if (isLogged) {
      if (!roles) getAllLoggedRoles(query('?'))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organizations])

  useEffect(() => {
    if (isLogged) {
      if (!actionsRoles) getLoggedActionsForRole(USERTOKEN.Role)
      if (!organizations) getLoggedOrganization('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
