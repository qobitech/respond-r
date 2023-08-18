import { IUser } from "./IAdmin"
import { IApplication } from "./IApplication"

export interface IWallet {
  id: string
  walletNumber: string
  walletName: string
  walletBalance: number
  walletAvailableBalance: number
  lienAmount: number
  limitAmount: number
  lastTransactionDate: string
  walletHash: string
  checkSumValue: string
  checkSumValue2: string
  status: string
  clientDetailsId: string
  closed: boolean
  closedAt: null
  organizationId: number
  walletOwnership: string
  createdAt: string
  updatedAt: string
  limitDetails: []
}

export interface IOrgSubscription {
  id: number
  bundleCode: string
  subscriptionStatus: string
  organizationId: number
  createdAt: string
  updatedAt: string
  deleted: string
  deletedAt: null
  clientSubscriptions: []
}

export interface IOrganization {
  id: number
  organizationName: string
  address: string
  phoneNumber: string
  email: string
  createdAt: string
  updatedAt: string
  state: string
  city: string
  applications: Array<IApplication>
  users: Array<IUser>
  wallets: Array<IWallet>
  deleted: string
  deletedAt: string
  organizationSubscription: IOrgSubscription
}

export interface IAllOrganizations {
  organizations: IOrganization[]
  currentPage: number
  isSuccessful: boolean
  pageSize: number
  responseCode: string
  responseMessage: string
  totalCount: number
  totalPages: number
}
