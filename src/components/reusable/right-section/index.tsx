import React, { useContext } from 'react'
import './index.scss'
import { TypeButton } from 'utils/new/button'
import ReactDOM from 'react-dom'
import { ThemeContext } from 'context/theme-context'
import { IRSection } from './utils'

const RightSection = <T extends {}>({ children, rsProps }: IRSection<T>) => {
  const handleClose = () => {
    rsProps.closeSection()
    rsProps.setAction({ component: null, type: null, id: null })
    rsProps.setCtas(null)
  }

  const matchChild: any = React.Children.map(children, (child) => {
    if (child) return (child = { ...child, props: { ...child.props, rsProps } })
    return child
  })

  const { theme } = useContext(ThemeContext)

  return ReactDOM.createPortal(
    <>
      <div className={`theme-${theme}`}>
        {rsProps.openSection ? (
          <div className="back-drop" onClick={rsProps.closeSection} />
        ) : null}
        <div
          className={`right_container ${
            rsProps.openSection ? 'menuopen' : 'menuclose'
          }`}
        >
          <div className="rs-header">
            <TypeButton
              buttonSize="small"
              title=""
              close
              buttonType="danger"
              onClick={handleClose}
              style={{ padding: '5px 12px' }}
            />
            <h3>{rsProps.title}</h3>
            <div className="ctas">
              {rsProps.ctas?.map((i, index) => (
                <TypeButton
                  buttonSize="small"
                  title={i.title}
                  buttonType={i.type}
                  onClick={i.action}
                  key={index}
                />
              ))}
            </div>
          </div>
          <div className="rs-body">{matchChild}</div>
        </div>
      </div>
    </>,
    document.getElementById('right-section-root')
  )
}

export default RightSection
