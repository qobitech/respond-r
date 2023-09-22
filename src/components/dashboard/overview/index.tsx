import React, { FC, useEffect, useState } from "react"
import "./index.scss"
import { IStates } from "interfaces/IReducer"
import { ICell, ICellAction } from "utils/new/table"
import "../../../utils/new/pagination.scss"
import "../../../utils/new/page.scss"
import { Loader } from "utils/new/components"
import { VideoSVG } from "utils/new/svgs"
import { IVS } from "./mock-data"
import sample from "../../../extras/images/sample.jpg"
import RightSection, {
  IRightSection,
  useRightSection,
} from "components/reusable/right-section"
import { TypeInput } from "utils/new/input"
import { TypeButton, TypeSmallButton } from "utils/new/button"
import { IFeed, IHit } from "interfaces/IStream"
import { handleDataStream } from "./data"
import * as signalR from "@microsoft/signalr"
import { useFormHook } from "utils/new/hook"
import * as yup from "yup"

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

const getConnection = (url: string) => {
  return new signalR.HubConnectionBuilder()
    .withUrl(url, {
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets,
    })
    .configureLogging(signalR.LogLevel.Trace)
    .withAutomaticReconnect()
    .build()
}

type typeConnectionStatus =
  | "connecting"
  | "connected"
  | "re-connecting"
  | "closed"
interface IUS {
  hits: IHit[]
  feeds: IFeed[]
  connectionStatus: typeConnectionStatus
  startConnection: (url: string) => void
}

const useSocketIO = (): IUS => {
  const [connection, setConnection] = useState<signalR.HubConnection>()
  const [hits, setHits] = useState<IHit[]>([])
  const [feeds, setFeeds] = useState<IFeed[]>([])
  const [connectionStatus, setConnectionStatus] =
    useState<typeConnectionStatus>("closed")

  const startConnection = (url: string) => {
    setConnectionStatus("connecting")
    const connection = getConnection(url)
    connection
      ?.start()
      .then(() => {
        setConnectionStatus("connected")
      })
      .catch(() => {
        setConnectionStatus("closed")
      })
    setConnection(connection)
  }

  useEffect(() => {
    connection?.on("SendNotification", (data: IHit) => {
      setHits(handleDataStream(hits)(data))
    })
    connection?.on("SendHits", (data: IFeed) => {
      setFeeds(handleDataStream(feeds)(data))
    })
    connection?.onreconnecting(() => {
      setConnectionStatus("connected")
    })
    connection?.onreconnected(() => {
      setConnectionStatus("re-connecting")
    })
    connection?.onclose(() => {
      setConnectionStatus("closed")
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connection])

  return {
    hits,
    feeds,
    connectionStatus,
    startConnection,
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

  const socketProps = useSocketIO()

  console.log(socketProps.hits, "juju")

  const lck = socketProps.hits?.[0]?.regNumber

  return (
    <>
      <RightSection rsProps={rsProps}>
        {rsProps.isView("custom", "settings") ? (
          <Configuration socketProps={socketProps} />
        ) : null}
      </RightSection>
      <div className="main-page">
        <div className="pg-container">
          <LiveFeedStatusComponent socketProps={socketProps} />
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
              <LiveFeedComponent
                setMainView={handleMainView}
                socketProps={socketProps}
                key={lck}
              />
            </div>
          </div>
        </div>
        <Loader loader={false} />
      </div>
    </>
  )
}

export default Overview

const getFeed = (i: IFeed, index: number) => ({
  _id: {
    $oid: index + "",
  },
  cameraName: i.cameraName,
  classification: i.classification,
  code: i.code,
  color: i.colour,
  createdAt: {
    $date: "",
  },
  filePath: i.filePath,
  make: i.make,
  model: i.model,
  orientation: i.orientation,
  regNumber: i.regNumber,
  status: "",
  timeStamp: i.timeStamp,
  updatedAt: {
    $date: "",
  },
  vehicleType: i.vehicleType,
  flags: i.flags,
})

const LiveFeedStatusComponent = ({ socketProps }: { socketProps: IUS }) => {
  return (
    <div className="live-feed-component">
      <div className="live-feed-header-section">
        <p className="lf-header">LIVE FEED</p>
        <p className={`lf-status ${socketProps.connectionStatus}`}>
          <span className={`lf-status-bop ${socketProps.connectionStatus}`} />
          {socketProps.connectionStatus}
        </p>
        {/* {socketProps.connectionStatus === "closed" ? (
          <p className="lf-data-refresh">Refresh</p>
        ) : null} */}
      </div>
    </div>
  )
}

const LiveFeedComponent = ({
  setMainView,
  socketProps,
}: {
  setMainView: (streamData: IVS) => void
  socketProps: IUS
}) => {
  const filters = [`Hits`, `All Feeds`]
  const useFilterProps = useFilterSection(filters[0])
  return (
    <div className="live-feed-component">
      <LiveFeedFilterSection filterProps={useFilterProps} filters={filters} />
      <div className="live-feed-component-wrapper">
        {useFilterProps.selectedFilter === filters[1] &&
        socketProps.feeds[0] ? (
          socketProps.feeds.map((i, index) => (
            <LiveFeedItemComponent
              key={index}
              carColor={i.colour}
              carMake={i.make}
              carType={i.vehicleType}
              imgSrc={sample}
              offense="Playing amampiano"
              regNumber={i.regNumber}
              handleOnClick={() => {
                setMainView(getFeed(i, index))
              }}
            />
          ))
        ) : useFilterProps.selectedFilter === filters[0] &&
          socketProps.hits[0] ? (
          socketProps.hits.map((i, index) => (
            <LiveFeedItemComponent
              key={index}
              carColor={i.colour}
              carMake={i.make}
              carType={""}
              imgSrc={sample}
              offense="Playing amampiano"
              regNumber={i.regNumber}
              handleOnClick={() => {
                // setMainView(getFeed(i, index))
              }}
            />
          ))
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

const Configuration = ({
  socketProps,
  rsProps,
}: {
  socketProps: IUS
  rsProps?: IRightSection<{}>
}) => {
  const [hookForm] = useFormHook<{ inputValue: string }>({
    inputValue: yup.string().required("url required"),
  })

  const handleSubmit = ({ inputValue }: { inputValue: string }) => {
    if (inputValue) socketProps.startConnection(inputValue)
  }

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <TypeInput
          placeholder="Enter url"
          {...hookForm.register("inputValue")}
          error={hookForm.formState.errors.inputValue?.message}
        />
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <TypeButton
            title="Request Feed"
            onClick={hookForm.handleSubmit(handleSubmit)}
          />
          <TypeSmallButton
            title=""
            buttonType="danger"
            onClick={() => {
              rsProps?.closeSection()
              hookForm.reset()
            }}
            close
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
