import React, { useState } from "react"
import { NoFeeds, NoMediaComponent } from "../traffic"
import RightSection, {
  useRightSection,
} from "components/reusable/right-section"
import { IStates } from "interfaces/IReducer"
import { TypeButton } from "utils/new/button"
import { handleFullScreen, useImage } from "utils/new/hook"
import { Calendar2SVG, LocationSVG, PhoneSVG, PulseSVG } from "utils/new/svgs"
import "../global.scss"
import { IAction } from "interfaces/IAction"
import {
  Configuration,
  InfoSectionItem,
  LiveFeedStatusComponent,
  Media,
  useSignalR,
} from "../components"
import { IMedicalData } from "interfaces/IMedical"
import AdminWrapper from "../admin-wrapper"
import { trafficReportData } from "../traffic/mock-data"

interface IProps {
  states: IStates
}

const IMedicalPage: React.FC<IProps> = ({ states, ...props }) => {
  const rightSectionProps = states?.global.rightSection
  const actions = props as unknown as IAction
  const rsProps = useRightSection(rightSectionProps, actions.callRightSection)

  const signalRProps = useSignalR<IMedicalData>(
    "SendMedicalEmergencyNotification"
  )

  return (
    <>
      <RightSection rsProps={rsProps}>
        {rsProps.isView("custom", "settings") ? (
          <Configuration signalR={signalRProps} urlKey="globalSignalR" />
        ) : null}
      </RightSection>
      <div className="main-page">
        <div className="pg-container">
          <AdminWrapper section="E-healthcare" data={trafficReportData}>
            <LiveFeedStatusComponent signalRProps={signalRProps} />
            <div className="overview-page">
              {signalRProps?.feed ? (
                <MainView feed={signalRProps.feed!} />
              ) : (
                <NoMediaComponent
                  load={false}
                  lat={8.955007553100586}
                  lng={7.371120452880859}
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

export default IMedicalPage

const MainView = ({ feed }: { feed: IMedicalData | null }) => {
  const [fileIndex, setFileIndex] = useState<number>(0)

  const handleFileIndex = (nav: "left" | "right") => {
    if (nav === "left") setFileIndex(Math.max(0, fileIndex - 1))
    if (nav === "right")
      setFileIndex(Math.min((feed?.mediaFiles?.length || 1) - 1, fileIndex + 1))
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
              <p>{feed?.deviceId || "..."}</p>
            </div>
            <div className="cta-section">
              <TypeButton
                title="View Map"
                buttonType="outlined"
                onClick={() => handleFullScreen(feed.map || "")}
              />
              <TypeButton title="Accept" />
            </div>
          </div>
          <div className="vehicle-info-section">
            <InfoSectionItem label="Words" value={feed?.words || "..."} />
            <InfoSectionItem
              label="Description"
              value={feed?.description || "..."}
            />
            <InfoSectionItem
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

const LiveFeedItemComponent = ({
  feed,
  handleOnClick,
}: {
  feed: IMedicalData | null
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
