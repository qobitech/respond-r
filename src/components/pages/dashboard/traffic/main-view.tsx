import { IVehicleReducer } from 'interfaces/IReducer'
import { IUSIO, tabEnum } from './utils'
import { useState } from 'react'
import MediaRTSPToggle from './media-rtsp-toggle'
import { NoMediaComponent } from './no-media-component'
import { VehicleInfoSection } from './vehicle-info-section'
import { VehicleOffensesSection } from './vehicle-offense-section'
import { VehicleOwnerInfoSection } from './vehicle-owner-info-section'
import { VehicleSOTSection } from './vehicle-sot-section'
import { VehicleInstanceSection } from './vehicle-instance-section'
import { CarNotes } from './car-notes'
import { CarFlags } from './car-flags'
import { IframeComponent } from '../service-component/frame-component'

const MainView = ({
  mediaUrl,
  flags,
  isImage,
  isRtsp,
  rtspProps,
  setSelectedView,
  vehicle
}: {
  mediaUrl: string
  flags: string[]
  isImage: boolean
  isRtsp: boolean
  rtspProps: IUSIO
  setSelectedView?: (value: React.SetStateAction<number>) => void
  vehicle: IVehicleReducer | undefined
}) => {
  const [tab, setTab] = useState<string>(tabEnum.VEHICLEINFO)

  const vehicleData = vehicle?.getVehicleByRegNumber?.data

  const [isMedia, setIsMedia] = useState<boolean>(true)

  const carTags = [
    {
      title: 'VIOLATIONS',
      status: vehicleData?.hasViolation,
      class: 'danger'
    },
    {
      title: 'WARNINGS',
      status: vehicleData?.hasWarning,
      class: 'warning'
    },
    {
      title: 'IS ANONYMOUS',
      status: vehicleData?.isAnonymous,
      class: ''
    },
    {
      title: 'IS STOLEN',
      status: vehicleData?.isStolen,
      class: ''
    },
    {
      title: 'MIS MATCH',
      status: vehicleData?.hasMisMatch,
      class: 'danger'
    }
  ]

  const vehicleNotes = vehicle?.getVehicleByRegNumber?.data?.notes

  return (
    <>
      <div className="video-section">
        <MediaRTSPToggle
          isImage={isImage}
          isRtsp={isRtsp}
          setSelectedView={setSelectedView}
          isMedia={isMedia}
          setIsMedia={setIsMedia}
        />
        {!vehicle?.getVehicleByRegNumber?.isSuccessful || isRtsp ? (
          <>
            <div className="separator-mainview" />
            <div className="main-view-body">
              <div className="video-cta-title start">
                {isImage ? (
                  <div className="vehicle-init-props">
                    {carTags.map((i, index) => (
                      <p
                        className={`p-btn-status ${i.class} ${
                          i.status ? '' : 'hide-btn'
                        } no-btn`}
                        key={index}
                      >
                        {i.title}
                      </p>
                    ))}
                  </div>
                ) : null}
              </div>
              <div className={`media-container ${isMedia ? '' : 'hide'}`}>
                <div className={`media-box ${isRtsp ? '' : 'hide'}`}>
                  {/* <Stream /> */}
                  <IframeComponent src={rtspProps.rtspurl || ''} />
                </div>
                {isMedia ? (
                  <div className={`media-box ${isImage ? '' : 'hide'}`}>
                    <img src={mediaUrl} alt="media" />
                  </div>
                ) : null}
              </div>
              {isImage ? (
                <div className="tab-section">
                  <div className="tab-header">
                    {Object.values(tabEnum).map((i, index) => (
                      <div
                        className={`tab-item ${i === tab ? 'active' : ''}`}
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
          </>
        ) : (
          <NoMediaComponent
            load={vehicle?.getVehicleByRegNumberLoading}
            locationDetails={[
              {
                location: {
                  latitude: parseFloat(
                    vehicleData?.createLocation
                      ? vehicleData?.createLocation?.latitude
                      : '0'
                  ),
                  longitude: parseFloat(
                    vehicleData?.createLocation
                      ? vehicleData?.createLocation?.longitude
                      : '0'
                  )
                },
                map: '',
                nearestPlace: ''
              }
            ]}
          />
        )}
      </div>
    </>
  )
}

export default MainView
