import { useCopy } from 'utils/hook'
import { CheckSVG, CopySVG, MediaSVG } from 'utils/svgs'

const MediaRTSPToggle = ({
  isImage,
  isRtsp,
  setSelectedView,
  setIsMedia,
  isMedia,
  plateNumber
}: {
  isImage: boolean
  isRtsp: boolean
  setSelectedView?: (value: React.SetStateAction<number>) => void
  setIsMedia: React.Dispatch<React.SetStateAction<boolean>>
  isMedia: boolean
  plateNumber?: string
}) => {
  const copyProps = useCopy()
  return (
    <div className="video-section-header-tab pb-2">
      <button
        className={isImage ? 'active' : ''}
        onClick={() => setSelectedView?.(0)}
      >
        SIGNAL R
      </button>
      <button
        className={isRtsp ? 'active' : ''}
        onClick={() => setSelectedView?.(1)}
      >
        RTSP FEED
      </button>
      {plateNumber ? (
        <div
          className="ml-4 d-flex align-items-center"
          onClick={() => {
            copyProps.copy(plateNumber)
          }}
        >
          <h3>{plateNumber}</h3>&nbsp;
          {copyProps.copySuccess ? <CheckSVG /> : <CopySVG />}
        </div>
      ) : null}
      <button className="show-hide-media" onClick={() => setIsMedia(!isMedia)}>
        {!isMedia ? 'SHOW' : 'HIDE'}
        &nbsp;MEDIA&nbsp;&nbsp;
        <MediaSVG height="40" width="40" />
      </button>
    </div>
  )
}

export default MediaRTSPToggle
