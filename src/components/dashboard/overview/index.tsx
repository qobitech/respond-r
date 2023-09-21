import React, { FC, useEffect, useState } from "react"
import "./index.scss"
import { IStates } from "interfaces/IReducer"
import { ICell, ICellAction } from "utils/new/table"
import "../../../utils/new/pagination.scss"
import "../../../utils/new/page.scss"
import { Loader } from "utils/new/components"
import { VideoSVG } from "utils/new/svgs"
import { IVS, videostreamData } from "./mock-data"
import sample from "../../../extras/images/sample.jpg"
import RightSection, {
  useRightSection,
} from "components/reusable/right-section"
import io from "socket.io-client"
import { TypeInput } from "utils/new/input"
import { TypeButton, TypeSmallButton } from "utils/new/button"

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

// interface IUES {
//   message: any
//   setMessage: React.Dispatch<any>
// }

// const useEventSource = (): IUES => {
//   const [message, setMessage] = useState<any>()

//   useEffect(() => {
//     const eventSource = new EventSource("http://localhost:8080/api/sse")

//     if (typeof EventSource !== "undefined") {
//       eventSource.onmessage = (ev: MessageEvent<any>) => {
//         const event = JSON.parse(ev.data)
//         setMessage(event)
//       }
//       eventSource.onerror = (ev: Event) => {
//         eventSource.close()
//       }
//     }
//     return () => eventSource.close()
//   }, [])

//   return {
//     setMessage,
//     message,
//   }
// }

interface IUS {
  hits: any
  feeds: any
  sendRequest: (url: string) => void
}

const useSocketIO = (): IUS => {
  const [hits, setHits] = useState<any>()
  const [feeds, setFeeds] = useState<any>()
  const socket = io(`respond-r-bb.vercel.app`)

  const sendRequest = (url: string) => {
    socket.emit("request_url", {
      url,
    })
  }

  useEffect(() => {
    socket.on("hit", (data) => {
      setHits(data)
    })
    socket.on("feeds", (data) => {
      setFeeds(data)
    })
  }, [socket])

  return {
    hits,
    feeds,
    sendRequest,
  }
}

const Overview: React.FC<IProps> = ({ states, ...props }) => {
  const rightSectionProps = states?.global.rightSection

  const [tab, setTab] = useState<string>(tabEnum.VEHICLEINFO)

  const [mainView, setMainView] = useState<IVS | null>(null)

  const handleMainView = (streamData: IVS) => setMainView(streamData)

  const rsProps = useRightSection()

  useEffect(() => {
    if (rightSectionProps?.action) {
      rsProps.callSection(rightSectionProps.action, rightSectionProps.component)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rightSectionProps])

  useEffect(() => {
    if (rsProps.queryAction !== "create") {
      rsProps.callSectionOnQuery()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // const useEventProps = useEventSource()

  // console.log(useEventProps.message, "juju")

  const socketProps = useSocketIO()

  console.log(socketProps.feeds, socketProps.hits, "juju")

  return (
    <>
      <RightSection rsProps={rsProps}>
        {rsProps.isView("custom", "settings") ? (
          <Configuration socketProps={socketProps} />
        ) : null}
      </RightSection>
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
                <p style={{ color: "#E21B1B" }}>NO VIDEO STREAM</p>
                <p>Select Live feed to watch</p>
              </div>
            )}
            <div className="stream-section">
              <LiveFeedComponent setMainView={handleMainView} />
            </div>
          </div>
        </div>
        <Loader loader={false} />
      </div>
    </>
  )
}

export default Overview

const LiveFeedComponent = ({
  setMainView,
}: {
  setMainView: (streamData: IVS) => void
}) => {
  const filters = [`Hits (${0})`, `All Feeds (${videostreamData.length || 0})`]
  const useFilterProps = useFilterSection(filters[0])
  return (
    <div className="live-feed-component">
      <p className="lf-header">LIVE FEED</p>
      <LiveFeedFilterSection filterProps={useFilterProps} filters={filters} />
      <div className="live-feed-component-wrapper">
        {useFilterProps.selectedFilter === filters[1] ? (
          videostreamData.map((i, index) => (
            <LiveFeedItemComponent
              key={index}
              carColor={i.color}
              carMake={i.make}
              carType={i.vehicleType}
              imgSrc={sample}
              offense="Playing amampiano"
              regNumber={i.regNumber}
              handleOnClick={() => {
                setMainView(i)
              }}
            />
          ))
        ) : useFilterProps.selectedFilter === filters[0] ? (
          <NoFeeds />
        ) : (
          <NoFeeds />
        )}
      </div>
    </div>
  )
}

const NoFeeds = () => {
  return (
    <div className="no-feeds">
      <VideoSVG width="20" height="20" />
      <p>No feed</p>
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
          <div
            className={`lf-color ${props.carColor === "white" ? "border" : ""}`}
            style={{ background: props.carColor }}
            title={props.carColor}
          />
          <p className="lf-info-section-value" title={props.carMake}>
            {props.carMake}
          </p>
          <div className="lf-text-separator" />
          <p className="lf-info-section-value" title={props.carType}>
            {props.carType}
          </p>
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
      <p
        className={`vehicle-info-value ${
          label.includes("Reg") ? "reg-number" : ""
        }`}
      >
        {value}
      </p>
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
          className={`vehicle-info-color ${value === "white" ? "border" : ""}`}
          title={value}
          style={{ background: value }}
        />
        <p className={`vehicle-info-value`}>{value}</p>
      </div>
    </div>
  )
}

const Configuration = ({ socketProps }: { socketProps: IUS }) => {
  const [inputValue, setInputValue] = useState<string>("")

  const handleOnChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target
    setInputValue(value)
  }

  const handleSubmit = () => {
    console.log("clicked")
    // if (inputValue)
    socketProps.sendRequest(inputValue)
  }

  const cancelFeed = () => {
    socketProps.sendRequest("")
    setInputValue("")
  }

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <TypeInput placeholder="Enter url" onChange={handleOnChange} />
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <TypeButton title="Request Feed" onClick={handleSubmit} />
          <TypeSmallButton
            title="Cancel Feed"
            buttonType="danger"
            onClick={cancelFeed}
          />
        </div>
      </form>
    </div>
  )
}

interface IUFS {
  handleFilter: (selectedFilter?: string) => void
  selectedFilter: string | undefined
}

const useFilterSection = (defaultSelected: string): IUFS => {
  const [selectedFilter, setSelectedFilter] = useState<string | undefined>(
    defaultSelected
  )

  const handleFilter = (selectedFilter?: string) => {
    setSelectedFilter(selectedFilter)
  }
  return {
    selectedFilter,
    handleFilter,
  }
}

interface ILFS {
  filterProps: IUFS
  filters: string[]
}

const LiveFeedFilterSection: FC<ILFS> = ({ filterProps, filters }) => {
  return (
    <div className="live-feed-filter-section">
      {filters.map((i, index) => (
        <button
          className={filterProps.selectedFilter === i ? "active" : ""}
          key={index}
          onClick={() => filterProps.handleFilter(i)}
        >
          {i}
        </button>
      ))}
    </div>
  )
}
