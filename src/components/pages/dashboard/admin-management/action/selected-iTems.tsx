import { CloseSVG } from 'utils/svgs'

export const SelectedItems = ({
  id,
  title,
  onRemove,
  index
}: {
  title: string
  id: string
  onRemove?: (id: string) => void
  index: number
}) => {
  const isRemove = typeof onRemove === 'function'
  return (
    <div className="role-select-item-wrapper">
      <div className="select-item-content">
        <div className="index-style">
          <p>{index + '. '}</p>
        </div>
        <p>{title || 'no title'}</p>
        {isRemove ? (
          <div className="close-container" onClick={() => onRemove(id)}>
            <CloseSVG />
          </div>
        ) : null}
      </div>
    </div>
  )
}
