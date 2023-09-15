import React, { FC, useState } from "react"
import "./index.scss"
import { IStates } from "interfaces/IReducer"
import { ICell, ICellAction } from "utils/new/table"
import "../../../utils/new/pagination.scss"
import "../../../utils/new/page.scss"
import { Loader } from "utils/new/components"
import { VideoSVG } from "utils/new/svgs"
import { IVS, videostreamData } from "./mock-data"
import sample from "../../../extras/images/sample.jpg"

interface IProps {
  states?: IStates
}

export interface ITableRecord {
  id: string
  row: ICell[]
  rowActions: ICellAction[]
}

const tabEnum = {
  VEHICLEINFO: "Vehicle Info",
  OFFENSES: "Offenses",
  LOCATION: "Location",
}

const Overview: React.FC<IProps> = ({ states, ...props }) => {
  const [tab, setTab] = useState<string>(tabEnum.VEHICLEINFO)

  const [mainView, setMainView] = useState<IVS | null>(null)

  const handleMainView = (streamData: IVS) => setMainView(streamData)

  return (
    <div className="main-page">
      <div className="pg-container">
        <div className="overview-page">
          {mainView ? (
            <div className="video-section">
              <h3 className="camera-title">Camera: {mainView.cameraName}</h3>
              <div className="video-container">
                <video controls>
                  <source src="" />
                </video>
              </div>
              <div className="tab-section">
                <div className="tab-header">
                  {Object.values(tabEnum).map((i, index) => (
                    <div
                      className={`tab-item ${i === tab ? "active" : ""}`}
                      key={index}
                      onClick={() => setTab(i)}
                    >
                      <p>{i}</p>
                    </div>
                  ))}
                </div>
                <div className="tab-body">
                  {tab === tabEnum.VEHICLEINFO ? (
                    <VehicleInfoSection
                      classification={mainView.classification || "..."}
                      code={mainView.code || "..."}
                      make={mainView.make}
                      model={mainView.model}
                      orientation={mainView.orientation}
                      regNumber={mainView.regNumber}
                      type={mainView.vehicleType}
                      color={mainView.color}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          ) : (
            <div className="no-video-selected-section">
              <VideoSVG />
              <p style={{ color: "#E21B1B" }}>NO LIVE FEED SELECTED</p>
              <p>Select to watch</p>
            </div>
          )}
          <div className="stream-section">
            <LiveFeedComponent setMainView={handleMainView} />
          </div>
        </div>
      </div>
      <Loader loader={false} />
    </div>
  )
}

export default Overview

const LiveFeedComponent = ({
  setMainView,
}: {
  setMainView: (streamData: IVS) => void
}) => {
  return (
    <div className="live-feed-component">
      <p className="lf-header">
        LIVE FEEDS &nbsp;&nbsp;({videostreamData.length})
      </p>
      <div className="live-feed-component-wrapper">
        {videostreamData.map((i, index) => (
          <LiveFeedItemComponent
            key={index}
            carColor={i.color}
            carMake={i.make}
            carType={i.vehicleType}
            imgSrc={sample}
            offense="Eating fufu"
            regNumber={i.regNumber}
            handleOnClick={() => {
              setMainView(i)
            }}
          />
        ))}
      </div>
    </div>
  )
}

interface ILFIC {
  imgSrc: string
  regNumber: string
  carMake: string
  carType: string
  carColor: string
  offense: string
  handleOnClick?: () => void
}

const LiveFeedItemComponent: FC<ILFIC> = (props) => {
  return (
    <div className="live-feed-item-component" onClick={props.handleOnClick}>
      <div className="lf-media-section">
        <img src={props.imgSrc} alt="" />
      </div>
      <div className="lf-info-section">
        <p className="lf-info-section-label">Reg Number</p>
        <p className="lf-info-section-value lf-reg-number">{props.regNumber}</p>
        <p className="lf-info-section-label">Make & Type</p>
        <div className="lf-make-type">
          <div className="lf-color" style={{ background: props.carColor }} />
          <p className="lf-info-section-value">{props.carMake}</p>
          <div className="lf-text-separator" />
          <p className="lf-info-section-value">{props.carType}</p>
        </div>
        <p className="lf-info-section-label">Flagged for</p>
        <p className="lf-info-section-value lf-info-bottom-value">
          {props.offense}
        </p>
      </div>
    </div>
  )
}

interface IVIS {
  regNumber: string
  code: string
  classification: string
  orientation: string
  type: string
  make: string
  model: string
  color: string
}

const VehicleInfoSection: FC<IVIS> = (props) => {
  return (
    <div className="vehicle-info-section">
      <VehicleInfoSectionItem
        label="Vehicle Reg Number"
        value={props.regNumber}
      />
      <VehicleInfoSectionItem label="Code" value={props.code} />
      <VehicleInfoSectionItem
        label="Classification"
        value={props.classification}
      />
      <VehicleInfoSectionItem label="Orientation" value={props.orientation} />
      <VehicleInfoSectionItem label="Vehicle Type" value={props.type} />
      <VehicleInfoSectionItem label="Vehicle Make" value={props.make} />
      <VehicleInfoSectionItem label="Vehicle Model" value={props.model} />
      <VehicleInfoSectionColorItem label="Vehicle Color" value={props.color} />
    </div>
  )
}

const VehicleInfoSectionItem = ({
  label,
  value,
}: {
  label: string
  value: string
}) => {
  return (
    <div className="vehicle-info-section-item">
      <p className="vehicle-info-label">{label}</p>
      <p className="vehicle-info-value">{value}</p>
    </div>
  )
}

const VehicleInfoSectionColorItem = ({
  label,
  value,
}: {
  label: string
  value: string
}) => {
  return (
    <div className="vehicle-info-section-item">
      <p className="vehicle-info-label">{label}</p>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div
          style={{
            width: "20px",
            height: "20px",
            background: value,
            borderRadius: "50%",
          }}
        />
        <p className="vehicle-info-value">{value}</p>
      </div>
    </div>
  )
}
