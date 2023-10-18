import React, { FC, useEffect, useState } from "react"
import "./index.scss"
import { IStates, IVehicleReducer } from "interfaces/IReducer"
import Table, { ICell, ICellAction } from "utils/new/table"
import "../../../utils/new/pagination.scss"
import "../../../utils/new/page.scss"
import { Loader } from "utils/new/components"
import { FlagSVG, NoteSVG, VideoSVG } from "utils/new/svgs"
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
import { IAction } from "interfaces/IAction"
import {
  ISOTDetails,
  IVehicle,
  IVehicleNote,
  IVehicleOffense,
} from "interfaces/IVehicle"
import { vehicles } from "store/types"
import { Accordion, useAccordion } from "components/reusable/accordion"
import Switch, { Case } from "components/reusable/switch"
import ReactPaginate from "react-paginate"
import Stream from "./stream-player"
import axios from "axios"

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
  OWNERINFO: "Owner Info",
  SOT: "SOT",
  INSTANCE: "Instance",
  NOTES: "Notes",
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

const configFormEnums = {
  connectionUrl: "connectionUrl",
  filePath: "filePath",
  rtspUrl: "rtspUrl",
} as const

type chkType = (typeof configFormEnums)[keyof typeof configFormEnums]

const getUrl = (urlKey: chkType) => {
  const url = localStorage.getItem(urlKey)
  return url
}

const isUrlExist = (urlKey: chkType, url: string) => {
  return getUrl(urlKey) === url
}

const setUrl = (urlKey: chkType, value: string) => {
  if (isUrlExist(urlKey, value)) return
  localStorage.removeItem(urlKey)
  localStorage.setItem(urlKey, value)
}

const setUrls = (data: any) => {
  for (let i in data) {
    if (data[i]) setUrl(i as chkType, data[i])
  }
}

interface IUSIO {
  sendRTSPURL: (url: string) => void
  streamStatus: streamTypes | null
  stopRTSPFeed: () => void
}

export type streamTypes = "started" | "loading" | "error"
export const streamEnums = {
  STARTED: "started",
  LOADING: "loading",
  ERROR: "error",
}

const useRTSP = (): IUSIO => {
  const [streamStatus, setStreamStatus] = useState<streamTypes | null>(null)
  const rtspurl = getUrl("rtspUrl")

  const httpRequest = (url: string) => {
    axios
      .get(`http://respondR:3002/stream?rtsp=${url}`)
      .then(() => {
        setStreamStatus(url === "stop" ? null : "started")
      })
      .catch(() => {
        setStreamStatus("error")
      })
  }

  const sendRTSPURL = (url?: string) => {
    setStreamStatus("loading")
    if (url && url !== rtspurl) setUrl("rtspUrl", url)
    httpRequest(url || rtspurl || "")
  }

  const stopRTSPFeed = () => {
    httpRequest("stop")
  }

  return {
    sendRTSPURL,
    streamStatus,
    stopRTSPFeed,
  }
}

const useSignalR = (): IUS => {
  const [connection, setConnection] = useState<signalR.HubConnection>()
  const [hits, setHits] = useState<IHit[]>([])
  const [feeds, setFeeds] = useState<IFeed[]>([])
  const [connectionStatus, setConnectionStatus] =
    useState<typeConnectionStatus>("closed")
  const [trigger, setTrigger] = useState<number>(0)

  const handleTrigger = () => {
    const temp = Math.random()
    setTrigger(temp === trigger ? temp + 1 : temp)
  }

  const startConnection = (url: string) => {
    setConnectionStatus("connecting")
    const storedUrl = getUrl("connectionUrl") || ""
    const connection = getConnection(url || storedUrl)
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

  const hit = new Audio(require("../../../extras/audio/hit.mp3"))
  const playHit = () => {
    hit.play()
  }

  const mapDataArray = (i: IHit | IFeed) => {
    return i.regNumber
  }

  useEffect(() => {
    connection?.on("SendNotification", (data: IFeed) => {
      handleTrigger()
      setFeeds(handleDataStream(feeds, mapDataArray, "regNumber")(data))
    })
    connection?.on("SendHits", (data: IHit) => {
      handleTrigger()
      setHits(handleDataStream(hits, mapDataArray, "regNumber")(data))
      playHit()
    })
    connection?.onreconnecting(() => {
      setConnectionStatus("re-connecting")
    })
    connection?.onreconnected(() => {
      setConnectionStatus("connected")
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

const getFilePath = (i: string) => {
  if (!i) return sample
  if (!getUrl("filePath")) return sample
  return getUrl("filePath") + `/` + i.replaceAll("\\", "/")
}

const Overview: React.FC<IProps> = ({ states, ...props }) => {
  const { getVehicleByRegNumber, clearAction } = props as unknown as IAction
  const rightSectionProps = states?.global.rightSection
  const vehicle = states?.vehicle
  const [mediaUrl, setMediaUrl] = useState<string>("")
  const [flags, setFlags] = useState<string[]>([])
  const [camera, setCamera] = useState<string>()

  const handleFeedRequest = (i: IFeed) => {
    // get vehicle by reg number
    clearAction(vehicles.getVehicleByRegNumber)
    getVehicleByRegNumber(i.regNumber)
    console.log("feed")
    setFlags(i.flags as string[])
    setCamera(i.cameraName)
    setMediaUrl(getFilePath(i.filePath))
  }

  const handleHitRequest = (i: IHit) => {
    // get vehicle by reg number
    clearAction(vehicles.getVehicleByRegNumber)
    getVehicleByRegNumber(i.regNumber)
    console.log("hit")
    setFlags(i.flag as string[])
    setMediaUrl(getFilePath(i.displayUrl))
  }

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

  const signalRProps = useSignalR()

  const rtspProps = useRTSP()

  const [selectedView, setSelectedView] = useState<number>(0)

  const isImage = selectedView === 0
  const isRtsp = selectedView === 1

  return (
    <>
      <RightSection rsProps={rsProps}>
        {rsProps.isView("custom", "settings") ? (
          <Configuration signalRProps={signalRProps} rtspProps={rtspProps} />
        ) : null}
      </RightSection>
      <div className="main-page">
        <div className="pg-container">
          <LiveFeedStatusComponent
            signalRProps={signalRProps}
            setSelectedView={setSelectedView}
            isImage={isImage}
            isRtsp={isRtsp}
            showToggle
          />
          <div className="overview-page">
            {vehicle?.getVehicleByRegNumber?.isSuccessful || isRtsp ? (
              <MainView
                vehicle={vehicle}
                mediaUrl={mediaUrl}
                camera={camera!}
                flags={flags!}
                isImage={isImage}
                isRtsp={isRtsp}
              />
            ) : (
              <div className="no-video-selected-section">
                {vehicle?.getVehicleByRegNumberLoading ? (
                  <>Loading...</>
                ) : (
                  <>
                    <VideoSVG />
                    <p style={{ color: "#E21B1B" }}>NO VIDEO STREAM</p>
                    <p>Select Live feed to watch</p>
                  </>
                )}
              </div>
            )}
            <div className="stream-section">
              <LiveFeedComponent
                handleFeedRequest={handleFeedRequest}
                handleHitRequest={handleHitRequest}
                signalRProps={signalRProps}
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

const MediaRTSPToggle = ({
  isImage,
  isRtsp,
  setSelectedView,
}: {
  isImage: boolean
  isRtsp: boolean
  setSelectedView: (value: React.SetStateAction<number>) => void
}) => {
  return (
    <div className="video-section-header-tab">
      <p className={isImage ? "active" : ""} onClick={() => setSelectedView(0)}>
        SIGNAL R
      </p>
      <p className={isRtsp ? "active" : ""} onClick={() => setSelectedView(1)}>
        RTSP FEED
      </p>
    </div>
  )
}

const MainView = ({
  vehicle,
  mediaUrl,
  camera,
  flags,
  isImage,
  isRtsp,
}: {
  vehicle: IVehicleReducer | undefined
  mediaUrl: string
  camera: string
  flags: string[]
  isImage: boolean
  isRtsp: boolean
}) => {
  const [tab, setTab] = useState<string>(tabEnum.VEHICLEINFO)

  const vehicleData = vehicle?.getVehicleByRegNumber?.data

  const [isMedia, setIsMedia] = useState<boolean>(false)

  const carTags = [
    {
      title: "VIOLATIONS",
      status: vehicleData?.hasViolation,
      class: "danger",
    },
    {
      title: "WARNINGS",
      status: vehicleData?.hasWarning,
      class: "warning",
    },
    {
      title: "IS ANONYMOUS",
      status: vehicleData?.isAnonymous,
      class: "",
    },
    {
      title: "IS STOLEN",
      status: vehicleData?.isStolen,
      class: "",
    },
    {
      title: "MIS MATCH",
      status: vehicleData?.hasMisMatch,
      class: "danger",
    },
  ]

  const vehicleNotes = vehicle?.getVehicleByRegNumber?.data?.notes

  return (
    <div className="video-section">
      <div className="video-cta-title start">
        <div className="vehicle-init-props">
          {carTags.map((i, index) => (
            <p
              className={`p-btn-status ${i.class} ${
                i.status ? "" : "hide-btn"
              } no-btn`}
              key={index}
            >
              {i.title}
            </p>
          ))}
        </div>
        {isImage ? (
          <p onClick={() => setIsMedia(!isMedia)} className="p-btn-status">
            {!isMedia ? "Show" : "Hide"} Media
          </p>
        ) : null}
      </div>
      <div className="video-container">
        <div className={`media-box ${isRtsp ? "" : "hide"}`}>
          <Stream />
        </div>
        <div className={`media-box ${isImage ? "" : "hide"}`}>
          <img src={mediaUrl} alt="media" />
        </div>
      </div>
      {isImage ? (
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
              <div>
                <CarFlags flags={flags} />
                <CarNotes
                  notes={vehicleNotes}
                  setTab={setTab}
                  isViewAll
                  title="Note"
                />
                <VehicleInfoSection vehicleData={vehicleData} />
              </div>
            ) : null}
            {tab === tabEnum.OFFENSES ? (
              <VehicleOffensesSection vehicleData={vehicleData} />
            ) : null}
            {tab === tabEnum.OWNERINFO ? (
              <VehicleOwnerInfoSection vehicleData={vehicleData} />
            ) : null}
            {tab === tabEnum.SOT ? (
              <VehicleSOTSection vehicleData={vehicleData} />
            ) : null}
            {tab === tabEnum.INSTANCE ? (
              <VehicleInstanceSection vehicleData={vehicleData} />
            ) : null}
            {tab === tabEnum.NOTES ? (
              <CarNotes
                notes={vehicleNotes}
                title="All Notes"
                setTab={setTab}
                isViewAll={false}
              />
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  )
}

const LiveFeedStatusComponent = ({
  signalRProps,
  title,
  setSelectedView,
  isImage,
  isRtsp,
  showToggle,
}: {
  signalRProps: IUS
  title?: string
  setSelectedView?: (value: React.SetStateAction<number>) => void
  isImage?: boolean
  isRtsp?: boolean
  showToggle?: boolean
}) => {
  const isConnect = signalRProps.connectionStatus === "closed"

  return (
    <div className="live-feed-component">
      <div className="live-feed-header-section">
        <p className="lf-header">{title || "LIVE FEED"}</p>
        <p
          className={`lf-status ${signalRProps.connectionStatus}`}
          onClick={() => {
            if (isConnect) signalRProps.startConnection("")
          }}
        >
          <span className={`lf-status-bop ${signalRProps.connectionStatus}`} />
          {signalRProps.connectionStatus}
        </p>
      </div>
      {showToggle ? (
        <MediaRTSPToggle
          isImage={isImage!}
          isRtsp={isRtsp!}
          setSelectedView={setSelectedView!}
        />
      ) : null}
    </div>
  )
}

const LiveFeedComponent = ({
  signalRProps,
  handleHitRequest,
  handleFeedRequest,
}: {
  handleHitRequest: (i: IHit) => void
  handleFeedRequest: (i: IFeed) => void
  signalRProps: IUS
}) => {
  const filters = [`Hits`, `All Feeds`]
  const useFilterProps = useFilterSection(filters[0])

  const isFeed = useFilterProps.selectedFilter === filters[1]
  const isHit = useFilterProps.selectedFilter === filters[0]

  return (
    <div className="live-feed-component">
      <LiveFeedFilterSection filterProps={useFilterProps} filters={filters} />
      <div className="live-feed-component-wrapper">
        {isFeed ? (
          <>
            {signalRProps.feeds[0] ? (
              signalRProps.feeds.map((i) => (
                <LiveFeedItemComponent
                  key={i.regNumber}
                  carColor={i.colour}
                  carMake={i.make || "..."}
                  carType={i.model || "..."}
                  imgSrc={getFilePath(i.filePath)}
                  offense={i.flags?.[0] ? i.flags?.length + "" : "0"}
                  regNumber={i.regNumber}
                  handleOnClick={() => {
                    handleFeedRequest(i)
                  }}
                />
              ))
            ) : (
              <NoFeeds />
            )}
          </>
        ) : null}
        {isHit ? (
          <>
            {signalRProps.hits[0] ? (
              signalRProps.hits.map((i) => (
                <LiveHitItemComponent
                  key={i.regNumber}
                  carColor={i.colour}
                  carMake={i.make || "..."}
                  carModel={i.model || "..."}
                  imgSrc={getFilePath(i.displayUrl)}
                  offense={i.flag?.[0] ? i.flag?.length + "" : "0"}
                  regNumber={i.regNumber}
                  handleOnClick={() => {
                    handleHitRequest(i)
                  }}
                />
              ))
            ) : (
              <NoFeeds />
            )}
          </>
        ) : null}
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

interface ILHIC {
  imgSrc: string
  regNumber: string
  carMake: string
  carModel: string
  carColor: string
  offense: string
  handleOnClick?: () => void
}

const LiveHitItemComponent: FC<ILHIC> = (props) => {
  return (
    <div className="live-feed-item-component" onClick={props.handleOnClick}>
      <div className="lf-media-section">
        <img src={props.imgSrc} alt="" />
      </div>
      <div className="lf-info-section">
        <p className="lf-info-section-label">Reg Number</p>
        <p className="lf-info-section-value lf-reg-number">{props.regNumber}</p>
        <p className="lf-info-section-label">Make & Model</p>
        <div className="lf-make-type">
          {props.carColor ? (
            <div
              className={`lf-color ${
                props.carColor === "white" ? "border" : ""
              }`}
              style={{ background: props.carColor }}
              title={props.carColor}
            />
          ) : null}
          <p className="lf-info-section-value" title={props.carMake}>
            {props.carMake}
          </p>
          <div className="lf-text-separator" />
          <p className="lf-info-section-value" title={props.carModel}>
            {props.carModel}
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
          {props.carColor ? (
            <div
              className={`lf-color ${
                props.carColor === "white" ? "border" : ""
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

interface IVIS {
  vehicleData: IVehicle | undefined
}

const getStatus = (val?: boolean) => {
  if (val) return "Valid"
  return "Expired"
}

const getDate = (val: string) => {
  return new Date(val).toDateString()
}

const VehicleInfoSection: FC<IVIS> = ({ vehicleData }) => {
  const sot = vehicleData?.sotDetails?.[0]
  return (
    <div className="vehicle-info-section" style={{ marginTop: "40px" }}>
      <VehicleInfoSectionItem
        label="License"
        value={getDate(sot?.service?.license?.expiryDate || "")}
        status={sot?.service?.license?.isActive}
      />
      <VehicleInfoSectionItem
        label="Insurance"
        value={getDate(vehicleData?.vehicleInsurance?.expiryDate || "")}
        status={vehicleData?.vehicleInsurance?.isValid}
      />
      <VehicleInfoSectionItem
        label="Road Worthiness"
        value={getDate(sot?.service?.roadWorthiness?.expiryDate || "")}
        status={sot?.service?.roadWorthiness?.isActive}
      />
      <VehicleInfoSectionItem
        label="Vehicle Reg Number"
        value={vehicleData?.regNumber}
      />
      <VehicleInfoSectionItem label="Code" value={vehicleData?.code} />
      {/* <VehicleInfoSectionItem
        label="Classification"
        value={vehicleData?.classification}
      /> */}
      {/* <VehicleInfoSectionItem
        label="Chasis Number"
        value={vehicleData?.chassisNumber}
      /> */}
      <VehicleInfoSectionItem label="Vehicle Type" value={vehicleData?.code} />
      <VehicleInfoSectionColorItem
        label="Vehicle Color"
        value={vehicleData?.color}
      />
      {/* <VehicleInfoSectionItem
        label="Engine Number"
        value={vehicleData?.engineNumber}
      /> */}
      <VehicleInfoSectionItem label="Vehicle Make" value={vehicleData?.make} />
      <VehicleInfoSectionItem
        label="Vehicle Model"
        value={vehicleData?.model}
      />
    </div>
  )
}

const VehicleOffensesSection: FC<IVIS> = ({ vehicleData }) => {
  const [vehicleOffenseItem, setVehicleOffenseItem] =
    useState<IVehicleOffense | null>(null)

  const tableData = vehicleData?.vehicleOffenses?.map((i, index) => ({
    id: index + "",
    row: [
      {
        value: i.offense.name,
        isLink: false,
        url: "",
        action: () => {
          setVehicleOffenseItem(i)
        },
      },
      {
        value: new Date(i.createdAt).toDateString(),
        isLink: false,
        url: "",
        action: () => {},
      },
      {
        value: i.offense.fineAmount,
        isLink: false,
        url: "",
        action: () => {},
      },
      {
        value: i.offense.code,
        isLink: false,
        url: "",
        action: () => {},
      },
    ],
    rowActions: [
      {
        value: "View",
        isLink: true,
        url: "",
        action: () => {
          setVehicleOffenseItem(i)
        },
        buttonType: "bold",
      },
    ],
  })) as ITableRecord[]

  const handlePrev = () => {
    setVehicleOffenseItem(null)
  }

  return (
    <div className="table-container-section">
      {vehicleOffenseItem ? (
        <VehicleOffenseItem
          vehicleOffense={vehicleOffenseItem}
          handlePrev={handlePrev}
        />
      ) : (
        <TableSection
          header={["Title", "Date", "Fine", "Code", "Action"]}
          record={tableData}
        />
      )}
    </div>
  )
}

const VehicleInstanceSection: FC<IVIS> = ({ vehicleData }) => {
  const tableData = vehicleData?.instances?.map((i, index) => ({
    id: index + "",
    row: [
      {
        value: i.camera,
        isLink: false,
        url: "",
        action: () => {},
      },
      {
        value: new Date(i.createdAt).toDateString(),
        isLink: false,
        url: "",
        action: () => {},
      },
    ],
    rowActions: [
      {
        value: "View",
        isLink: true,
        url: "",
        action: () => {},
        buttonType: "bold",
      },
    ],
  })) as ITableRecord[]

  return (
    <div className="table-container-section">
      <TableSection header={["Camera", "Date", "Action"]} record={tableData} />
    </div>
  )
}

const VehicleSOTSection: FC<IVIS> = ({ vehicleData }) => {
  const [vehicleSOTItem, setVehicleSOTItem] = useState<ISOTDetails | null>(null)

  const tableData = vehicleData?.sotDetails?.map((i, index) => ({
    id: index + "",
    row: [
      {
        value: i.owner.fullName,
        isLink: false,
        url: "",
        action: () => {},
      },
      {
        value: i.regNumber,
        isLink: false,
        url: "",
        action: () => {},
      },
      {
        value: i.make,
        isLink: false,
        url: "",
        action: () => {},
      },
      {
        value: i.model,
        isLink: false,
        url: "",
        action: () => {},
      },
    ],
    rowActions: [
      {
        value: "View",
        isLink: true,
        url: "",
        action: () => {
          setVehicleSOTItem(i)
        },
        buttonType: "bold",
      },
    ],
  })) as ITableRecord[]

  const handlePrev = () => {
    setVehicleSOTItem(null)
  }

  return (
    <div className="table-container-section">
      {vehicleSOTItem ? (
        <VehicleSOTItem sot={vehicleSOTItem} handlePrev={handlePrev} />
      ) : (
        <TableSection
          header={["Owner", "Reg Number", "Make", "Model", "Action"]}
          record={tableData}
        />
      )}
    </div>
  )
}

const VehicleOwnerInfoSection: FC<IVIS> = ({ vehicleData }) => {
  return (
    <div className="vehicle-info-section">
      <VehicleInfoSectionItem
        label="Full Name"
        value={vehicleData?.currentOwner?.fullName}
      />
      <VehicleInfoSectionItem
        label="Address"
        value={vehicleData?.currentOwner?.address}
      />
      <VehicleInfoSectionItem
        label="Email"
        value={vehicleData?.currentOwner?.email}
      />
      <VehicleInfoSectionItem
        label="Phone"
        value={vehicleData?.currentOwner?.phone}
      />
    </div>
  )
}

const CarNotes = ({
  notes,
  setTab,
  isViewAll,
  title,
}: {
  notes: IVehicleNote[] | undefined | null
  setTab: React.Dispatch<React.SetStateAction<string>>
  isViewAll: boolean
  title: string
}) => {
  if (!notes?.[0])
    return (
      // <div className="no-flags">
      //   <NoteSVG color="#f56e9d" />
      //   <p>No Notes</p>
      // </div>
      <></>
    )

  return (
    <div className="vehicle-car-flags-container">
      <div className="no-flags">
        <NoteSVG color="#f56e9d" />
        <p>{title}</p>
        {isViewAll ? (
          <p className="view-all-notes" onClick={() => setTab(tabEnum.NOTES)}>
            View all
          </p>
        ) : null}
      </div>
      {notes?.map((i, index) => (
        <div className="vehicle-car-notes" key={index}>
          <p className="author">
            {i.createdBy.userName}&nbsp;&nbsp;&nbsp;
            <span className="date-authored">
              {new Date(i.createdAt).toDateString()}
            </span>
          </p>
          <p>{i.message}</p>
        </div>
      ))}
    </div>
  )
}

const CarFlags = ({ flags }: { flags: string[] }) => {
  if (!flags?.[0])
    return (
      // <div className="no-flags mb-4 pb-1">
      //   <FlagSVG color="#f56e9d" />
      //   <p>No Flags</p>
      // </div>
      <></>
    )

  return (
    <div className="vehicle-car-flags-container">
      <div className="no-flags">
        <FlagSVG color="#f56e9d" />
        <p>Flags ({flags?.length})</p>
      </div>
      <div className="vehicle-car-flags">
        {flags.map((i, index) => (
          <div key={index} className="vehicle-car-flag-item">
            <p>{i}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

const VehicleSOTItem = ({
  sot,
  handlePrev,
}: {
  sot: ISOTDetails | null
  handlePrev: () => void
}) => {
  const accordionProps = useAccordion()

  const accordionData = ["Vehicle Owner", "Vehicle Info", "Vehicle License"]
  return (
    <div>
      <div className="vehicle-cta-back">
        <TypeSmallButton title="Go back" onClick={handlePrev} />
      </div>
      <Accordion data={accordionData} accordionProps={accordionProps}>
        <Switch>
          <Case condition={accordionProps.isAccordion(accordionData[0])}>
            <div className="vehicle-info-section">
              <VehicleInfoSectionItem
                label="Owner"
                value={sot?.owner?.fullName}
              />
              <VehicleInfoSectionItem
                label="Address"
                value={sot?.owner?.address}
              />
              <VehicleInfoSectionItem label="Email" value={sot?.owner?.email} />
              <VehicleInfoSectionItem label="Phone" value={sot?.owner?.phone} />
            </div>
          </Case>
          <Case condition={accordionProps.isAccordion(accordionData[1])}>
            <div className="vehicle-info-section">
              <VehicleInfoSectionItem
                label="Reg Number"
                value={sot?.regNumber}
              />
              <VehicleInfoSectionItem
                label="Chassis Number"
                value={sot?.chassisNumber}
              />
              <VehicleInfoSectionItem
                label="Engine Number"
                value={sot?.engineNumber}
              />
              <VehicleInfoSectionColorItem label="Color" value={sot?.colour} />
              <VehicleInfoSectionItem label="Make" value={sot?.make} />
              <VehicleInfoSectionItem label="Model" value={sot?.model} />
              <VehicleInfoSectionItem
                label="Registration Date"
                value={sot?.registrationDate}
              />
              <VehicleInfoSectionItem
                label="Transaction ID"
                value={sot?.transactionId}
              />
              <VehicleInfoSectionItem
                label="Transaction ID"
                value={sot?.state}
              />
              <VehicleInfoSectionItem label="Year" value={sot?.year} />
            </div>
          </Case>
          <Case condition={accordionProps.isAccordion(accordionData[2])}>
            {/* <div className="vehicle-info-section">
              <VehicleInfoSectionItem
                label="Inspection"
                value={sot?.service.inspection || ""}
              />
              <VehicleInfoSectionItem
                label="License Expiry Date"
                value={sot?.service.license.expiryDate || ""}
              />
              <VehicleInfoSectionItem
                label="License Active"
                value={sot?.service.license.isActive ? "True" : "False"}
              />
              <VehicleInfoSectionItem
                label="Road Worthiness Expiry Date"
                value={sot?.service?.roadWorthiness?.expiryDate}
              />
              <VehicleInfoSectionItem
                label="Road Worthiness Active"
                value={
                  sot?.service?.roadWorthiness?.isActive ? "True" : "False"
                }
              />
            </div> */}
          </Case>
        </Switch>
      </Accordion>
    </div>
  )
}

const VehicleOffenseItem = ({
  vehicleOffense,
  handlePrev,
}: {
  vehicleOffense: IVehicleOffense | null
  handlePrev: () => void
}) => {
  return (
    <div>
      <div className="vehicle-cta-back">
        <TypeSmallButton title="Go back" onClick={handlePrev} />
      </div>
      <div className="vehicle-info-section">
        <VehicleInfoSectionItem
          label="Title"
          value={vehicleOffense?.offense?.name}
        />
        <VehicleInfoSectionItem
          label="Description"
          value={vehicleOffense?.offense?.description}
        />
        <VehicleInfoSectionItem
          label="Fine"
          value={vehicleOffense?.offense?.fineAmount?.toLocaleString()}
        />
        <VehicleInfoSectionItem
          label="Point"
          value={vehicleOffense?.offense?.finePoint?.toString()}
        />
        <VehicleInfoSectionItem
          label="Code"
          value={vehicleOffense?.offense?.code}
        />
        <VehicleInfoSectionItem
          label="Additional"
          value={vehicleOffense?.offense?.additional || "None"}
        />
        <VehicleInfoSectionItem
          label="Status"
          value={vehicleOffense?.status?.name || "..."}
        />
        <VehicleInfoSectionItem
          label="Device"
          value={vehicleOffense?.devise?.name}
        />
        <VehicleInfoSectionItem
          label="Longitude"
          value={vehicleOffense?.longitude}
        />
        <VehicleInfoSectionItem
          label="Latitude"
          value={vehicleOffense?.latitude}
        />
        <VehicleInfoSectionItem
          label="Address"
          value={vehicleOffense?.address}
        />
        <VehicleInfoSectionItem
          label="User"
          value={vehicleOffense?.user?.userName}
        />
      </div>
    </div>
  )
}

const VehicleInfoSectionItem = ({
  label,
  value,
  status,
}: {
  label: string
  value: string | undefined
  status?: boolean
}) => {
  const isStatus = typeof status !== "undefined"
  return (
    <div className="vehicle-info-section-item">
      <p className="vehicle-info-label">{label}</p>
      <div className="vehicle-row-item">
        <p
          className={`vehicle-info-value overflow ${
            label.includes("Reg") ? "reg-number" : ""
          } ${isStatus ? "status-text" : ""}`}
        >
          {value || "..."}
        </p>
        {isStatus ? (
          <p className={`p-btn-status no-btn ${status ? "success" : "danger"}`}>
            {getStatus(status || false)}
          </p>
        ) : null}
      </div>
    </div>
  )
}

const VehicleInfoSectionColorItem = ({
  label,
  value,
}: {
  label: string
  value: string | undefined
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
  signalRProps,
  rtspProps,
}: {
  signalRProps: IUS
  rtspProps: IUSIO
  rsProps?: IRightSection<{}>
}) => {
  const tabEnums = { FEED: "Feed", RTSP: "RTSP" }

  const [tab, setTab] = useState<string>(tabEnums.FEED)

  return (
    <div>
      <LiveFeedStatusComponent signalRProps={signalRProps} title="Status" />
      <div style={{ paddingBottom: "20px" }} />
      <div className="tab-section">
        <div className="tab-header">
          {Object.values(tabEnums).map((i, index) => (
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
          {tab === tabEnums.FEED ? (
            <FeedForm signalRProps={signalRProps} />
          ) : null}
          {tab === tabEnums.RTSP ? <RTSPForm rtspProps={rtspProps} /> : null}
        </div>
      </div>
    </div>
  )
}

const RTSPForm = ({ rtspProps }: { rtspProps: IUSIO }) => {
  const [hookForm] = useFormHook<{ rtspUrl: string }>({
    rtspUrl: yup.string().required("rstp url is required"),
  })

  useEffect(() => {
    const rtspUrl = getUrl("rtspUrl")
    if (!!rtspUrl) {
      hookForm.setValue("rtspUrl", rtspUrl)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const btnTitle =
    rtspProps.streamStatus === "started" && !!hookForm.watch("rtspUrl")
      ? "Refresh RTSP Feed"
      : "Request RTSP Feed"

  const handleRTSPFeed = (data: { rtspUrl: string }) => {
    if (hookForm.watch("rtspUrl")) {
      rtspProps.sendRTSPURL(data.rtspUrl)
      setUrl("rtspUrl", data.rtspUrl)
    }
  }

  const resetRTSPFeed = () => {
    rtspProps.stopRTSPFeed()
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <TypeInput
        placeholder="Enter url"
        label="RTSP URL"
        {...hookForm.register("rtspUrl")}
        error={hookForm.formState.errors.rtspUrl?.message}
      />
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <TypeButton
          title={btnTitle}
          onClick={hookForm.handleSubmit(handleRTSPFeed)}
          load={rtspProps.streamStatus === "loading"}
        />
        <TypeButton
          title="Stop RTSP Feed"
          onClick={resetRTSPFeed}
          buttonType={rtspProps.streamStatus === null ? "disabled" : "outlined"}
        />
      </div>
    </form>
  )
}

interface IFeedFormHK {
  connectionUrl: string
  filePath: string
}

const FeedForm = ({ signalRProps }: { signalRProps: IUS }) => {
  const [hookForm] = useFormHook<IFeedFormHK>({
    connectionUrl: yup.string().required("connection url is required"),
    filePath: yup.string().required("file path is required"),
  })

  useEffect(() => {
    const storedData = getUrl("connectionUrl")
    if (!!storedData) {
      hookForm.setValue("connectionUrl", storedData)
    }
    const filePath = getUrl("filePath")
    if (!!filePath) {
      hookForm.setValue("filePath", filePath)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const btnTitle =
    signalRProps.connectionStatus === "connected" &&
    !!hookForm.watch().connectionUrl
      ? "Refresh Feed"
      : "Request Feed"

  const handleSubmit = (data: IFeedFormHK) => {
    signalRProps.startConnection(data.connectionUrl)
    setUrls(data)
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <TypeInput
        placeholder="Enter url"
        label="Connection URL"
        {...hookForm.register("connectionUrl")}
        error={hookForm.formState.errors.connectionUrl?.message}
      />
      <TypeInput
        placeholder="Enter url"
        label="File Path"
        {...hookForm.register("filePath")}
        error={hookForm.formState.errors.filePath?.message}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <TypeButton
          title={btnTitle}
          onClick={hookForm.handleSubmit(handleSubmit)}
        />
      </div>
    </form>
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

const TableSection = ({
  header,
  record,
  handlePagination,
}: {
  header: string[]
  record: Array<{
    id: string
    row: ICell[]
    rowActions: ICellAction[]
  }>
  handlePagination?: (selectedItem: { selected: number }) => void
}) => {
  const isPagination = typeof handlePagination === "function"
  return (
    <div>
      <div className="table-section">
        <Table header={header} record={record} hideCheck hideNumbering />
      </div>
      {isPagination && (
        <div className="pagination-container">
          <ReactPaginate
            breakLabel="..."
            previousLabel="<<"
            nextLabel=">>"
            pageCount={1}
            onPageChange={handlePagination}
            containerClassName={"pagination"}
            activeClassName={"active"}
            renderOnZeroPageCount={undefined}
            forcePage={1}
          />
        </div>
      )}
    </div>
  )
}
