import React, { useEffect, useState } from "react"
import {
  chkType,
  getConnection,
  getUrl,
  setUrl,
  typeConnectionStatus,
} from "./traffic"
import { handleDataStream } from "./traffic/data"
import { IRightSection } from "components/reusable/right-section"
import { IUseImage, useFormHook } from "utils/new/hook"
import * as yup from "yup"
import { TypeInput } from "utils/new/input"
import { TypeButton } from "utils/new/button"
import { LeftNavSVG, PulseSVG, RightNavSVG } from "utils/new/svgs"
import { GODUSER } from "utils/new/constants/roles"
import { ORGANIZATION } from "utils/new/constants"

export interface IPHUS<T> {
  feeds: T[]
  connectionStatus: typeConnectionStatus
  startConnection: (url: string) => void
  stopConnection: () => void
  handleFeedSelect: (feed: T | null) => void
  feed: T | null
  // handleDemoFeeds: (feeds: T[]) => void
}

export const useSignalR = <T extends {}>(): IPHUS<T> => {
  const [connection, setConnection] = useState<signalR.HubConnection>()
  const [feeds, setFeeds] = useState<T[]>([])
  const [feed, setFeed] = useState<T | null>(null)
  const [connectionStatus, setConnectionStatus] =
    useState<typeConnectionStatus>("closed")

  const handleFeedSelect = (feed: T | null) => {
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
    //   handleDemoFeeds,
  }
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
    const rtspUrl = getUrl(urlKey)
    if (!!rtspUrl) {
      hookForm.setValue("signalR", rtspUrl)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (signalR.connectionStatus === "connected") {
      rsProps?.closeSection()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signalR.connectionStatus])

  const btnTitle =
    signalR.connectionStatus === "connected" && !!hookForm.watch("signalR")
      ? "Refresh Feed"
      : "Request Feed"

  const handleRTSPFeed = (data: { signalR: string }) => {
    signalR.startConnection(data.signalR)
    setUrl("policeSignalR", data.signalR)
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
        />
        <TypeButton
          title="Stop Feed"
          onClick={resetRTSPFeed}
          buttonType={
            signalR.connectionStatus === null ? "disabled" : "outlined"
          }
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
      <div className="tab-section">
        <div className="tab-body">
          <FeedForm signalR={signalR} rsProps={rsProps} urlKey={urlKey} />
        </div>
      </div>
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

export const IframeComponent = ({ src }: { src: string }) => {
  return (
    <div>
      <iframe
        src={src || ""}
        title="fire-service"
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
