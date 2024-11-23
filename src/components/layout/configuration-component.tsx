import { FC } from 'react'
import { CogSVG } from 'utils/svgs'

export const ConfigurationComponent: FC<{
  openSettings: () => void
}> = ({ openSettings }) => {
  return (
    <div className="nav-config-component" onClick={openSettings}>
      <CogSVG />
      <p>Settings</p>
    </div>
  )
}
