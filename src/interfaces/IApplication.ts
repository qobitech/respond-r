import { IOrganization } from "./IOrganization"

export interface IAPIScope {
  id: number
  enabled: boolean
  name: string
  displayName: string
  description: string
  required: boolean
  emphasize: string
  showInDiscoveryDocument: boolean
  userClaims: null
  properties: null
}

export interface IAPIScopes {
  issucessFul: boolean
  scopes: IAPIScope[]
}

export interface IApplication {
  id: number
  applicationName: string
  description: string
  clientId: string
  clientSecret: string
  environment: string
  status: string
  organizationId: number
  deleted: string
  applicationRoleAccess: string
  deletedAt: string
  organization: IOrganization
  createdAt: string
  updatedAt: string
  transactionSummary: []
  transactionDetails: []
  clientSubscriptions: []
  allowedScopes: string[]
  apiCalls: []
}

export interface IAllApplications {
  applications: IApplication[]
  currentPage: number
  isSuccessful: boolean
  pageSize: number
  responseCode: string
  responseMessage: string
  totalCount: number
  totalPages: number
}
