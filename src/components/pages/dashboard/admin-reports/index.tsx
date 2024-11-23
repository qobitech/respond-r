/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import './index.scss'
import { NoMediaComponent } from '../traffic/no-media-component'
import { IReport, IReports } from 'interfaces/IReport'
import { IAllAssets, IAsset, IAssets, assetType } from 'interfaces/IAsset'

import { IATE } from 'store/actions/admin-actions/assets'
import { IURS } from 'store/actions/admin-actions/report'
import { statusType } from '../asset/location-assets'
import { ILocationDetails, ITableRecord } from '../traffic/utils'
import { useGlobalContext } from 'context/hooks'
import { CopyComponent, useCopy } from 'utils/hook'
import { PulseSVG, RefreshSVG } from 'utils/svgs'
import { assetsTypes } from 'store/types'
import { getIconUrl, IReportData, ObjectType } from './utils'
import { getReportStatusBg, getTime } from './helpers'
import { FilterSection } from './filter-section'
import { ViewReportItem } from './view-report-item'
import { ReportSection } from './report-section'
import { Loader } from './loader'

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

export default AdminReport
