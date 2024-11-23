/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import './index.scss'
import { NoMediaComponent } from '../traffic/no-media-component'
import { IReport, IReports } from 'interfaces/IReport'
import { MainView, MainViewLocal } from '../components'
import { IAllAssets, IAsset, IAssets, assetType } from 'interfaces/IAsset'
import moveable from 'assets/images/moveable.svg'
import police_vehicle from 'assets/images/asset_icons/police-vehicle.svg'
import fire_truck from 'assets/images/asset_icons/fire-truck.svg'
import police from 'assets/images/asset_icons/police.svg'
import street_camera from 'assets/images/asset_icons/street-camera.svg'
import frsc_patrol from 'assets/images/asset_icons/frsc-patrol.svg'
import hospital from 'assets/images/asset_icons/hospital.svg'
import ambulance from 'assets/images/asset_icons/ambulance.svg'
import police_station from 'assets/images/asset_icons/police-station.svg'
import traffic_light from 'assets/images/asset_icons/traffic-light.svg'
import drts_patrol from 'assets/images/asset_icons/drts-patrol.svg'
import { IATE } from 'store/actions/admin-actions/assets'
import { IURS } from 'store/actions/admin-actions/report'
import { IReportReducer } from 'interfaces/IReducer'
import { statusType } from '../asset/location-assets'
import { ILocationDetails, ITableRecord } from '../traffic/utils'
import { IRightSection } from 'components/reusable/right-section/utils'
import { useGlobalContext } from 'context/hooks'
import { CopyComponent, useCopy } from 'utils/hook'
import { PulseSVG, RefreshSVG } from 'utils/svgs'
import ReportTable from 'utils/report-table'
import { TypeSelect } from 'utils/select'
import { TypeInput } from 'utils/input'
import { TypeButton } from 'utils/button'
import { assetsTypes } from 'store/types'

const getIconUrl = (type: assetType) => {
  switch (type) {
    case 'ambulance':
      return ambulance
    case 'drts-patrol':
      return drts_patrol
    case 'fire-truck':
      return fire_truck
    case 'frsc-patrol':
      return frsc_patrol
    case 'hospital':
      return hospital
    case 'police':
      return police
    case 'police-station':
      return police_station
    case 'police-vehicle':
      return police_vehicle
    case 'street-camera':
      return street_camera
    case 'traffic-light':
      return traffic_light
    default:
      return moveable
  }
}

interface IReportData<T> {
  title: string
  data: T[]
}

export const getReportStatusBg = (status: string) => {
  //     Assigned (blue)
  // Accepted (yellow)
  // Closed (green)
  // Ignored (---)
  if (!status) return 'grey'
  switch (status.toLowerCase()) {
    case 'new':
      return 'red'
    case 'assigned':
      return 'blue'
    case 'accepted':
      return 'yellow'
    case 'closed':
      return 'green'
    default:
      return 'grey'
  }
}

export const getTime = (date: string) => {
  const currentDate = new Date(date)
  const hours = currentDate.getHours()
  const minutes = currentDate.getMinutes()
  const seconds = currentDate.getSeconds()
  const amPM = hours >= 12 ? 'PM' : 'AM' // Determine AM/PM

  // Convert hours to 12-hour format
  const formattedHours = hours % 12 || 12

  // Ensure minutes and seconds are displayed with leading zeros if less than 10
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${amPM}`
}

export interface ObjectType {
  [key: string]: IReport[]
}

const AdminReport = <T extends { [key: string]: any }>({
  data,
  reports,
  loadReports,
  showHeader,
  linkAsset,
  lastCardElementRef,
  updateLocalReportStatusByID,
  groupedReports
}: {
  data: IReportData<T>
  reports: IReports
  loadReports: boolean
  showHeader: boolean
  linkAsset: (assetId: string) => void
  // lastCardElementRef: (node: any) => void
  lastCardElementRef: React.RefObject<HTMLTableRowElement>
  updateLocalReportStatusByID: (id: string, status: string) => void
  groupedReports: ObjectType
}) => {
  const {
    state,
    action,
    selectedReport,
    setSelectedReport,
    fetchAssets,
    fetchReports,
    organization,
    setSideToast
  } = useGlobalContext()
  if (!state) return <></>
  const allAssets = state?.asset.getAllAssets
  const assets = state?.asset.getAssets
  const updateReportProps = state.report

  const updateReport = (data: IURS) => {
    action?.updateReportStatus(
      {
        ...data,
        emergency: {
          ...data.emergency,
          emergencyType: organization?.toLowerCase()
        }
      },
      () => {
        function capitalizeFirstLetter(str: string) {
          // Convert the string to lowercase and then capitalize the first letter
          return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
        }
        const id = data.emergency.emergencyId
        updateLocalReportStatusByID(id, capitalizeFirstLetter(data.status))
        // refresh data
        fetchReports?.()
        fetchAssets?.()
        setSideToast?.({
          notice: 'Event updated successfully',
          show: true,
          status: true
        })
      }
    )
  }

  const getTableReport = (data: IReport[]): ITableRecord[] => {
    if (!data) return []
    return data?.map((report) => {
      const isSelected = report.id === selectedReport?.id
      return {
        id: '1',
        isSelected,
        row: [
          {
            value: getTime(report.updatedAt),
            isLink: false,
            action: () => {
              setSelectedReport?.(report)
            }
          },
          {
            value: report.description,
            isLink: false,
            action: () => {
              setSelectedReport?.(report)
            },
            textLength: 25,
            cellWidth: '180px',
            classProps: 'pl-2 lh-base'
          },
          {
            value: report.nearestPlace,
            isLink: false,
            action: () => {
              setSelectedReport?.(report)
            }
          },
          {
            value: '',
            isLink: false,
            dangerouselySetHtml: `<div style="width: 12px; height: 12px; border-radius: 50%; background: ${getReportStatusBg(
              report.status
            )}" title="${report.status}"></div>`
          }
        ],
        rowActions: []
      }
    })
  }

  const [copyProps] = useCopy()

  const getSelectedReport = (selectedReport: IReport) => ({
    location: {
      latitude: parseFloat(selectedReport.latitude || '0'),
      longitude: parseFloat(selectedReport.longitude || '0')
    },
    map: selectedReport.map,
    nearestPlace: selectedReport.nearestPlace,
    markerContent: (
      <p
        className="d-flex text-decoration-underline"
        style={{ cursor: 'pointer' }}
        onClick={() => {
          setSelectedReport?.(selectedReport)
        }}
      >
        {selectedReport.nearestPlace}
      </p>
    ),
    markerColor: getReportStatusBg(selectedReport.status)
  })

  const getSelectedAsset = (selectedAsset: IAsset) => ({
    location: {
      latitude: parseFloat(selectedAsset.location.latitude || '0'),
      longitude: parseFloat(selectedAsset.location.longitude || '0')
    },
    map: selectedAsset.location.map,
    nearestPlace: selectedAsset.location.nearestPlace,
    markerContent: (
      <div
        onClick={() => {
          copyProps.setUrl(selectedAsset.id)
          linkAsset(selectedAsset.id)
        }}
      >
        <p className="d-flex m-0" style={{ cursor: 'pointer' }}>
          <span style={{ width: '70px' }}>asset:</span> {selectedAsset.type}
        </p>
        <p className="d-flex m-0" style={{ cursor: 'pointer' }}>
          <span style={{ width: '70px' }}>title:</span> {selectedAsset.name}
        </p>
        <p className="d-flex m-0" style={{ cursor: 'pointer' }}>
          <span style={{ width: '70px' }}>contact:</span>{' '}
          {selectedAsset.contact.name}
        </p>
      </div>
    ),
    markerColor: getReportStatusBg(selectedAsset.status),
    iconUrl: getIconUrl(selectedAsset.type as assetType),
    iconSize: [20, 20]
  })

  const defaultDetails = [
    { location: { latitude: 1, longitude: 1 }, map: '', nearestPlace: '' }
  ]

  const allReports = !reports
    ? defaultDetails
    : reports?.data.map(getSelectedReport)

  const getAssets = (assets: IAssets) => {
    return !assets ? defaultDetails : assets?.data?.map(getSelectedAsset)
  }
  const getAllAssets = (assets: IAllAssets) => {
    return !assets ? defaultDetails : assets?.data?.map(getSelectedAsset)
  }
  const mapAssets = selectedReport ? getAllAssets(allAssets) : getAssets(assets)

  const getLocationDetails = (): ILocationDetails[] => {
    return [...allReports, ...mapAssets]
  }

  const assignAssets = (
    data: IATE,
    callBack: (status: statusType, id: string) => void
  ) => {
    callBack('loading', data.assetId)
    action?.assignAssetToEmergency(
      {
        ...data,
        emergency: {
          ...data.emergency,
          emergencyType: organization?.toLowerCase()
        }
      },
      () => {
        setSideToast?.({
          notice: 'Asset assigned successfully',
          show: true,
          status: true
        })
        callBack('success', data.assetId)
        setTimeout(() => {
          action.clearAction(assetsTypes.assignAssetToEmergency)
          callBack(null, data.assetId)
        }, 1500)
      },
      () => {
        callBack('error', data.assetId)
      }
    )
  }

  return (
    <>
      <CopyComponent {...copyProps} />
      <div className="admin-report-section">
        <div className={`admin-report-header ${!showHeader ? 'd-none' : ''}`}>
          <div className="d-flex align-items-center" style={{ gap: '20px' }}>
            <h1>{data.title} Reports</h1>
            <div
              style={{ width: 'max-content', height: 'max-content' }}
              role="button"
              title="Refresh Reports"
              onClick={() => fetchReports?.(1)}
            >
              {loadReports ? <PulseSVG /> : <RefreshSVG />}
            </div>
          </div>
          <FilterSection />
        </div>
        <div className="admin-report-body">
          <div className="admin-report">
            <div
              className={`admin-report-left ${
                selectedReport ? 'item-open' : ''
              }`}
            >
              <NoMediaComponent
                locationDetails={
                  selectedReport
                    ? [getSelectedReport(selectedReport), ...mapAssets]
                    : getLocationDetails() ||
                      ([
                        { latitude: 1, longitude: 1 }
                      ] as unknown as ILocationDetails[])
                }
                load={false}
                key={selectedReport ? selectedReport.id : reports?.data?.length}
                defaultZoom={selectedReport ? 10 : 6.5}
              />
            </div>
            <div
              className={`admin-report-right ${
                selectedReport ? 'item-open' : ''
              }`}
            >
              {selectedReport ? (
                <ViewReportItem
                  feed={selectedReport}
                  backToAllReports={() => {
                    setSelectedReport?.(null)
                  }}
                  assignAssets={assignAssets}
                  assets={assets}
                  updateReport={updateReport}
                  updateReportProps={updateReportProps}
                />
              ) : null}
              <ReportSection
                hide={!!selectedReport}
                getTableReport={getTableReport}
                lastCardElementRef={lastCardElementRef}
                reportsGroupedByDate={groupedReports}
              />
            </div>
          </div>
          <Loader loadReports={loadReports} />
        </div>
      </div>
    </>
  )
}

interface IVRI {
  backToAllReports: () => void
  feed?: IReport | null
  assignAssets: (
    data: IATE,
    callBack: (status: statusType, id: string) => void
  ) => void
  assets: IAssets
  updateReport: (data: IURS) => void
  updateReportProps: IReportReducer
}

const ViewReportItem: React.FC<IVRI> = ({
  backToAllReports,
  feed,
  assignAssets,
  assets,
  updateReport,
  updateReportProps
}) => {
  return (
    <div className="view-report-item-container">
      <div className="back-btn-container">
        <button className="button-action danger" onClick={backToAllReports}>
          Back
        </button>
      </div>
      <div className="view-report-item">
        <MainViewLocal
          feed={feed}
          assignAssets={assignAssets}
          assets={assets}
          updateReport={updateReport}
          updateReportProps={updateReportProps}
        />
      </div>
    </div>
  )
}

const Loader = ({ loadReports }: { loadReports: boolean }) => {
  return (
    <>
      {loadReports ? (
        <div className="text-center">
          <PulseSVG />
        </div>
      ) : null}
    </>
  )
}

interface IReportSection {
  reportsGroupedByDate: ObjectType
  getTableReport: (data: IReport[]) => ITableRecord[]
  // lastCardElementRef: (node: any) => void
  lastCardElementRef: React.RefObject<HTMLTableRowElement>
  hide?: boolean
}

const ReportSection: React.FC<IReportSection> = ({
  reportsGroupedByDate,
  getTableReport,
  lastCardElementRef,
  hide
}) => {
  return (
    <div className={hide ? 'hide-prop' : ''}>
      {reportsGroupedByDate ? (
        <div className="table-wrapper">
          {Object.values(reportsGroupedByDate)?.map((report, index) => (
            <TableWrapper
              title={Object.keys(reportsGroupedByDate)[index]}
              key={index}
            >
              <ReportTable
                header={['Time', 'Report', 'Location', 'Status']}
                record={getTableReport(report)}
                hideNumbering
                lastCardElementRef={lastCardElementRef}
              />
            </TableWrapper>
          ))}
        </div>
      ) : null}
    </div>
  )
}

const TableWrapper = ({
  title,
  children
}: {
  title: string
  children?: any
}) => {
  const [toggle, setToggle] = useState<boolean>(true)
  return (
    <div className="table-wrapper-box">
      <div
        className="table-wrapper-box-header"
        onClick={() => setToggle(!toggle)}
      >
        <p>{new Date(title).toDateString()}</p>
        <p>
          <span>
            <i className={`fas fa-angle-${toggle ? 'down' : 'up'}`} />
          </span>
        </p>
      </div>
      {toggle ? (
        <div className={`table-wrapper-box-body`}>{children}</div>
      ) : null}
    </div>
  )
}

export const ViewReport = ({
  rsProps
}: {
  rsProps?: IRightSection<IReport>
}) => {
  return <MainView feed={rsProps?.data} />
}

export default AdminReport

const FilterSection = () => {
  return (
    <div className="admin-filter-section">
      <TypeSelect
        initoption={{ label: 'All reports', value: '' }}
        optionsdata={[
          { id: 1, label: 'Un-assigned reports', value: 'unassigned' },
          { id: 2, label: 'Assigned reports', value: 'assigned' },
          { id: 3, label: 'Rejected reports', value: 'rejected' }
        ]}
      />
      <TypeInput placeholder="Search report or location" />
      <TypeButton buttonSize="small" title="Search" />
    </div>
  )
}

export const ReportStatus = ({ reportStatus }: { reportStatus: string[] }) => {
  return (
    <div className="d-flex align-items-center" style={{ gap: '20px' }}>
      {reportStatus.map((i, index) => (
        <ReportStatusItem status={i} key={index} />
      ))}
    </div>
  )
}

const ReportStatusItem = ({ status }: { status: string }) => {
  return (
    <div className="d-flex align-items-center" style={{ gap: '5px' }}>
      <div
        style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          background: getReportStatusBg(status)
        }}
        title={status}
      ></div>
      <p className="m-0 text-color" style={{ fontSize: '0.7rem' }}>
        {status}
      </p>
    </div>
  )
}
