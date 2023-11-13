import React, { useEffect, useState } from "react"
import {
  NoFeeds,
  getConnection,
  getUrl,
  setUrl,
  typeConnectionStatus,
} from "../traffic"
import { handleDataStream } from "../traffic/data"
import RightSection, {
  IRightSection,
  useRightSection,
} from "components/reusable/right-section"
import { IStates } from "interfaces/IReducer"
import { TypeInput } from "utils/new/input"
import { TypeButton, TypeSmallButton } from "utils/new/button"
import {
  IUseImage,
  handleFullScreen,
  useFormHook,
  useImage,
} from "utils/new/hook"
import * as yup from "yup"
import { IPoliceData } from "interfaces/IPolice"
import {
  Calendar2SVG,
  LeftNavSVG,
  LocationSVG,
  MapSVG,
  PhoneSVG,
  PulseSVG,
  RightNavSVG,
  VideoSVG,
} from "utils/new/svgs"
import "./index.scss"
import { IAction } from "interfaces/IAction"

interface IPHUS {
  feeds: IPoliceData[]
  connectionStatus: typeConnectionStatus
  startConnection: (url: string) => void
  stopConnection: () => void
  handleFeedSelect: (feed: IPoliceData | null) => void
  feed: IPoliceData | null
  handleDemoFeeds: (feeds: IPoliceData[]) => void
}

const useSignalR = (): IPHUS => {
  const [connection, setConnection] = useState<signalR.HubConnection>()
  const [feeds, setFeeds] = useState<IPoliceData[]>([])
  const [feed, setFeed] = useState<IPoliceData | null>(null)
  const [connectionStatus, setConnectionStatus] =
    useState<typeConnectionStatus>("closed")

  const handleFeedSelect = (feed: IPoliceData | null) => {
    setFeed(feed)
  }

  const startConnection = (url: string) => {
    setConnectionStatus("connecting")
    const storedUrl = getUrl("policeSignalR") || ""
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

  const stopConnection = () => {
    connection?.stop().then(() => {
      setConnectionStatus("closed")
    })
  }

  const hit = new Audio(require("../../../extras/audio/hit.mp3"))
  const playHit = () => {
    hit.play()
  }

  const mapDataArray = (i: any) => {
    return ""
  }

  const handleDemoFeeds = (feeds: IPoliceData[]) => {
    setFeeds([
      ...handleDataStream(
        feeds,
        mapDataArray,
        "id"
      )({ ...demoData, id: demoData.id + Date.now() } as IPoliceData),
    ])
  }

  useEffect(() => {
    connection?.on("SendPoliceEmergencyNotification", (data: any) => {
      console.log(data, "juju")
      playHit()
      setFeeds([...handleDataStream(feeds, mapDataArray, "")(data)])
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
    feeds,
    connectionStatus,
    startConnection,
    stopConnection,
    handleFeedSelect,
    feed,
    handleDemoFeeds,
  }
}

interface IProps {
  states: IStates
}

const IPolicePage: React.FC<IProps> = ({ states, ...props }) => {
  const rightSectionProps = states?.global.rightSection
  const actions = props as unknown as IAction
  const rsProps = useRightSection(rightSectionProps, actions.callRightSection)

  const signalRProps = useSignalR()

  console.log(!!signalRProps.feeds?.[0], "juju")

  return (
    <>
      <RightSection rsProps={rsProps}>
        {rsProps.isView("custom", "settings") ? (
          <Configuration policeSignalR={signalRProps} />
        ) : null}
      </RightSection>
      <div className="main-page">
        <div className="pg-container">
          <LiveFeedStatusComponent signalRProps={signalRProps} />
          <div className="overview-page">
            {signalRProps?.feeds?.[0] ? (
              <MainView feed={signalRProps.feed!} />
            ) : (
              <div className="no-video-selected-section">
                <MapSVG />
                <p style={{ color: "#E21B1B" }}>NO MAP VIEW</p>
                <p>Select Live feed to view</p>
              </div>
            )}
            <div className="police-stream-section">
              {signalRProps.feeds?.[0] ? (
                signalRProps.feeds.map((i, index) => (
                  <LiveFeedItemComponent
                    key={Date.now() + index}
                    feed={i}
                    handleOnClick={() => {
                      signalRProps.handleFeedSelect(i)
                    }}
                  />
                ))
              ) : (
                <NoFeeds />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default IPolicePage

const Configuration = ({
  policeSignalR,
  rsProps,
}: {
  policeSignalR: IPHUS
  rsProps?: IRightSection<{}>
}) => {
  return (
    <div>
      {/* <LiveFeedStatusComponent signalRProps={signalRProps} title="Status" /> */}
      <div style={{ paddingBottom: "20px" }} />
      <div className="tab-section">
        <div className="tab-body">
          <FeedForm policeSignalR={policeSignalR} rsProps={rsProps} />
        </div>
      </div>
    </div>
  )
}

const FeedForm = ({
  policeSignalR,
  rsProps,
}: {
  policeSignalR: IPHUS
  rsProps?: IRightSection<{}>
}) => {
  const [hookForm] = useFormHook<{ policeSignalR: string }>({
    policeSignalR: yup.string().required("connection url is required"),
  })

  useEffect(() => {
    const rtspUrl = getUrl("policeSignalR")
    if (!!rtspUrl) {
      hookForm.setValue("policeSignalR", rtspUrl)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (policeSignalR.connectionStatus === "connected") {
      rsProps?.closeSection()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [policeSignalR.connectionStatus])

  const btnTitle =
    policeSignalR.connectionStatus === "connected" &&
    !!hookForm.watch("policeSignalR")
      ? "Refresh Feed"
      : "Request Feed"

  const handleRTSPFeed = (data: { policeSignalR: string }) => {
    policeSignalR.startConnection(data.policeSignalR)
    setUrl("policeSignalR", data.policeSignalR)
  }

  const resetRTSPFeed = () => {
    policeSignalR.stopConnection()
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <TypeInput
        placeholder="Enter url"
        label="Connection URL"
        {...hookForm.register("policeSignalR")}
        error={hookForm.formState.errors.policeSignalR?.message}
      />
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <TypeButton
          title={btnTitle}
          onClick={hookForm.handleSubmit(handleRTSPFeed)}
          load={policeSignalR.connectionStatus === "connecting"}
        />
        <TypeButton
          title="Stop Feed"
          onClick={resetRTSPFeed}
          buttonType={
            policeSignalR.connectionStatus === null ? "disabled" : "outlined"
          }
        />
      </div>
    </form>
  )
}

const LiveFeedStatusComponent = ({
  signalRProps,
  title,
}: {
  signalRProps: IPHUS
  title?: string
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
    </div>
  )
}

const MainView = ({ feed }: { feed: IPoliceData | null }) => {
  // const [isMedia, setIsMedia] = useState<boolean>(true)

  const [fileIndex, setFileIndex] = useState<number>(0)

  const handleFileIndex = (nav: "left" | "right") => {
    if (nav === "left") setFileIndex(Math.max(0, fileIndex - 1))
    if (nav === "right")
      setFileIndex(Math.min((feed?.mediaFiles?.length || 1) - 1, fileIndex + 1))
  }

  const imgProps = useImage()

  return (
    <div className="map-section">
      {/* <div className="video-cta-title start">
        <p onClick={() => setIsMedia(!isMedia)} className="p-btn-status">
          {!isMedia ? "Show" : "Hide"} Map
        </p>
      </div> */}
      <div className="video-container">
        {/* <div className={`media-box ${isMedia ? "" : "hide"}`}> */}
        <div className={`media-box`}>
          {/* <Map src={feed?.map || ""} /> */}
          <Media
            files={feed?.mediaFiles}
            fileIndex={fileIndex}
            handleFileIndex={handleFileIndex}
            imgProps={imgProps}
          />
        </div>
      </div>
      <div className="media-nav-count">
        <p>
          {fileIndex + 1} of {feed?.mediaFiles.length || "..."}
        </p>
        <div className="loader-box">
          {!imgProps.isLoaded && !imgProps.isError && <PulseSVG />}
        </div>
      </div>
      {feed !== null ? (
        <>
          <div className="header-info-prop">
            <div className="icon-txt">
              <Calendar2SVG />
              <p>
                {feed?.createdAt
                  ? new Date(feed?.createdAt).toDateString()
                  : "..."}
              </p>
            </div>
            <div className="icon-txt">
              <PhoneSVG />
              <p>no phone</p>
            </div>
            {/* <p>
              {feed?.canBeContacted}
            </p> */}
            <div
              style={{
                marginLeft: "auto",
                width: "max-content",
                display: "flex",
                alignItems: "center",
                gap: "15px",
              }}
            >
              <TypeButton
                title="View Map"
                buttonType="outlined"
                onClick={() => handleFullScreen(feed.map || "")}
              />
              <TypeButton title="Accept" />
            </div>
          </div>
          <div className="vehicle-info-section">
            <VehicleInfoSectionItem
              label="Words"
              value={feed?.words || "..."}
            />
            <VehicleInfoSectionItem
              label="Description"
              value={feed?.description || "..."}
            />
            <VehicleInfoSectionItem
              label="Location"
              value={feed?.city + " | " + feed?.state || "..."}
              values={[feed?.city, feed?.state]}
            />
          </div>
        </>
      ) : null}
    </div>
  )
}

const Map = ({ src }: { src: string }) => {
  return (
    <div>
      <iframe
        src={src || ""}
        title="e-police"
        style={{ width: "100%", border: "none", height: "408px" }}
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
      ></iframe>
    </div>
  )
}

const Media = ({
  files,
  fileIndex,
  handleFileIndex,
  imgProps,
}: {
  files?: string[]
  fileIndex: number
  handleFileIndex: (nav: "left" | "right") => void
  imgProps: IUseImage
}) => {
  const isLeft = fileIndex > 0
  const isRight = fileIndex < (files?.length || 1) - 1

  return (
    <div className="media-container-box">
      {!imgProps.isLoaded && !imgProps.isError && <PulseSVG />}
      <img
        src={files?.[fileIndex] || ""}
        alt=""
        onLoad={imgProps.handleLoad}
        onError={imgProps.handleError}
      />
      <div
        className={`nav-btn nav-left ${isLeft ? "" : "no-click"}`}
        onClick={() => handleFileIndex("left")}
      >
        <LeftNavSVG />
      </div>
      <div
        className={`nav-btn nav-right ${isRight ? "" : "no-click"}`}
        onClick={() => handleFileIndex("right")}
      >
        <RightNavSVG />
      </div>
    </div>
  )
}

const LiveFeedItemComponent = ({
  feed,
  handleOnClick,
}: {
  feed: IPoliceData | null
  handleOnClick: () => void
}) => {
  return (
    <div className="map-feed-item-component" onClick={handleOnClick}>
      <div className="lf-media-section">
        <img src={feed?.mediaFiles?.[0] || ""} alt="" />
      </div>
      <div className="lf-info-section">
        <p className="lf-description">{feed?.description || "..."}</p>

        <div className="lf-location">
          <LocationSVG />
          <div className="lf-location-items">
            <p title={feed?.state || "..."} style={{ margin: "0" }}>
              {feed?.state || "..."}
            </p>
            <div className="lf-text-separator" />
            <p style={{ margin: "0" }} title={feed?.city || "..."}>
              {feed?.city || "..."}
            </p>
          </div>
        </div>
        <TypeSmallButton title="Accept" buttonType="outlined" />
      </div>
    </div>
  )
}

const demoData: IPoliceData = {
  id: "652a885006373b65b68179cf",
  userId: "652a7d4e2a64934395d957af",
  description: "People are running everywhere",
  latitude: "8.955007553100586",
  longitude: "7.371120452880859",
  nearestPlace: "Abuja, FCT",
  city: "Abuja",
  state: " FCT",
  country: "NG",
  map: "https://w3w.co/imaging.retitled.offhandedly",
  words: "imaging.retitled.offhandedly",
  deviceId: "2347035995152",
  mediaFiles: [
    "https://api.twilio.com/2010-04-01/Accounts/AC0747ce633f37d79aa27772c224b198ea/Messages/MM353d8e96d2f0f780d4e3f637caf4f9ab/Media/MEf5435d322dc699871c00e9a0c24890e2",
    "https://api.twilio.com/2010-04-01/Accounts/AC0747ce633f37d79aa27772c224b198ea/Messages/MM1cbabd3f5c4d4ab912f941612cdd8387/Media/ME48898dc3b4f50511683300396faabdd2",
    "https://api.twilio.com/2010-04-01/Accounts/AC0747ce633f37d79aa27772c224b198ea/Messages/MM7e800ccaae92b7d24dc22d4f07dba767/Media/ME4ec7e56c1d099ade42c677d6814ffd94",
  ],
  createdAt: "2023-10-14T13:23:44.7745796+01:00",
  updatedAt: "2023-10-14T13:23:44.7745796+01:00",
  canBeContacted: true,
  referenceId: "652a7d4e2a64934395d957af",
  status: 1,
}

const getStatus = (val?: boolean) => {
  if (val) return "Valid"
  return "Expired"
}

export const VehicleInfoSectionItem = ({
  label,
  value,
  values,
  status,
}: {
  label: string
  value: string | undefined
  values?: Array<string | undefined>
  status?: boolean
}) => {
  const isStatus = typeof status !== "undefined"
  return (
    <div className="vehicle-info-section-item">
      <p className="vehicle-info-label">{label}</p>
      <div className="vehicle-row-item">
        {!values?.length ? (
          <p
            className={`vehicle-info-value overflow ${
              label.includes("Reg") ? "reg-number" : ""
            } ${isStatus ? "status-text" : ""}`}
          >
            {value || "..."}
          </p>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            {values.map((i, index) => (
              <div
                key={index}
                style={{ display: "flex", alignItems: "center", gap: "15px" }}
              >
                <p
                  className={`vehicle-info-value overflow ${
                    label.includes("Reg") ? "reg-number" : ""
                  } ${isStatus ? "status-text" : ""}`}
                >
                  {i || "..."}
                </p>
                {index !== values.length - 1 ? (
                  <div className="lf-text-separator" />
                ) : null}
              </div>
            ))}
          </div>
        )}
        {isStatus ? (
          <p className={`p-btn-status no-btn ${status ? "success" : "danger"}`}>
            {getStatus(status || false)}
          </p>
        ) : null}
      </div>
    </div>
  )
}
