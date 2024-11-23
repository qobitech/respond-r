import { FC, useState } from 'react'
import '../global.scss'
import ManagementPage from './management'
import ActionPage from './action'
import RolePage from './roles'
import OrganizationPage from './organization'
import { useNavigate, useParams } from 'react-router-dom'
import { url } from 'app-constants/Route'
import { GODUSER } from 'app-constants/roles'
import { ISSUPERADMIN } from 'app-constants'
import { mamagenentTabType, managementTabEnums } from './utils'

const AdminManagement: FC = () => {
  const navigate = useNavigate()

  const { pageTab } = useParams<{ pageTab: mamagenentTabType }>()

  const tabEnums = {
    USERS: 'User Management',
    ACTIONS: 'Actions',
    ROLES: 'Roles',
    ORGANIZATIONS: 'Organizations'
  } as const

  const getTab = (pageTab?: mamagenentTabType) => {
    switch (pageTab) {
      case 'actions':
        return tabEnums.ACTIONS
      case 'organizations':
        return tabEnums.ORGANIZATIONS
      case 'roles':
        return tabEnums.ROLES
      default:
        return tabEnums.USERS
    }
  }
  const getPageTab = (pageTab?: (typeof tabEnums)[keyof typeof tabEnums]) => {
    switch (pageTab) {
      case 'Actions':
        return managementTabEnums.ACTIONS
      case 'Organizations':
        return managementTabEnums.ORGANIZATIONS
      case 'Roles':
        return managementTabEnums.ROLES
      default:
        return managementTabEnums.USERS
    }
  }

  const [tab, setTab] = useState<string>(getTab(pageTab))

  const filterTab = (i: string) =>
    GODUSER
      ? i
      : ISSUPERADMIN
      ? i !== tabEnums.ORGANIZATIONS && i !== tabEnums.ACTIONS
      : false
  return (
    <div className="main-page">
      <div className="pg-container">
        <div className="mb-5">
          <div className="tab-section">
            <div className="tab-header">
              {Object.values(tabEnums)
                .filter(filterTab)
                .map((i, index) => (
                  <div
                    className={`tab-item ${i === tab ? 'active' : ''}`}
                    key={index}
                    onClick={() => {
                      navigate(`${url.MANAGEMENT}/${getPageTab(i)}`)
                      setTab(i)
                    }}
                  >
                    <p>{i}</p>
                  </div>
                ))}
            </div>
            <div className="tab-body">
              {tab === tabEnums.USERS ? <ManagementPage /> : null}
              {tab === tabEnums.ACTIONS ? <ActionPage /> : null}
              {tab === tabEnums.ROLES ? <RolePage /> : null}
              {tab === tabEnums.ORGANIZATIONS ? <OrganizationPage /> : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminManagement
