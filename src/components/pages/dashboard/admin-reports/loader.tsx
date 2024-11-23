import { PulseSVG } from 'utils/svgs'

export const Loader = ({ loadReports }: { loadReports: boolean }) => {
  return (
    <>
      {loadReports ? (
        <div className="text-center">
          <PulseSVG />
        </div>
      ) : null}
    </>
  )
}
