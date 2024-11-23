import { ORGANIZATION } from 'app-constants'
import { GODUSER } from 'app-constants/roles'
import { PulseSVG } from 'utils/svgs'

export const PageHeader = ({
  load,
  title
}: {
  load: boolean
  title: string
}) => {
  return (
    <div className="header-management">
      <h1>
        {title} {!GODUSER ? '(' + ORGANIZATION + ')' : ''}
      </h1>
      {load ? <PulseSVG /> : null}
    </div>
  )
}
