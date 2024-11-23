import { MediaSVG } from 'utils/svgs'

const MediaRTSPToggle = ({
  isImage,
  isRtsp,
  setSelectedView,
  setIsMedia,
  isMedia
}: {
  isImage: boolean
  isRtsp: boolean
  setSelectedView?: (value: React.SetStateAction<number>) => void
  setIsMedia: React.Dispatch<React.SetStateAction<boolean>>
  isMedia: boolean
}) => {
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
      <button className="show-hide-media" onClick={() => setIsMedia(!isMedia)}>
        {!isMedia ? 'SHOW' : 'HIDE'}
        &nbsp;MEDIA&nbsp;&nbsp;
        <MediaSVG height="40" width="40" />
      </button>
    </div>
  )
}

export default MediaRTSPToggle
