import { IUseImage } from 'utils/hook'
import { useGetMediaUrl } from './hooks'
import { PulseSVG } from 'utils/svgs'

export const MediaItem = ({
  url,
  imgProps
}: {
  url: string
  imgProps: IUseImage
}) => {
  if (!url) return <></>
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { mediaUrl } = useGetMediaUrl(url, imgProps)

  return (
    <div className="w-100 h-100 d-flex align-items-center justify-content-center">
      {mediaUrl.load ? (
        <PulseSVG />
      ) : mediaUrl.type === 'image' ? (
        <img src={mediaUrl.url} alt="" />
      ) : mediaUrl.type === 'video' ? (
        <video controls>
          <source src={`${mediaUrl.url}#t=1,3`} type="video/mp4" />
        </video>
      ) : null}
    </div>
  )
}
