import React, { useEffect, useState } from "react"
import {
  NoFeeds,
  NoMediaComponent,
  chkType,
  getConnection,
  getUrl,
  setUrl,
  typeConnectionStatus,
} from "./traffic"
import { handleDataStream } from "./traffic/data"
import RightSection, {
  IRightSection,
  useRightSection,
} from "components/reusable/right-section"
import {
  IUseImage,
  handleFullScreen,
  useFormHook,
  useImage,
} from "utils/new/hook"
import * as yup from "yup"
import { TypeInput } from "utils/new/input"
import { TypeButton } from "utils/new/button"
import {
  Calendar2SVG,
  LeftNavSVG,
  LocationSVG,
  MapSVG,
  MarkerSVG,
  PhoneSVG,
  PulseSVG,
  RightNavSVG,
} from "utils/new/svgs"
import { GODUSER } from "utils/new/constants/roles"
import { ORGANIZATION } from "utils/new/constants"
import AdminWrapper from "./admin-wrapper"
import { IAction } from "interfaces/IAction"
import { IStates } from "interfaces/IReducer"
import { IReport } from "interfaces/IReport"
import { typeAdminSections } from "./admin-management"
import { trafficReportData } from "./traffic/mock-data"
import { getTime } from "./admin-reports"

export interface IPHUS<T> {
  feeds: T[]
  connectionStatus: typeConnectionStatus
  startConnection: (url: string) => void
  stopConnection: () => void
  handleFeedSelect: (feed: T | null) => void
  feed: T | null
  // handleDemoFeeds: (feeds: T[]) => void
}

export type typeSignalRURL =
  | "SendFireEmergencyNotification"
  | "SendPoliceEmergencyNotification"
  | "SendMedicalEmergencyNotification"

export const useSignalR = <T extends {}>(
  signalKey: typeSignalRURL
): IPHUS<T> => {
  const [connection, setConnection] = useState<signalR.HubConnection>()
  const [feeds, setFeeds] = useState<T[]>([])
  const [feed, setFeed] = useState<T | null>(null)
  const [connectionStatus, setConnectionStatus] =
    useState<typeConnectionStatus>("closed")

  const handleFeedSelect = (feed: T | null) => {
    setFeed(feed)
  }

  const startConnection = (url: string) => {
    const commandURL = getBaseUrl("commandURL")
      ? getBaseUrl("commandURL") + "/notificationHub"
      : ""
    const defaultURL = process.env.REACT_APP_SIGNALR || ""
    setConnectionStatus("connecting")
    const storedUrl = getUrl("globalSignalR") || ""
    if (!commandURL && !url && !storedUrl && !!defaultURL) {
      setConnectionStatus("closed")
      return
    }
    const connection = getConnection(
      commandURL || url || storedUrl || defaultURL
    )
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
    startConnection("")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const stopConnection = () => {
    setConnectionStatus("closed")
    connection?.off(signalKey)
    connection?.stop()
  }

  const hit = new Audio(require("../../extras/audio/hit.mp3"))
  const playHit = () => {
    hit.play()
  }

  const mapDataArray = (i: any) => {
    return ""
  }

  // const handleDemoFeeds = (feeds: T[]) => {
  //   setFeeds([
  //     ...handleDataStream(
  //       feeds,
  //       mapDataArray,
  //       "id"
  //     )({ ...demoData, id: demoData.id + Date.now() } as unknown as T),
  //   ])
  // }

  useEffect(() => {
    // connection?.on("SendPoliceEmergencyNotification", (data: any) => {
    connection?.on(signalKey, (data: any) => {
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
    //   handleDemoFeeds,
  }
}

export const SettingsSection = <T extends {}>({
  signalR,
  urlKey,
  rsProps,
}: {
  signalR: IPHUS<T>
  urlKey: chkType
  rsProps?: IRightSection<{}> | undefined
}) => {
  const tabEnums = {
    PAGE: "Connection",
    URL: "ENV Configuration",
  }

  const [tab, setTab] = useState<string>(tabEnums.PAGE)

  return (
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
        {tab === tabEnums.PAGE ? (
          <FeedForm signalR={signalR} urlKey={urlKey} rsProps={rsProps} />
        ) : null}
        {tab === tabEnums.URL ? <ENVForm /> : null}
      </div>
    </div>
  )
}

export type typeBaseUrls = "commandURL" | "queryURL"

export const getBaseUrl = (type: typeBaseUrls) => {
  const url = localStorage.getItem(type) || ""
  return url
}

const clearBaseUrl = (type: typeBaseUrls) => {
  localStorage.removeItem(type)
}

export const ENVForm = () => {
  const [commandhookForm] = useFormHook<{ commandURL: string }>({
    commandURL: yup.string().required("command url is required"),
  })
  const [queryhookForm] = useFormHook<{ queryURL: string }>({
    queryURL: yup.string().required("query url is required"),
  })

  const saveCommandURL = ({ commandURL }: { commandURL: string }) => {
    localStorage.setItem("commandURL", commandURL.trim())
  }

  const saveQueryURL = ({ queryURL }: { queryURL: string }) => {
    localStorage.setItem("queryURL", queryURL.trim())
  }

  useEffect(() => {
    if (getBaseUrl("commandURL"))
      commandhookForm.setValue("commandURL", getBaseUrl("commandURL"))
    if (getBaseUrl("queryURL"))
      queryhookForm.setValue("queryURL", getBaseUrl("queryURL"))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <TypeInput
          placeholder="Enter url"
          label="Query URL"
          {...queryhookForm.register("queryURL")}
          error={queryhookForm.formState.errors.queryURL?.message}
        />
        <div className="d-flex align-items-center" style={{ gap: "20px" }}>
          <TypeButton
            title="Save"
            onClick={queryhookForm.handleSubmit(saveQueryURL)}
            buttonSize="small"
          />
          <TypeButton
            title="Clear"
            onClick={() => {
              queryhookForm.reset()
              clearBaseUrl("queryURL")
            }}
            buttonSize="small"
            buttonType="outlined"
          />
        </div>
      </form>
      <div className="my-5 separator" />
      <form onSubmit={(e) => e.preventDefault()}>
        <TypeInput
          placeholder="Enter url"
          label="Command URL"
          {...commandhookForm.register("commandURL")}
          error={commandhookForm.formState.errors.commandURL?.message}
        />
        <div className="d-flex align-items-center" style={{ gap: "20px" }}>
          <TypeButton
            title="Save"
            onClick={commandhookForm.handleSubmit(saveCommandURL)}
            buttonSize="small"
          />
          <TypeButton
            title="Clear"
            onClick={() => {
              commandhookForm.reset()
              clearBaseUrl("commandURL")
            }}
            buttonSize="small"
            buttonType="outlined"
          />
        </div>
      </form>
    </>
  )
}

export const FeedForm = <T extends {}>({
  signalR,
  rsProps,
  urlKey,
}: {
  signalR: IPHUS<T>
  rsProps?: IRightSection<{}>
  urlKey: chkType
}) => {
  const [hookForm] = useFormHook<{ signalR: string }>({
    signalR: yup.string().required("connection url is required"),
  })

  useEffect(() => {
    const commandURL = getBaseUrl("commandURL")
      ? getBaseUrl("commandURL") + "/notificationHub"
      : ""
    const rtspUrl = commandURL || getUrl(urlKey)
    if (!!rtspUrl) {
      hookForm.setValue("signalR", rtspUrl)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // useEffect(() => {
  //   if (signalR.connectionStatus === "connected") {
  //     rsProps?.closeSection()
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [signalR.connectionStatus])

  const btnTitle =
    signalR.connectionStatus === "connected" && !!hookForm.watch("signalR")
      ? "Refresh Feed"
      : "Request Feed"

  const handleRTSPFeed = (data: { signalR: string }) => {
    signalR.startConnection(data.signalR)
    setUrl(urlKey, data.signalR)
  }

  const resetRTSPFeed = () => {
    signalR.stopConnection()
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <TypeInput
        placeholder="Enter url"
        label="Connection URL"
        {...hookForm.register("signalR")}
        error={hookForm.formState.errors.signalR?.message}
      />
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <TypeButton
          title={btnTitle}
          onClick={hookForm.handleSubmit(handleRTSPFeed)}
          load={signalR.connectionStatus === "connecting"}
          buttonSize="small"
        />
        <TypeButton
          title="Stop Feed"
          onClick={resetRTSPFeed}
          buttonType={
            signalR.connectionStatus === null ? "disabled" : "outlined"
          }
          buttonSize="small"
        />
      </div>
    </form>
  )
}

export const Configuration = <T extends {}>({
  signalR,
  rsProps,
  urlKey,
}: {
  signalR: IPHUS<T>
  rsProps?: IRightSection<{}>
  urlKey: chkType
}) => {
  return (
    <div>
      <div style={{ paddingBottom: "20px" }} />
      <SettingsSection signalR={signalR} urlKey={urlKey} rsProps={rsProps} />
    </div>
  )
}

export const LiveFeedStatusComponent = <T extends {}>({
  signalRProps,
  title,
}: {
  signalRProps: IPHUS<T>
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

export const Media = ({
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

const getStatus = (val?: boolean) => {
  if (val) return "Valid"
  return "Expired"
}

export const InfoSectionItem = ({
  label,
  value,
  values,
  status,
  icon,
}: {
  label: string
  value: string | undefined
  values?: Array<string | undefined>
  status?: boolean
  icon?: JSX.Element
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
            {icon}
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

export const IframeComponent = ({ src }: { src: string }) => {
  return (
    <div>
      <iframe
        src={src || ""}
        title="firefighter"
        style={{ width: "100%", height: "408px" }}
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
      ></iframe>
    </div>
  )
}

export const PageHeader = ({
  load,
  title,
}: {
  load: boolean
  title: string
}) => {
  return (
    <div className="header-management">
      <h1>
        {title} {!GODUSER ? "(" + ORGANIZATION + ")" : ""}
      </h1>
      {load ? <PulseSVG /> : null}
    </div>
  )
}

export interface IPageComponent {
  actions: IAction
  states: IStates
  section: typeAdminSections
  signalRURL: typeSignalRURL
  organization: "Fire" | "Police" | "Medical"
}

export const PageComponent: React.FC<IPageComponent> = ({
  actions,
  states,
  section,
  signalRURL,
  organization,
}) => {
  const rightSectionProps = states?.global.rightSection
  const rsProps = useRightSection(rightSectionProps, actions.callRightSection)
  const signalRProps = useSignalR<IReport>(signalRURL)

  return (
    <>
      <RightSection rsProps={rsProps}>
        {rsProps.isView("custom", "settings") ? (
          <Configuration signalR={signalRProps} urlKey="globalSignalR" />
        ) : null}
      </RightSection>
      <div className="main-page">
        <div className="pg-container">
          <LiveFeedStatusComponent signalRProps={signalRProps} />
          <AdminWrapper
            section={section}
            data={trafficReportData}
            actions={actions}
            states={states}
            organization={organization}
          >
            <div className="overview-page">
              {signalRProps?.feed ? (
                <MainView feed={signalRProps.feed!} />
              ) : (
                <NoMediaComponent
                  load={false}
                  locationDetails={[
                    {
                      location: {
                        latitude: parseFloat(
                          signalRProps.feed?.latitude || "0"
                        ),
                        longitude: parseFloat(
                          signalRProps.feed?.longitude || "0"
                        ),
                      },
                      map: signalRProps.feed?.map || "",
                      nearestPlace: signalRProps.feed?.nearestPlace || "",
                    },
                  ]}
                />
              )}
              <div className="stream-section">
                <div className="live-feed-component">
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
          </AdminWrapper>
        </div>
      </div>
    </>
  )
}

const LiveFeedItemComponent = ({
  feed,
  handleOnClick,
}: {
  feed: IReport | null
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
        <TypeButton buttonSize="small" title="Accept" buttonType="outlined" />
      </div>
    </div>
  )
}

export const MainView = ({ feed }: { feed: IReport | null }) => {
  const [fileIndex, setFileIndex] = useState<number>(0)

  const handleFileIndex = (nav: "left" | "right") => {
    setFileIndex((prev) => {
      if (nav === "left") return Math.max(0, prev - 1)
      if (nav === "right")
        return Math.min((feed?.mediaFiles?.length || 1) - 1, prev + 1)
      return prev
    })
  }

  const imgProps = useImage()

  return (
    <div className="video-section">
      <div className="media-container">
        <div className={`media-box`}>
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
          {fileIndex + 1} of {feed?.mediaFiles?.length || "..."}
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
                  ? new Date(feed.createdAt).toDateString()
                  : "..."}
                &nbsp;-&nbsp;<i>{getTime(feed?.createdAt)}</i>
              </p>
            </div>
            <div className="icon-txt">
              <PhoneSVG />
              <p>{feed?.deviceId || "..."}</p>
            </div>
            <div className="cta-section">
              {/* <TypeButton
                title="View Map"
                buttonType="outlined"
                buttonSize="small"
                onClick={() => handleFullScreen(feed.map || "")}
              /> */}
              <TypeButton title="Action" buttonSize="small" />
            </div>
          </div>
          <div className="vehicle-info-section">
            <InfoSectionItem
              label="Transaction ID"
              value={feed?.transactionId || "..."}
            />
            <InfoSectionItem label="Words" value={feed?.words || "..."} />
            <InfoSectionItem
              label="Description"
              value={feed?.description || "..."}
            />
            <InfoSectionItem
              label="Location"
              value={feed?.city + " | " + feed?.state || "..."}
              values={[feed?.city, feed?.state]}
              icon={
                <div
                  onClick={() => handleFullScreen(feed.map || "")}
                  className="location-map-icon"
                >
                  <MarkerSVG />
                </div>
              }
            />
          </div>
        </>
      ) : null}
    </div>
  )
}
