import { FC } from 'react'
import { ILFIC } from './utils'
import { CopySVG } from 'utils/svgs'

export const LiveFeedItemComponent: FC<ILFIC> = (props) => {
  return (
    <div className="live-feed-item-component" onClick={props.handleOnClick}>
      <div className="lf-media-section">
        {props.imgSrc ? <img src={props.imgSrc} alt="" /> : ''}
      </div>
      <div className="lf-info-section">
        <div className="vehicle-reg-number-info">
          <p className="lf-info-section-label">Reg Number</p>
          <CopySVG />
        </div>
        <p className="lf-info-section-value lf-reg-number">{props.regNumber}</p>
        <p className="lf-info-section-label">Make & Type</p>
        <div className="lf-make-type">
          {props.carColor ? (
            <div
              className={`lf-color ${
                props.carColor === 'white' ? 'border' : ''
              }`}
              style={{ background: props.carColor }}
              title={props.carColor}
            />
          ) : null}
          <p className="lf-info-section-value" title={props.carMake}>
            {props.carMake}
          </p>
          <div className="lf-text-separator" />
          <p className="lf-info-section-value" title={props.carType}>
            {props.carType}
          </p>
        </div>
        <p className="lf-info-section-label flag">Number of Flags</p>
        <p className="lf-info-section-value lf-info-bottom-value">
          {props.offense}
        </p>
      </div>
    </div>
  )
}
