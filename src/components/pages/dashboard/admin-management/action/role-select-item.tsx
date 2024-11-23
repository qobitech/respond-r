import { useState } from 'react'
import { TypeCheckbox } from 'utils/checkbox'
import { CloseSVG } from 'utils/svgs'

export const RoleSelectItem = ({
  id,
  title,
  setValue,
  onRemove
}: {
  title: string
  id: string
  setValue: (id: string, checked: boolean) => void
  onRemove?: (id: string) => void
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(false)

  const handleOnClick = () => {
    setIsChecked((e) => !isChecked)
    setValue(id, !isChecked)
  }

  const isRemove = typeof onRemove === 'function'
  return (
    <div className="role-select-item-wrapper">
      <div onClick={handleOnClick} className="select-item-content">
        <TypeCheckbox id={id} checked={isChecked} />
        <p>{title}</p>
        {isRemove ? (
          <div className="close-container">
            <CloseSVG />
          </div>
        ) : null}
      </div>
    </div>
  )
}
