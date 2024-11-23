import {
  CarsSVG,
  FireExtinguisherSVG,
  ManagementSVG,
  MedicalSVG,
  PoliceSVG
} from 'utils/svgs'
import { pageType } from './utils'

export const PageIdentifier = ({ page }: { page: pageType }) => {
  return (
    <div className="page-identifier">
      {page === 'firefighter' ? <FireExtinguisherSVG /> : null}
      {page === 'e-police' ? <PoliceSVG /> : null}
      {page === 'e-traffic' ? <CarsSVG /> : null}
      {page === 'management' ? <ManagementSVG /> : null}
      {page === 'e-medical' ? <MedicalSVG /> : null}
      <p>{page}</p>
    </div>
  )
}
