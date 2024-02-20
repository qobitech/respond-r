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
import AdminWrapper from "../admin-wrapper"
import { trafficReportData } from "../traffic/mock-data"
import { IReport } from "interfaces/IReport"

interface IProps {
  states: IStates
}

const IFireServicePage: React.FC<IProps> = ({ states, ...props }) => {
  const rightSectionProps = states?.global.rightSection
  const actions = props as unknown as IAction
  const rsProps = useRightSection(rightSectionProps, actions.callRightSection)

  const signalRProps = useSignalR<IReport>("SendFireEmergencyNotification")

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
            section="E-fire department"
            data={trafficReportData}
            actions={actions}
            states={states}
            organization="Fire"
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

export default IFireServicePage

const MainView = ({ feed }: { feed: IReport | null }) => {
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

// const demoData: IPoliceData = {
//   id: "652a885006373b65b68179cf",
//   userId: "652a7d4e2a64934395d957af",
//   description: "People are running everywhere",
//   latitude: "8.955007553100586",
//   longitude: "7.371120452880859",
//   nearestPlace: "Abuja, FCT",
//   city: "Abuja",
//   state: " FCT",
//   country: "NG",
//   map: "https://w3w.co/imaging.retitled.offhandedly",
//   words: "imaging.retitled.offhandedly",
//   deviceId: "2347035995152",
//   mediaFiles: [
//     "https://api.twilio.com/2010-04-01/Accounts/AC0747ce633f37d79aa27772c224b198ea/Messages/MM353d8e96d2f0f780d4e3f637caf4f9ab/Media/MEf5435d322dc699871c00e9a0c24890e2",
//     "https://api.twilio.com/2010-04-01/Accounts/AC0747ce633f37d79aa27772c224b198ea/Messages/MM1cbabd3f5c4d4ab912f941612cdd8387/Media/ME48898dc3b4f50511683300396faabdd2",
//     "https://api.twilio.com/2010-04-01/Accounts/AC0747ce633f37d79aa27772c224b198ea/Messages/MM7e800ccaae92b7d24dc22d4f07dba767/Media/ME4ec7e56c1d099ade42c677d6814ffd94",
//   ],
//   createdAt: "2023-10-14T13:23:44.7745796+01:00",
//   updatedAt: "2023-10-14T13:23:44.7745796+01:00",
//   canBeContacted: true,
//   referenceId: "652a7d4e2a64934395d957af",
//   status: 1,
// }
