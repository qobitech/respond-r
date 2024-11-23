import { IReport } from 'interfaces/IReport'
import { IRightSection } from 'utils/right-section/utils'
import { MainView } from '../service-component/main-view'

export const ViewReport = ({
  rsProps
}: {
  rsProps?: IRightSection<IReport>
}) => {
  return <MainView feed={rsProps?.data} />
}
