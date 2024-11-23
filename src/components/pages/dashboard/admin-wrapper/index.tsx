/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useRef, useState } from 'react'
import '../global.scss'
import AdminReport from '../admin-reports'
import { IReports } from 'interfaces/IReport'
import { useGlobalContext } from 'context/hooks'
import { useInfiniteScroll } from 'utils/hook'
import { GODUSER } from 'app-constants/roles'
import { ISSUPERADMIN } from 'app-constants'
import { ObjectType } from '../admin-reports/utils'
import { tabEnums, typeAdminSections } from './utils'
import { Header } from './header'

const AdminWrapper = ({
  children,
  section,
  data,
  addAsset,
  linkAsset
}: {
  children?: any
  section: typeAdminSections
  data?: Array<{ [key: string]: any }>
  addAsset: () => void
  linkAsset: (assetId: string) => void
}) => {
  const { state, fetchReports, fetchAssets, organization } = useGlobalContext()
  if (!state) return <></>

  const reports = state?.report.getAllReports
  const loadReports = state?.report.getAllReportsLoading

  const createAssetLoading = false

  const [tab, setTab] = useState<string>(tabEnums.REPORTS)
  const [showHeader, setShowHeader] = useState<boolean>(false)

  const [localReports, setLocalReports] = useState<IReports | null>(null)
  const [groupedReports, setGroupedReports] = useState<ObjectType>({})

  const hasmore =
    state?.report?.getAllReports?.currentPage *
      state?.report?.getAllReports?.pageSize <
    state?.report?.getAllReports?.total

  const lastCardElementRef = useRef<HTMLTableRowElement>(null)

  const observer = useInfiniteScroll(
    lastCardElementRef,
    { threshold: 0.5 },
    () => {
      if (hasmore) fetchReports?.()
    }
  )

  const groupReports = (reports: IReports) => {
    setGroupedReports((prev) => {
      prev =
        reports?.data?.reduce<ObjectType>((acc, obj) => {
          const date: string = obj.createdAt.split('T')[0]
          if (!acc[date]) {
            acc[date] = []
          }
          acc[date].push(obj)
          return acc
        }, {}) || {}
      return prev
    })
  }

  const combineReports = () => {
    if (!localReports) {
      setLocalReports(() => reports)
      groupReports(reports)
    } else {
      const { data: newData, ...rest } = reports
      const { data: oldData } = localReports

      // Replace old data with new data if their IDs match
      const updatedData = oldData.map((oldItem) => {
        const matchingNewItem = newData.find(
          (newItem) => newItem.id === oldItem.id
        )
        return matchingNewItem || oldItem
      })

      // Merge new items that don't have the same ID as old items
      const newItemsToAdd = newData.filter(
        (newItem) => !oldData.some((oldItem) => oldItem.id === newItem.id)
      )

      const combinedData = [...updatedData, ...newItemsToAdd]

      const newReport = { ...rest, data: combinedData }
      if (newReport.data !== reports.data) {
        setLocalReports(() => newReport)
        groupReports(newReport)
      }
    }
  }

  const updateLocalReportStatusByID = (id: string, status: string) => {
    setLocalReports((prev) => {
      if (!prev) return null
      const reportIndex = prev.data.map((i) => i.id).indexOf(id)
      if (reportIndex === -1) return prev
      prev.data[reportIndex].status = status
      return prev
    })
  }

  useEffect(() => {
    if (!loadReports) {
      if (lastCardElementRef.current) {
        observer.current?.observe(lastCardElementRef.current)
      }
      combineReports()
    } else {
      observer.current?.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadReports])

  useEffect(() => {
    if (organization !== null) {
      setLocalReports(null)
      fetchReports?.(1)
      fetchAssets?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organization])

  return (
    <>
      {GODUSER || ISSUPERADMIN ? (
        <div className="mb-5">
          <div className="tab-section">
            <div className="tab-header">
              <Header
                addAsset={addAsset}
                createAssetLoading={createAssetLoading}
                fetchAssets={fetchAssets}
                fetchReports={fetchReports}
                loadReports={loadReports}
                setShowHeader={setShowHeader}
                setTab={setTab}
                showHeader={showHeader}
                tab={tab}
              />
            </div>
            <div className="tab-body">
              {tab === tabEnums.REPORTS ? (
                <AdminReport
                  data={{ title: section, data: data || [] }}
                  reports={localReports}
                  loadReports={loadReports}
                  showHeader={showHeader}
                  linkAsset={linkAsset}
                  lastCardElementRef={lastCardElementRef}
                  updateLocalReportStatusByID={updateLocalReportStatusByID}
                  groupedReports={groupedReports}
                />
              ) : null}
              {tab === tabEnums.FEED ? children : null}
            </div>
          </div>
        </div>
      ) : (
        children
      )}
    </>
  )
}

export default AdminWrapper
