import React, { useState } from "react"
import "./index.scss"
import "../../../utils/new/pagination.scss"

export interface ICardTab {
  tab: string
  setTab: React.Dispatch<React.SetStateAction<string>>
  tabs: { [key: string]: string }
}

export const useCardTab = (
  tabs: { [key: string]: string },
  defaultTab: string
): ICardTab => {
  const [tab, setTab] = useState<string>(defaultTab)

  return {
    setTab,
    tab,
    tabs,
  }
}

interface IProps extends ICardTab {
  title: string
  tag: string
  children?: any
}

const CardTab: React.FC<IProps> = ({
  title,
  tag,
  children,
  tab,
  tabs,
  setTab,
}) => {
  return (
    <div className="application-card">
      <div className="application-header">
        <div className="application-header-content">
          <h3>{title}</h3>
          <p>{tag}</p>
        </div>
      </div>
      <div className="tab-section">
        <div className="tab-header">
          {Object.values(tabs).map((i, index) => (
            <div
              className={`tab-item ${i === tab ? "active" : ""}`}
              key={index}
              onClick={() => setTab(i)}
            >
              <p>{i}</p>
              <div className="tab-bar" />
            </div>
          ))}
        </div>
        <div className="tab-body">{children}</div>
      </div>
    </div>
  )
}

export default CardTab
