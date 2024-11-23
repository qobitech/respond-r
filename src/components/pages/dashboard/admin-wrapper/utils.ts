export interface IHeader {
  setTab: (tab: string) => void
  setShowHeader: (showHeader: boolean) => void
  showHeader: boolean
  tab: string
  createAssetLoading: boolean
  loadReports: boolean
  fetchReports?: (page?: number) => void
  fetchAssets?: () => void
  addAsset: () => void
}

export const tabEnums = { REPORTS: 'All Reports', FEED: 'Feed' }

export const adminSections = {
  TRAFFIC: 'E-traffic',
  POLICE: 'E-police',
  FIRE_DEPARTMENT: 'E-fire department',
  HEALTHCARE: 'E-healthcare'
} as const

export type typeAdminSections =
  (typeof adminSections)[keyof typeof adminSections]
