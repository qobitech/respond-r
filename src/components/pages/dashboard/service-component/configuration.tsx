import { IRightSection } from 'utils/right-section/utils'
import { IPHUS } from './utils'
import { chkType } from '../traffic/utils'
import { SettingsSection } from './settings-section'

export const Configuration = <T extends {}>({
  signalR,
  rsProps,
  urlKey
}: {
  signalR: IPHUS<T>
  rsProps?: IRightSection<{}>
  urlKey: chkType
}) => {
  return (
    <div>
      <div style={{ paddingBottom: '20px' }} />
      <SettingsSection signalR={signalR} urlKey={urlKey} rsProps={rsProps} />
    </div>
  )
}
