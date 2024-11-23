import { IUseImage } from 'utils/hook'
import { LeftNavSVG, RightNavSVG } from 'utils/svgs'
import { MediaItem } from './media-item'

export const Media = ({
  files,
  fileIndex,
  handleFileIndex,
  imgProps
}: {
  files?: string[]
  fileIndex: number
  handleFileIndex: (nav: 'left' | 'right') => void
  imgProps: IUseImage
}) => {
  const isLeft = fileIndex > 0
  const isRight = fileIndex < (files?.length || 1) - 1

  return (
    <div className="media-container-box">
      <MediaItem url={files?.[fileIndex] || ''} imgProps={imgProps} />
      <div
        className={`nav-btn nav-left ${isLeft ? '' : 'no-click'}`}
        onClick={() => handleFileIndex('left')}
      >
        <LeftNavSVG />
      </div>
      <div
        className={`nav-btn nav-right ${isRight ? '' : 'no-click'}`}
        onClick={() => handleFileIndex('right')}
      >
        <RightNavSVG />
      </div>
    </div>
  )
}
