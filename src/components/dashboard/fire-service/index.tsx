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
  useRightSection,
} from "components/reusable/right-section"
import { IStates } from "interfaces/IReducer"
import { TypeInput } from "utils/new/input"
import { TypeButton, TypeSmallButton } from "utils/new/button"
import { useFormHook } from "utils/new/hook"
import * as yup from "yup"
import { IPoliceData } from "interfaces/IPolice"
import { Calendar2SVG, LocationSVG } from "utils/new/svgs"
import "./index.scss"

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
    connection?.on("SendFireEmergencyNotification", (data: any) => {
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

const IFireServicePage: React.FC<IProps> = ({ states, ...props }) => {
  const rightSectionProps = states?.global.rightSection
  const rsProps = useRightSection()

  useEffect(() => {
    if (rightSectionProps?.action) {
      rsProps.callSection(rightSectionProps.action, rightSectionProps.component)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rightSectionProps])

  const signalRProps = useSignalR()

  // console.log(signalRProps.feeds.length, "juju")

  // useEffect(() => {
  //   setTimeout(() => {
  //     signalRProps.handleDemoFeeds(signalRProps.feeds)
  //   }, 5000)
  // }, [signalRProps.feeds])

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
            <MainView feed={signalRProps.feed!} />
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

export default IFireServicePage

const Configuration = ({ policeSignalR }: { policeSignalR: IPHUS }) => {
  return (
    <div>
      {/* <LiveFeedStatusComponent signalRProps={signalRProps} title="Status" /> */}
      <div style={{ paddingBottom: "20px" }} />
      <div className="tab-section">
        <div className="tab-body">
          <FeedForm policeSignalR={policeSignalR} />
        </div>
      </div>
    </div>
  )
}

const FeedForm = ({ policeSignalR }: { policeSignalR: IPHUS }) => {
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
          <IframeComponent src={feed?.map || ""} />
        </div>
      </div>
      {feed !== null ? (
        <>
          <div
            style={{
              textAlign: "right",
              marginBottom: "15px",
              display: "flex",
              alignItems: "center",
              borderBottom: "1px solid #eaeaea",
              paddingBottom: "15px",
              gap: "10px",
            }}
          >
            <Calendar2SVG />
            <p style={{ margin: 0, marginTop: "2px" }}>
              {feed?.createdAt
                ? new Date(feed?.createdAt).toDateString()
                : "..."}
            </p>
            <div
              style={{
                marginLeft: "auto",
                width: "max-content",
                display: "flex",
                alignItems: "center",
                gap: "15px",
              }}
            >
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

export const IframeComponent = ({ src }: { src: string }) => {
  return (
    <div>
      <iframe
        src={src || ""}
        title="e-police"
        style={{ width: "100%", border: "1px solid #eaeaea", height: "408px" }}
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
      ></iframe>
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

const demoData = {
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
