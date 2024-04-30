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
  MarkerSVG,
  PhoneSVG,
  PulseSVG,
  RightNavSVG,
} from "utils/new/svgs"
import { GODUSER } from "utils/new/constants/roles"
import { ORGANIZATION } from "utils/new/constants"
import AdminWrapper from "./admin-wrapper"
import { IReport } from "interfaces/IReport"
import { typeAdminSections } from "./admin-management"
import { trafficReportData } from "./traffic/mock-data"
import { ViewReport, getTime } from "./admin-reports"
import CreateAsset from "./asset/create-asset"
import LinkAsset from "./asset/link-asset"
import LocationAssets, {
  LocationLocalAssets,
  statusType,
} from "./asset/location-assets"
import { ILocation } from "components/map/new-map"
import { isBaseURL } from "utils/constants"
import { useGlobalContext } from "components/layout"
import { IATE } from "store/actions/admin-actions/assets"
import { IAssets } from "interfaces/IAsset"
import { IURS } from "store/actions/admin-actions/report"
import { IReportReducer } from "interfaces/IReducer"

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
  signalKey: typeSignalRURL,
  onSignal?: () => void
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
    const commandURL = isBaseURL("commandURL")
      ? isBaseURL("commandURL") + "/notificationHub"
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
      setFeeds(() => [...handleDataStream(feeds, mapDataArray, "")(data)])
      onSignal?.()
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
    if (isBaseURL("commandURL"))
      commandhookForm.setValue("commandURL", isBaseURL("commandURL"))
    if (isBaseURL("queryURL"))
      queryhookForm.setValue("queryURL", isBaseURL("queryURL"))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function clearBaseUrl(arg0: string) {
    throw new Error("Function not implemented.")
  }

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
    const commandURL = isBaseURL("commandURL")
      ? isBaseURL("commandURL") + "/notificationHub"
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
      <MediaItem url={files?.[fileIndex] || ""} imgProps={imgProps} />
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

interface IMediaURL {
  mediaUrl: {
    type: "video" | "image" | null
    url: string
    load: boolean
  }
}

const isImageExist = (url: string, imgProps: IUseImage): Promise<boolean> =>
  new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      imgProps.handleLoad(true)
      resolve(true)
      cleanup()
    }
    img.onerror = () => {
      imgProps.handleError(true)
      resolve(false)
      cleanup()
    }
    img.src = url

    // Cleanup function to remove event listeners and clear the src attribute
    const cleanup = () => {
      img.onload = null
      img.onerror = null
      img.src = ""
      imgProps.handleLoad(false)
      imgProps.handleError(false)
    }
  })

const useGetMediaUrl = (url: string, imgProps: IUseImage): IMediaURL => {
  const getMediaUrl = async (): Promise<{
    type: "video" | "image" | null
    url: string
    load: boolean
  }> => {
    if (url) {
      const isImage = await isImageExist(url, imgProps)
      return {
        type: isImage ? "image" : "video",
        url,
        load: false,
      }
    } else {
      return { type: "image", url: "", load: false }
    }
  }
  const [mediaUrl, setMediaUrl] = useState<{
    type: "video" | "image" | null
    url: string
    load: boolean
  }>({ type: "image", url: "", load: false })

  useEffect(() => {
    setMediaUrl({ load: true, type: null, url: "" })
    getMediaUrl().then((data) => {
      setMediaUrl(data)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url])

  return {
    mediaUrl,
  }
}

const MediaItem = ({ url, imgProps }: { url: string; imgProps: IUseImage }) => {
  if (!url) return <></>
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { mediaUrl } = useGetMediaUrl(url, imgProps)

  return (
    <div className="w-100 h-100 d-flex align-items-center justify-content-center">
      {mediaUrl.load ? (
        <PulseSVG />
      ) : mediaUrl.type === "image" ? (
        <img src={mediaUrl.url} alt="" />
      ) : mediaUrl.type === "video" ? (
        <video controls>
          <source src={`${mediaUrl.url}#t=1,3`} type="video/mp4" />
        </video>
      ) : null}
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
  iconPosition,
}: {
  label: string
  value: string | undefined
  values?: Array<string | undefined>
  status?: boolean
  icon?: JSX.Element
  iconPosition?: "left" | "right"
}) => {
  const isStatus = typeof status !== "undefined"
  return (
    <div className="vehicle-info-section-item">
      <p className="vehicle-info-label">{label}</p>
      <div className="vehicle-row-item">
        {!values?.length ? (
          <div className="d-flex align-items-center gap-10">
            {iconPosition === "left" ? icon : null}
            <p
              className={`vehicle-info-value overflow ${
                label.includes("Reg") ? "reg-number" : ""
              } ${isStatus ? "status-text" : ""}`}
            >
              {value || "..."}
            </p>
          </div>
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
            {iconPosition !== "left" ? icon : null}
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
  section: typeAdminSections
  signalRURL: typeSignalRURL
}

export const PageComponent: React.FC<IPageComponent> = ({
  section,
  signalRURL,
}) => {
  const { action, state, fetchReports } = useGlobalContext()

  const [selecteAssetId, setSelectedAssetId] = useState<string | null>(null)

  const rightSectionProps = state?.global.rightSection
  const rsProps = useRightSection<IReport>(
    rightSectionProps,
    action?.callRightSection
  )
  // const allAssets = state?.asset?.getAllAssets?.Data || []
  const signalRProps = useSignalR<IReport>(signalRURL, () => {
    fetchReports?.(1)
  })

  const addAsset = () => {
    rsProps.callSection("create", "asset")
  }

  const linkAsset = (assetId: string) => {
    setSelectedAssetId(assetId)
    rsProps.callSection("custom", "link-asset")
  }

  return (
    <>
      <RightSection rsProps={rsProps}>
        {rsProps.isView("custom", "settings") ? (
          <Configuration signalR={signalRProps} urlKey="globalSignalR" />
        ) : null}
        {rsProps.isView("create", "asset") ? <CreateAsset /> : null}
        {rsProps.isView("update", "asset") ? <CreateAsset /> : null}
        {rsProps.isView("custom", "link-asset") ? (
          <LinkAsset assetId={selecteAssetId} />
        ) : null}
        {rsProps.isView("custom", "report") ? <ViewReport /> : null}
      </RightSection>
      <div className="main-page">
        <div className="pg-container">
          <LiveFeedStatusComponent signalRProps={signalRProps} />
          <AdminWrapper
            section={section}
            data={trafficReportData}
            addAsset={addAsset}
            linkAsset={linkAsset}
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

interface IMVL {
  feed: IReport | null
  assignAssets: (
    data: IATE,
    callBack: (status: statusType, id: string) => void
  ) => void
  assets: IAssets
  updateReport: (data: IURS) => void
  updateReportProps: IReportReducer
}

export const MainViewLocal: React.FC<IMVL> = ({
  feed,
  assignAssets,
  assets,
  updateReport,
  updateReportProps,
}) => {
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

  const tabEnum = {
    INFO: "Info",
    ASSETS: "Assets",
  }

  const [tab, setTab] = useState(tabEnum.INFO)

  const updateReportStatus = (status: string) => {
    const data: IURS = {
      assignedBy: {
        id: 1,
        userName: "SYS-USER",
      },
      emergency: {
        emergencyId: feed?.id || "",
        emergencyType: "",
      },
      status,
    }
    updateReport(data)
  }

  const reportStatusProps = [
    "New",
    "Assigned",
    "Accepted",
    "Closed",
    "Rejected",
  ]

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
        <div className="loader-box">{imgProps.isLoaded && <PulseSVG />}</div>
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
            <ActionComponent
              title="Update Status"
              actions={reportStatusProps.map((status) => ({
                label: status,
                action: () => {
                  updateReportStatus(status?.toLowerCase())
                },
              }))}
              load={updateReportProps.updateReportStatusLoading}
            />
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
            <div className="tab-content">
              <div className="tab-body">
                <div className={tab === tabEnum.INFO ? "" : "d-none"}>
                  <div className="mb-5">
                    <InfoSectionItem
                      label="Description"
                      value={feed?.description || "..."}
                    />
                  </div>
                  <div className="vehicle-info-section">
                    <InfoSectionItem
                      label="Transaction ID"
                      value={feed?.transactionId || "..."}
                    />
                    <InfoSectionItem
                      label="Words"
                      value={feed?.words || "..."}
                    />
                    <InfoSectionItem
                      label="Location"
                      value={feed?.city + " | " + feed?.state || "..."}
                      values={[feed?.city, feed?.state]}
                      icon={
                        <div
                          onClick={() => handleFullScreen(feed.map || "")}
                          className={`location-map-icon ${feed?.status?.toLowerCase()}`}
                        >
                          <MarkerSVG />
                        </div>
                      }
                    />
                    <InfoSectionItem
                      label="Status"
                      value={feed?.status || "..."}
                      icon={
                        <div
                          className={`status-ball ${feed?.status?.toLowerCase()}`}
                        />
                      }
                      iconPosition="left"
                    />
                  </div>
                </div>
                <div className={tab === tabEnum.ASSETS ? "" : "d-none"}>
                  <AssetsLocal
                    location={{
                      latitude: parseFloat(feed?.latitude || "0"),
                      longitude: parseFloat(feed?.longitude || "0"),
                    }}
                    assets={assets}
                    assignAssets={assignAssets}
                    feed={feed}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
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

  const tabEnum = {
    INFO: "Info",
    ASSETS: "Assets",
  }

  const [tab, setTab] = useState(tabEnum.INFO)

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
        <div className="loader-box">{imgProps.isLoaded && <PulseSVG />}</div>
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
            <ActionComponent
              title="Action"
              actions={[{ label: "Assign" }, { label: "Update status" }]}
            />
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
            <div className="tab-content">
              <div className="tab-body">
                <div className={tab === tabEnum.INFO ? "" : "d-none"}>
                  <div className="mb-5">
                    <InfoSectionItem
                      label="Description"
                      value={feed?.description || "..."}
                    />
                  </div>
                  <div className="vehicle-info-section">
                    <InfoSectionItem
                      label="Transaction ID"
                      value={feed?.transactionId || "..."}
                    />
                    <InfoSectionItem
                      label="Words"
                      value={feed?.words || "..."}
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
                </div>
                <div className={tab === tabEnum.ASSETS ? "" : "d-none"}>
                  <Assets
                    // allAssets={assets}
                    location={{
                      latitude: parseFloat(feed?.latitude || "0"),
                      longitude: parseFloat(feed?.longitude || "0"),
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  )
}

const Assets = ({ location }: { location: ILocation }) => {
  const { state } = useGlobalContext()

  const allAssets = state?.asset?.getAllAssets?.data || []
  const [radius, setRadius] = useState<number>(0)

  return (
    <div>
      <TypeInput
        type="range"
        onChange={({ target }) => {
          const { value } = target
          setRadius(parseInt(value))
        }}
        min={1}
        max={2000}
        value={radius}
      />
      <LocationAssets
        allAssets={allAssets}
        location={location}
        radius={radius}
      />
    </div>
  )
}

const AssetsLocal = ({
  location,
  assets,
  assignAssets,
  feed,
}: {
  location: ILocation
  assets: IAssets
  assignAssets: (
    data: IATE,
    callBack: (status: statusType, id: string) => void
  ) => void
  feed: IReport
}) => {
  const [radius, setRadius] = useState<number>(0)

  return (
    <div>
      <TypeInput
        type="range"
        onChange={({ target }) => {
          const { value } = target
          setRadius(parseInt(value))
        }}
        min={0}
        max={2000}
        value={radius}
      />
      <LocationLocalAssets
        location={location}
        radius={radius}
        assets={assets}
        assignAssets={assignAssets}
        feed={feed}
      />
    </div>
  )
}

export const ActionComponent = ({
  actions,
  title,
  load,
}: {
  title?: string
  actions?: Array<{ label: string; action?: () => void }>
  load?: boolean
}) => {
  return (
    <div className="dropdown cta-section">
      <button
        title="Action"
        className="dropdown-toggle button-action"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {title || "Action"}
        {load ? (
          <>
            &nbsp;&nbsp;
            <PulseSVG />
          </>
        ) : null}
      </button>

      <div
        className="dropdown-menu"
        aria-labelledby="dropdownMenuButton"
        style={{ cursor: "pointer" }}
      >
        {actions?.map((i, index) => (
          <p className="dropdown-item m-0 py-2" onClick={i.action} key={index}>
            {i.label}
          </p>
        ))}
      </div>
    </div>
  )
}
