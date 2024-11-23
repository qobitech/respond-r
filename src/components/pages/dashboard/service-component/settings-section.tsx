import { IRightSection } from 'utils/right-section/utils'
import { chkType } from '../traffic/utils'
import { IPHUS } from './utils'
import { useState } from 'react'
import { FeedForm } from './feed-form'
import { ENVForm } from './env-form'

export const SettingsSection = <T extends {}>({
  signalR,
  urlKey,
  rsProps
}: {
  signalR: IPHUS<T>
  urlKey: chkType
  rsProps?: IRightSection<{}> | undefined
}) => {
  const tabEnums = {
    PAGE: 'Connection',
    URL: 'ENV Configuration'
  }

  const [tab, setTab] = useState<string>(tabEnums.PAGE)

  return (
    <div className="tab-section">
      <div className="tab-header">
        {Object.values(tabEnums).map((i, index) => (
          <div
            className={`tab-item ${i === tab ? 'active' : ''}`}
            key={index}
            onClick={() => setTab(i)}
          >
            <p>{i}</p>
          </div>
        ))}
      </div>
      <div className="tab-body">
        {tab === tabEnums.PAGE ? (
          <FeedForm signalR={signalR} urlKey={urlKey} rsProps={rsProps} />
        ) : null}
        {tab === tabEnums.URL ? <ENVForm /> : null}
      </div>
    </div>
  )
}
